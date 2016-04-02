function getLanguage() {
    navigator.globalization.getPreferredLanguage(onSucces, onError);
}

function onSucces(language)
{
    //alert(language.value);
        switch (language.value) {
        case "nl-NL":
            alert("nderland");
            break;
        case "en-US":
            day = "engels us";
            break;
        default :
            alert("defeult");
            break;
    }
}

function onError()
{
    alert('Error getting language\n');
}

