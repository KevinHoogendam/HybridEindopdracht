var champions;
var panel = '<div data-role="panel" data-theme="c" id="mypanel" data-position="left" data-display="push" class="custompanel"> <div data-role="header"> <h1>Panel</h1> </div> <div data-role="main" class="ui-content"> <a href="#loginpage" class="ui-btn">Home Page</a> <a href="mychampions.html" class="ui-btn">My champions</a>  <a href="mycontacts.html" class="ui-btn">Profile</a></div> </div>';

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

$(document).on("pagebeforeshow", "#mycontacts", function () {
	console.log("before pageshow mycontacts");
	//searchAllContacts();
});

$(document).on("pagebeforeshow", function () {
	$('.toast').hide();
});

$(document).on("pageshow", "#allchampions", function () {
	console.log("pageshow allchampions");
	loadAllChampionList();

	$(".plus-sign").on("tap", function () {
		$(this).css("color", "#008000");
		addChampToList($(this).attr('id'));
		$('.toast').fadeIn(500).delay(1000).fadeOut(500);
		$(this).hide();
	});
});

$(document).on("pageshow", "#mychampions", function () {
	console.log("pageshow mychampions");
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
		$('.toast').fadeIn(500).delay(1000).fadeOut(500);
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

function searchChampions() {
	console.log("searching...");
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
	$('.chmplist').empty();
	var bgimageUrl = "img/";
	var myChampionList = JSON.parse(localStorage.getItem("myChampionList"));

	if (champions != undefined) {
		for (var c in champions) {
			var name = champions[c].name;
			var id = champions[c].id;
			var bgposition = "-" + champions[c].image.x + "px -" + champions[c].image.y + "px ";
			var imageSprite = champions[c].image.sprite;
			var inMyChampList = '';

			if (myChampionList.indexOf(id) == -1) {
				inMyChampList = '<div class="ui-btn ui-btn-inline plus-sign" id="' + id + '"><i class="fa fa-plus fa-3x"></i></div>';
			}

			$(".chmplist").append('<li class="champli">' + name + '<img class="champs img' + id + '"></img>' + inMyChampList + '<div class="ui-btn ui-btn-inline details"><i class="fa fa-info fa-3x"></i></div></li>');
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
////////////////////////////////////////////////////////////////////////////////////////////////

function capturePhoto(){
    navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60});
}
function uploadPhoto(data){
    $("#cameraPic").attr("src", data);
}

function searchAllContacts() 
{   
    navigator.contacts.find( [navigator.contacts.fieldType.displayName], onSuccess, onError );
}

function onSuccess(contacts) 
{
    for (var i=0; i<contacts.length; i++) 
    {    
        if(contacts[i].displayName != undefined)
        {
                    $(".contactlist").append('<li class="champli">' + contacts[i].displayName + '<a class = "ui-btn" href="sms:'+contacts[i].phoneNumbers[0].value+'?body=doe mee potta" >invite</a></li>');
        }
    }
    $('.contactlist').listview('refresh');
}

function onError(contactError) 
{
    alert('onError!');
}