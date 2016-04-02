function getLanguage() {
    navigator.globalization.getPreferredLanguage(onSucces, onError);
}

function onSucces(language)
{
    alert(language)
    //     switch (language) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    // }
}

function onError()
{
    alert('Error getting language\n');
}

