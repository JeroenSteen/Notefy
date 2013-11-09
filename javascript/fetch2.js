// fetch mag pas uitgevoerd worden na dat de GAME pagina geladen is
var tempo;
var score;
var models = getSpotifyApi(1).require('$api/models');

function fetchSongs(playList, tempoG) {
    console.log(playList); // toon het even
    console.log(tempoG); // toon het even

// array met tracks
//var songArray = ["spotify:track:6BDUnpSnelDYMpIUro6Tdk", "spotify:track:0OiXWeAWCKYqjnB1x1skq8", "spotify:track:2jtliODheBWBUXVh8TVy0m"];

    var countSongs = playList.length;
    console.log(countSongs);

    if (models.player.playing == false) { // als de speler niet afspeeld
        var i = 0;
        playSongs(playList, i, countSongs, tempoG); // pak de array met input songs //        playSongs(songArray, i, models); // pak de array met input songs

    }
}

function playSongs(playList, i, countSongs, tempoG) { //vang de tracks array op en.. aantal?     //models.Track.fromURI(songArray[i], function(track) {
    console.log(playList); // goede spotify output, array
    console.log(i); // 0 in het begin, duh
    var i = i;

    if (playList[i] != "") { //check de track
        models.Track.fromURI(playList[i], function (track) {  // bijv. track.duration
            models.player.playTrack(models.Track.fromURI(track.uri)); // speel af

            isEchonest(playList[i]); // vraag het tempo op

//            var echonestID = playList[i].replace(":", "-WW:"); // Spotify id naar Echo
//            $.getJSON("http://developer.echonest.com/api/v4/song/profile?api_key=C3PC4DQ3HM7DNZIIT&format=json&track_id="+echonestID+"&bucket=audio_summary", function(data){
//                if(data.response.status.code === 5){ // en als het fout gaat voor de zkrheid
//                    console.log("bestaat net"); // mis ook zichtbaar voor de.. gebruiker mja
//                } else {
//                    var tempo = data.response.songs.audio_summary.tempo; //speld in een hooiberg ^^
//                    //data.tempo... geef var door
//                    // plaats het tempo, ook in de..
//                }
//            });
            function isEchonest(id) {
                var echonestID = id.replace(":", "-WW:"); // Spotify id naar Echo
                $.getJSON("http://developer.echonest.com/api/v4/song/profile?api_key=C3PC4DQ3HM7DNZIIT&format=json&track_id=" + echonestID + "&bucket=audio_summary", function (data) {
                    if (data.response.status.code == 5) { // en als het fout gaat voor de zkrheid
                        tempo = 150; // default snelheid
                        var tempCookie = $.cookie('tempo', tempo); // naam van de cookie, waarde van de cookie

                        tempoGet(tempCookie);

                    } else if (data.response.status.code != 5) {
                        tempo = String(data.response.songs[0].audio_summary.tempo); // JSON speld in een hooiberg ^^
                        console.log(tempo); // goede output
//
//                        if (tempo == "undefined") { // als er geen tempo beschikbaar is
//                            tempo = 150; // default snelheid
//
//                            var tempCookie = $.cookie('tempo', tempo); // naam van de cookie, waarde van de cookie
//                            tempoGet(tempCookie);
//                        }
                    }

                    if (tempo != undefined) { // als er WEL een tempo beschikbaar is of een DEFAULT is opgepakt ;)
                        allTempos(tempo); // neem de snelheid mee voor de gemiddelde snelheid, later pas de cookie check
                        //doet ie hier ook meerdere keren.. testen?
//                            console.log("after undefined" + tempo);
                        // check of die cookie bestaat
                        if ($.cookie('tempo') != undefined) { // hij bestaat
                            //$.removeCookie('tempo'); // verwijder hem
                            //vul hem opnieuw
                            var tempCookie = $.cookie('tempo', tempo); // naam van de cookie, waarde van de cookie
                            tempoGet(tempCookie); // functie voor naar de TOEN eigenweijze multipleNotes
                        } else if ($.cookie('tempo') == undefined) { // hij bestaat niet
                            //vul hem opnieuw
                            var tempCookie = $.cookie('tempo', tempo); // naam van de cookie, waarde van de cookie
//                                console.log($.cookie('tempo', tempo)); //tempo=853378 dit gaat goed
                            tempoGet(tempCookie);
                        }
                    }
                }); // einde getJSON
            }

            //controleer wat er wordt afgespeeld
            var checker = setInterval(function () {
                if($("#life").children().length == 0){
                    var totaalScore = $("#score").text();
                    score = $.cookie('youScore', totaalScore); // klopt het id score?
//                    playList = [];
//                    models.player.playing = null;
                    models.player.playing = !(models.player.playing);
                    window.location.replace("name.html");
                }
                else if (null == models.player.position) { // als er geen pos is oftewel, AFGEELOPEN
                    if (i === countSongs) { // als nummer gelijk is aan laatste nummer
                        var totaalScore = $("#score").text();
                        score = $.cookie('youScore', totaalScore); // klopt het id score?
                        window.location.replace("name.html");
                    } else if (i != countSongs) { // niet de laatste uit de array
                        i++;  //je mag WEL verder //console.log(i);
                        playSongs(playList, i, countSongs); // i++ volgende nummer inderdaad
                        clearInterval(checker);
                    }
                }
            }, 1000);
        });
        //console.log(models.player);
    }
}

