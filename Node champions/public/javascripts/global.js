// Championlist data array for filling in info box
var ChampionListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the Champion table on initial page load
    populateTable();
    
    // Championname link click
    $('#ChampionList table tbody').on('click', 'td a.linkshowchampion', showChampionInfo);
    
    // Add Champion button click
    $('#btnAddChampion').on('click', addChampion);
    
     // Delete champion link click
    $('#ChampionList table tbody').on('click', 'td a.linkdeletechampion', deleteChampion);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/Champions/Championlist', function( data ) {

        // Stick our Champion data array into a Championlist variable in the global object
        ChampionListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowchampion" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.rank + '</td>';
            tableContent += '<td><a href="#" class="linkdeletechampion" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#ChampionList table tbody').html(tableContent);
    });
};

// Add Champion
function addChampion(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addChampion input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all Champion info into one object
        var newChampion = {
            'name': $('#addChampion fieldset input#inputChampionName').val(),
            'rank': $('#addChampion fieldset input#inputChampionRank').val(),
        }

        // Use AJAX to post the object to our addChampion service
        $.ajax({
            type: 'POST',
            data: newChampion,
            url: '/Champions/addChampion',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addChampion fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Show Champion Info
function showChampionInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve Championname from link rel attribute
    var thisChampionName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = ChampionListData.map(function(arrayItem) { return arrayItem.name; }).indexOf(thisChampionName);

    // Get our Champion Object
    var thisChampionObject = ChampionListData[arrayPosition];

    //Populate Info Box
    $('#ChampionInfoName').text(thisChampionObject.name);
    $('#ChampionInfoRank').text(thisChampionObject.rank);

};

// Delete champion
function deleteChampion(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this champion?');

    // Check and make sure the champion confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/champions/deletechampion/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};