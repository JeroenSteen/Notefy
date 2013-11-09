// haal de cookie op

// als de cookie != null is

//voer de functie uit van..
//fetchSOngs

var tempoG = $.cookie('tempo'); // waarde uit de tempo van echonest.. geen idee

var c_playList = $.cookie('playList'); // alle spotify ID's als we geluk hebben :)

var a_playList = c_playList.split(','); // knip de string weer naar array

console.log(a_playList); // check de array als testtt

if(a_playList != null){ // geen idee of dit kan
    fetchSongs(a_playList, tempoG);//die voor in de nieuwe js // mis kunnen we het hier ook in gooien

    var isWeg = $.removeCookie('playList'); // verwijder cookie
}

