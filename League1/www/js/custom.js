var champions;
var panel = '<div data-role="panel" data-theme="c" id="mypanel" data-position="left" data-display="push" class="custompanel"> <div data-role="header"> <h1>Panel</h1> </div> <div data-role="main" class="ui-content"> <a href="mychampions.html" class="ui-btn" data-transition="slide">My champions</a> <a href="#loginpage" class="ui-btn" data-transition="slide">Home Page</a> </div> </div>';

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
			//loadChampionList();
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});
});

$(document).on('pageinit', function () {
	console.log("pageinit fired");

	$("#sortable").sortable({
		'containment' : 'parent',
		'opacity' : 0.9,
	});
	$("#sortable").disableSelection();
	//<!-- Refresh list to the end of sort to have a correct display -->
	$("#sortable").bind("sortstop", function (event, ui) {
		$('#sortable').listview('refresh');
	});
});

$(document).on("pagecreate", "#allchampions", function () {
	console.log("allchampions is now shown");
	loadChampionList();

	console.log("ui");

	$(".plus-sign").on("vmousedown", function () {
		$(this).css("color", "#00FFFF");
	}).on("vmouseup" ,function(){
		$(this).css("color", "#005599");
		addChampToList($(this).attr('id'));
	});
});

//----------------------------------------------------Losse functies-----------------------------------------------------------------\\

function addChampToList(champID){
	var myChampionList = JSON.parse(localStorage.getItem("myChampionList"));
	if(myChampionList === null){ //If champlist does not exist yet
			localStorage.setItem("myChampionList", JSON.stringify([]));
			myChampionList = JSON.parse(localStorage.getItem("myChampionList"));
	}
		
	console.log(myChampionList);
	myChampionList.push(champID);
	localStorage.setItem("myChampionList", JSON.stringify(myChampionList));

}

function removeChampFromList(champID){
	var myChampionList = JSON.parse(localStorage.getItem("myChampionList"));
	
	for (var i=myChampionList.length-1; i>=0; i--) {
    if (myChampionList[i] === champID) {
        myChampionList.splice(i, 1);
    }
	
	localStorage.setItem("myChampionList", JSON.stringify(myChampionList));
	}
}



function loadChampionList() {
	if (champions != undefined) {
		for (var c in champions) {
			var name = champions[c].name;
			var id = champions[c].id;
			var bgposition = "-" + champions[c].image.x + "px -" + champions[c].image.y + "px ";
			var bgimageUrl = "img/";
			var imageSprite = champions[c].image.sprite;

			$(".chmplist").append('<li class="champli">' + name + '<img class="champs" id="img' + id + '"></img><i id="' + id + '" class="fa fa-plus-square fa-3x plus-sign"></i></li>');
			//$(".chmplist").append('<li class="champs" id="' + id + '"></li>');
			$("#img" + id).css("background-position", bgposition);
			$("#img" + id).css("background-image", "url(" + bgimageUrl + imageSprite + ")");

		}
		$('.chmplist').listview('refresh');
	}
}