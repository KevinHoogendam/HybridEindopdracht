function getLanguage() {    
    navigator.globalization.getPreferredLanguage(onLaguageSucces, onLaguageError);
}

function onLaguageSucces(language)
{
    switch (language.value) 
    {
    case "nl-NL":
        setDutch();           
        break;
    default :
        setEnglish();
        break;
    }
}

function onLaguageError()
{
    alert('Error getting language');
}

function setDutch()
{
    //all Pages
    $(".panel").html("Paneel");
    $(".homePage").html("Homepagina");
    $(".myChampions").text("Mijn kampioenen");
    $(".allChampions").html("Alle kampioenen");
    $(".championDetails").html("Kampioen details");
    $(".profile").html("Profiel");
    $(".settings").html("Instellingen");
    $(".footer").html("Voeter");            
    //Index
    $(".welcome").html("Welkom");
    $(".officialLeagueOfLegendsSite").html("Officiele League of Legends website");
    //MyChampions
    $(".championRemoved").html("Kampioen verwijderd");
    //AllChampions
    $(".championAdded").html("Kampioen toegevoegd");
    //ChampionDetails
    $(".attackPower").html("Aanvalskracht");
    $(".magicPower").html("Magie");
    $(".defensePower").html("Verdediging");
    $(".difficultyLevel").html("Moeilijkheidsgraad");
    //Settings
    $(".settingsWillActivateWhenChangingPage").html("Instelling worden aangepast bij het veranderen van de pagina");
    $(".applicationTheme").html("Applicatie thema");
    $(".standard").html("standaard");
    $(".special").html("speciaal");
    //profile
    $(".invite").html("Uitnodigen");
}

function setEnglish()
{
    //all Pages
    $(".panel").html("Panel");
    $(".homePage").html("Homepage");
    $(".myChampions").text("My Champions");
    $(".allChampions").html("All Champions");
    $(".championDetails").html("Champion Details");
    $(".profile").html("Profile");
    $(".settings").html("Settings");
    $(".footer").html("Footer");            
    //Index
    $(".welcome").html("Welcome");
    $(".officialLeagueOfLegendsSite").html("Official League of Legends Site");
    //MyChampions
    $(".championRemoved").html("Champion Removed");
    //AllChampions
    $(".championAdded").html("Champion Added");
    //ChampionDetails
    $(".attackPower").html("Attack");
    $(".magicPower").html("Magic");
    $(".defensePower").html("Defense");
    $(".difficultyLevel").html("Difficulty");
    //Settings
    $(".settingsWillActivateWhenChangingPage").html("Settings Will Activate When Changing the Page");
    $(".applicationTheme").html("Application theme");
    $(".standard").html("standard");
    $(".special").html("special");
    //profile
    $(".invite").html("Invite");
}