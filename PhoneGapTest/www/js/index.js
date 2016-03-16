
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
  
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        // jQuery AJAX call for JSON
        var host = 'http://localhost:3000';
        
        $.getJSON( host + '/Champions/Championlist', function( champions ) {

            // For each item in our JSON, add a table row and cells to the content string
            $.each(champions, function(champion){
                 $('#champions').append("<li>" + champion.name + "</li>" )
            });
        });
    },
};
