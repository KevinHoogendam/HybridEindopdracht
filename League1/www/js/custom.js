var champions;
var panel = '<div data-role="panel" data-theme="c" id="mypanel" data-position="left" data-display="push" class="custompanel"> <div data-role="header"> <h1>Panel</h1> </div> <div data-role="main" class="ui-content"> <a href="#loginpage" class="ui-btn">Home</a> <a href="mychampions.html" class="ui-btn">My Champions</a> <a href="allchampions.html" class="ui-btn">All Champions</a>  <a href="#" class="ui-btn">Profile</a></div> </div>';
var detailID;

$(document).one('pagebeforecreate', function () {
	$.mobile.pageContainer.prepend(panel);
	$("#mypanel").panel().enhanceWithin();
});

$(document).ready(function () {
	console.log("ready fired");
});

$(document).on("mobileinit", function () {
	console.log("mobileinit fired");
	fillChampions();

});

$(document).on("pageshow", "#loginpage", function () {
	$('.inapp').on('tap', function () {
		window.open('http://leagueoflegends.com', '_blank', 'location=yes');
	});
});

$(document).on("pagebeforeshow", function () {
	$('.toast').hide();
});

$(document).on("pagebeforeshow", "#details", function () {
	$('.detailID').text(champions[detailID].name + " details");
	$('.attack').text(champions[detailID].info.attack);
	$('.defense').text(champions[detailID].info.defense);
	$('.magic').text(champions[detailID].info.magic);
	$('.difficulty').text(champions[detailID].info.difficulty);
});

$(document).on("pagebeforeshow", "#allchampions", function () {
	console.log("pagebeforeshow allchampions");
	loadAllChampionList(champions);
	
	$(".plus-sign").on("tap", function () {
		addChampToList($(this).attr('id'));
		$('.toast').fadeIn(500).delay(500).fadeOut(500);
		$(this).hide();
	});

	$(".info").on("tap", function () {
		detailID = $(this).attr("id").substring(4);
		$.mobile.pageContainer.pagecontainer("change", "championdetails.html", {
			transition : "slide",
			changeHash : true,
		});
	});
	
	$('.ui-icon-delete').on('tap', function(){
		loadAllChampionList(champions);
	});

});

$(document).on("pagebeforeshow", "#mychampions", function () {
	console.log("pagebeforeshow mychampions");
	loadMyChampionList();

	//make list sortable
	$("#sortable").sortable({
		'containment' : 'parent',
		'opacity' : 0.9,
	});
	$("#sortable").disableSelection();
	//<!-- Refresh list to the end of sort to have a correct display -->
	$("#sortable").bind("sortstop", function (event, ui) {
		$('#sortable').listview('refresh');
		rewriteChampList();
	});

	//delete champ from list
	$(".min-sign").on("tap", function () {
		$(this).css("color", "#FF0000");
		$('.toast').fadeIn(500).delay(500).fadeOut(500);
		removeChampFromList($(this).attr('id'));
		$("#li" + $(this).attr('id')).hide();
	});
});

//----------------------------------------------------Losse functies-----------------------------------------------------------------\\

function fillChampions() {
	var champFilled = JSON.parse(localStorage.getItem("champions"));
	var lastCheck = localStorage.getItem("TimesNotUpdated");

	if (champFilled != undefined && lastCheck < 5) {
		champions = champFilled;
		lastCheck++;
		localStorage.setItem("TimesNotUpdated", lastCheck);
	} else {
		$.ajax({
			url : 'http://ddragon.leagueoflegends.com/cdn/6.5.1/data/en_US/champion.json',
			success : function (result) {
				champions = result.data;
				localStorage.setItem("champions", JSON.stringify(result.data));
				localStorage.setItem("TimesNotUpdated", 0);
			},
			error : function (request, status, errorThrown) {
				console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
			}
		});
	}

	var myChampionList = JSON.parse(localStorage.getItem("myChampionList"));
	if (myChampionList === null) { //If champlist does not exist yet
		localStorage.setItem("myChampionList", JSON.stringify([]));
		myChampionList = JSON.parse(localStorage.getItem("myChampionList"));
	}
}

function rewriteChampList() {
	var array = [];
	$('.mychamplist li').each(function () {
		array.push($(this).attr("id").slice(2));
	});
	localStorage.setItem("myChampionList", JSON.stringify(array));
}

function addChampToList(champID) {
	var myChampionList = JSON.parse(localStorage.getItem("myChampionList"));
	if (myChampionList === null) { //If champlist does not exist yet
		localStorage.setItem("myChampionList", JSON.stringify([]));
		myChampionList = JSON.parse(localStorage.getItem("myChampionList"));
	}

	if (myChampionList.indexOf(champID) == -1) {
		myChampionList.push(champID);
		localStorage.setItem("myChampionList", JSON.stringify(myChampionList));
	}
}

function removeChampFromList(champID) {
	var myChampionList = JSON.parse(localStorage.getItem("myChampionList"));

	for (var i = myChampionList.length - 1; i >= 0; i--) {
		if (myChampionList[i] === champID) {
			myChampionList.splice(i, 1);
		}

		localStorage.setItem("myChampionList", JSON.stringify(myChampionList));
	}
}

function loadAllChampionList(listToLoad) {
	$('.chmplist').empty();
	var bgimageUrl = "img/";
	var myChampionList = JSON.parse(localStorage.getItem("myChampionList"));

	if (listToLoad != undefined) {
		for (var c in listToLoad) {
			var name = listToLoad[c].name;
			var id = listToLoad[c].id;
			var bgposition = "-" + listToLoad[c].image.x + "px -" + listToLoad[c].image.y + "px ";
			var imageSprite = listToLoad[c].image.sprite;
			var inMyChampList = '';

			if (myChampionList.indexOf(id) == -1) {
				inMyChampList = '<div class="ui-btn ui-btn-inline plus-sign" id="' + id + '"><i class="fa fa-plus fa-3x"></i></div>';
			}

			$(".chmplist").append('<li class="champli">' + name + '<img class="champs img' + id + '"></img>' + inMyChampList + '<div id="info' + id + '"class="ui-btn ui-btn-inline info"><i class="fa fa-info fa-3x"></i></div></li>');
			$(".img" + id).css("background-image", "url(" + bgimageUrl + imageSprite + ")");
			$(".img" + id).css("background-position", bgposition);
		}
		$('.chmplist').listview('refresh');
	}
}

function loadMyChampionList() {
	$('.mychamplist').empty();
	var bgimageUrl = "img/";
	var myChampionList = JSON.parse(localStorage.getItem("myChampionList"));

	if (champions != undefined) {
		for (var c in myChampionList) {

			var name = champions[myChampionList[c]].name;
			var id = champions[myChampionList[c]].id;
			var bgposition = "-" + champions[myChampionList[c]].image.x + "px -" + champions[myChampionList[c]].image.y + "px ";
			var imageSprite = champions[myChampionList[c]].image.sprite;

			if (myChampionList.indexOf(id) != -1) {
				$(".mychamplist").append('<li class="champli" id="li' + id + '">' + name + '<img class="champs img' + id + '"></img><div class="min-sign ui-btn ui-btn-inline" id="' + id + '"><i class="fa fa-minus fa-3x"></i></div></li>');
				$(".img" + id).css("background-image", "url(" + bgimageUrl + imageSprite + ")");
				$(".img" + id).css("background-position", bgposition);
			}
		}
		$('.mychamplist').listview('refresh');
	}
}

function refreshPage() {
	jQuery.mobile.changePage(window.location.href, {
		allowSamePageTransition : true,
		transition : 'none',
		reloadPage : true
	});
}
