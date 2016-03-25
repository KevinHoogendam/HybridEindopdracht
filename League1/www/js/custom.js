var champions;
var panel = '<div data-role="panel" data-theme="c" id="mypanel" data-position="left" data-display="push" class="custompanel"> <div data-role="header"> <h1>Panel</h1> </div> <div data-role="main" class="ui-content"> <a href="mychampions.html" class="ui-btn">My champions</a> <a href="#loginpage" class="ui-btn">Home Page</a> </div> </div>';

$(document).one('pagebeforecreate', function () {
	$.mobile.pageContainer.prepend(panel);
	$("#mypanel").panel().enhanceWithin();
});

$(document).ready(function () {
	console.log("ready fired");
});

$(document).bind("mobileinit", function () {
	console.log("mobileinit fired");
	
	$.ajax({
		url : 'http://ddragon.leagueoflegends.com/cdn/6.5.1/data/en_US/champion.json',
		success : function (result) {
			champions = result.data;
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});
});

$(document).on('pageinit', function () {
	console.log("pageinit fired");

});

$(document).on("pagecreate", "#allchampions", function () {
	console.log("allchampions is now shown");
	loadAllChampionList();

	$(".plus-sign").on("vmousedown", function () {
		$(this).css("color", "#00FFFF");
	}).on("vmouseup", function () {
		$(this).css("color", "#005599");
		addChampToList($(this).attr('id'));
	});
});

$(document).on("pagecreate", "#mychampions", function () {
	console.log("mychampions is now shown");
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
	});

	//delete champ from list
	$(".min-sign").on("vmousedown", function () {
		$(this).css("color", "#00FFFF");
	}).on("vmouseup", function () {
		$(this).css("color", "#005599");
		removeChampFromList($(this).attr('id'));
		$("#li" + $(this).attr('id')).hide();
	});
});

//----------------------------------------------------Losse functies-----------------------------------------------------------------\\

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

function loadAllChampionList() {
	if (champions != undefined) {
		for (var c in champions) {
			var name = champions[c].name;
			var id = champions[c].id;
			var bgposition = "-" + champions[c].image.x + "px -" + champions[c].image.y + "px ";
			var bgimageUrl = "img/";
			var imageSprite = champions[c].image.sprite;

			$(".chmplist").append('<li class="champli">' + name + '<img class="champs" id="img' + id + '"></img><i id="' + id + '" class="fa fa-plus-square fa-3x plus-sign"></i></li>');
			$("#img" + id).css("background-image", "url(" + bgimageUrl + imageSprite + ")");
			$("#img" + id).css("background-position", bgposition);
		}
		$('.chmplist').listview('refresh');
	}
}

function loadMyChampionList() {
	var myChampionList = JSON.parse(localStorage.getItem("myChampionList"));
	if (champions != undefined) {
		for (var c in myChampionList) {

			var name = champions[myChampionList[c]].name;
			var id = champions[myChampionList[c]].id;
			var bgposition = "-" + champions[myChampionList[c]].image.x + "px -" + champions[myChampionList[c]].image.y + "px ";
			console.log(bgposition);
			var bgimageUrl = "img/";
			var imageSprite = champions[myChampionList[c]].image.sprite;

			if (myChampionList.indexOf(id) != -1) {

				$(".mychamplist").append('<li class="champli" id="li' + id + '">' + name + '<img class="champs" id="img' + id + '"></img><i id="' + id + '" class="fa fa-minus-square fa-3x min-sign"></i></li>');
				$("#img" + id).css("background-image", "url(" + bgimageUrl + imageSprite + ")");
				$("#img" + id).css("background-position", bgposition);

			}

		}
		$('.mychamplist').listview('refresh');
	}
}

function refreshPage()
{
    jQuery.mobile.changePage(window.location.href, {
        allowSamePageTransition: true,
        transition: 'none',
        reloadPage: true
    });
}