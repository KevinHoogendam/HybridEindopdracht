var champions;

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
});

$(document).on("pagecreate", "#championpage", function () {
	console.log("championpage is now shown");
	loadChampionList();
});

$(document).bind('pageinit', function () {
	$("#sortable").sortable({
		'containment' : 'parent',
		'opacity' : 0.9
	});
	$("#sortable").disableSelection();
	//<!-- Refresh list to the end of sort to have a correct display -->
	$("#sortable").bind("sortstop", function (event, ui) {
		$('#sortable').listview('refresh');
	});
});
//----------------------------------------------------Losse functies-----------------------------------------------------------------\\


function loadChampionList() {
	if (champions != undefined) {
		for (var c in champions) {
			var name = champions[c].name;
			var id = champions[c].id;
			var bgposition = "-" + champions[c].image.x + "px -" + champions[c].image.y + "px ";
			var bgimageUrl = "img/";
			var imageSprite = champions[c].image.sprite;

			$(".chmplist").append('<li class="champli">' + name + '<img class="champs" id="' + id + '"></img></li>');
			//$(".chmplist").append('<li class="champs" id="' + id + '"></li>');
			$("#" + id).css("background-position", bgposition);
			$("#" + id).css("background-image", "url(" + bgimageUrl + imageSprite + ")");

		}
		$('.chmplist').listview('refresh');
	}
}