//dus hier array cookie FUNCTION ofzo..
function allTempos(givenTempo) { // bewaar alle tempo's in 1 cookie voor de eind boards


//    if ("tempo=".match(givenTempo)) { // dat was het, je heb een nieuwe tempo en check die :P
//        alert("Illigaal "+givenTempo);
//        givenTempo = parseInt(givenTempo.substring(6)); // knip die tempo
//        alert("Niet meer"+givenTempo);
//        //alert("Ik was hopelijk illigaal in de fetch " + tempo); // 4?
//    } else{
//        alert("Ik ben altijd goed"+givenTempo); // altijd een getal uit fetch??? geen idee
//    }

    var doNewCookie; // globaal dan ook
    var allTemposC; // globaal dan ook
    var newTempos = "";
    doNewCookie = true; // mag adden

    allTemposC = $.cookie('allTempos'); // laat de cookie zien van 'allTempos'
    if (allTemposC == undefined) {// hoe dan? :P
        allTemposC = $.cookie('allTempos', givenTempo); // maak hem AAN
        doNewCookie = false; // ik mag nu false zijn
    } // mag niet meer adden, want net aangemaakt



    if (allTemposC != undefined && doNewCookie == true) { // maar ik wordt hier genegeerd door de else if?
        allTemposC = $.cookie('allTempos'); // pak de waarden ERUIT
        newTempos = allTemposC + ".." + givenTempo; // we kunnen zoiets doen maar dan heb je die true/false nodig

        $.removeCookie('allTempos'); // even weg
        allTemposC = $.cookie('allTempos', newTempos); // maak hem weer AAN

    } // mag niet meer adden, want net toegevoegd

}
//allTempos=118.033 %2C 130.342

/*
 setInterval(function(){
 console.log("check");
 //if(models.player.position == songDuration){  // is playing of niet, met een timer
 if(models.track.loaded == false){  // is playing of niet, met een timer
 console.log("Klaar met playen, want de pos is het hetzelfde");

 //if(//game score is genoeg){
 //    }
 // als het niet genoeg is, nummer opnieuw totdat je gek wordt

 if(countSongs == i){ // als het dezelfde lengte is mag er niet verder omhoog gegaan worden
 playSongs(songArray, i); // speel het maar nog een keer, droppie
 } else{
 i++; // doe maar de volgende
 playSongs(songArray, i);
 }
 }
 }, 1000);
 */

//        if(models.player.position == songDuration){  // is playing of niet, met een timer
//            console.log("Klaar met playen, want de pos is het hetzelfde");
//
//            //if(//game score is genoeg){
//            //    }
//            // als het niet genoeg is, nummer opnieuw totdat je gek wordt
//
//            if(countSongs == i){ // als het dezelfde lengte is mag er niet verder omhoog gegaan worden
//                playSongs(songArray, i); // speel het maar nog een keer, droppie
//            } else{
//                i++; // doe maar de volgende
//                playSongs(songArray, i);
//            }
//        }


