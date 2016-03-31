/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function capturePhoto(){
    alert('voor foto nemen');
    navigator.camera.getPicture(uploadPhoto,onError,{sourceType:1,quality:60});
    alert('na foto nemen');
}
function uploadPhoto(data){
    alert('upload foto');
    $("#cameraPic").attr("src", data);
    alert('foto upgeload');
}

function searchAllContacts() 
{   
    alert('voor find');
    navigator.contacts.find( [navigator.contacts.fieldType.displayName], onSuccess, onError );
    alert('na find');
}

function onSuccess(contacts) 
{
    alert('success');
    for (var i=0; i<contacts.length; i++) 
    {    
        alert('check naam');
        if(contacts[i].displayName != undefined)
        {
            alert('voeg toe naam');
                $(".contactlist").append('<li class="champli">' + contacts[i].displayName + '<a class = "ui-btn" href="sms:'+contacts[i].phoneNumbers[0].value+'?body=doe mee potta" >invite</a></li>');
        alert('naam toegevoegd');    
    }
    }
     alert('voor refresh'); 
    $('.contactlist').listview('refresh');
     alert('na refresh'); 
}

function onError(contactError) 
{
    alert('onError!');
}
