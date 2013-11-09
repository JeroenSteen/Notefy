$(window).on("load", init);
var previewList = []; // previews komt in deze array
var playList = []; // definiteve lijst komt in deze array
var fieldSet = $("fieldset"); // geen .size, oude methode
var canClick = false;



function init() {
    //$("#input_elements fieldset").last().find('.artiest').on("change" || "blur", function(){ // tab, weg van input
    //vorige artiesten moeten dan maar andere classen krijgen
    $("#formElements").on("keyup", ".zoekterm", function () { // tab, weg van input
        setTimeout(function(){
            var valZoekterm = $("fieldset").last().find('.zoekterm').val(); //pak de laatste artiest val
            searchSpotifyID(valZoekterm); //zoek nummers van de artiest
        }, 1);
    });



    $("body /*#suggestedSongs*/ ").on("click", ".suggestedSong", function (event, canClick) { // bij kiezen van een nummer
        event.preventDefault();
        var liID = $(this).attr("id"); // goede ID
        var values = $(this).text(); // tekst voor terug in de input is GOED
        $("fieldset").last().find('.zoekterm').val(values); // set de waarde vanuit de klik
        var li = "<li class='"+liID+"'>" + values + "</li>";

        $("#songList").append(li);
        $("#add_song").attr("class", "canClick"); // de class van de add knop, wordt canClick.. gebruiker mag nieuwe liedje toevoegen
        $("#add_song").css("opacity", "1.0");
//        $("#nextPage").html("<a href='game.html'><img src='img/Check.png' width='100' id='playlist_ready'></a>");
        $("#nextPage").html("<a href='game.html' id='playlist_ready'>PLAY NOTEFY<img src='img/Check.png' width='100' ></a>");

        var countSongs = $('#songList li').size();
        $("#countpSongs").text(countSongs); // update de tekst

    });

    /* form */
    //var i = $('fieldset').size(); // tel alle legends + 1
    $("#add_song").on('click', function (event, canCLick) { // klikken op de +, voor meer songs
        event.preventDefault();
        //als er een nieuwe toegevoegd mag worden, want er is geklikt op de suggestie li
        if ($("#add_song").hasClass("canClick")) { // als de knop, nieuwe liedjes mag toevoegen
            $('#suggestedSongs').remove(); // verwijder eerst de vorige suggestie lijst
            $("#add_song").css("opacity", 0.4);
            i++;

            //disable de vorige nummers, zodat ze niet meer veranderd kunnen worden
            $(".artiestChosen").prop("disabled", true); // .attr('disabled','disabled'); voor oudere versie jQuery
            $(".nummerChosen").prop("disabled", true);
            $("#add_song").hasClass("canClick");

            //return false;
        }
    });
    $('#songList').on('click', "li", function () {
        //if (i > 1) {
            $(this).remove(); // verwijder de song
            var countSongs = $('#songList li').size();
            $("#countpSongs").text(countSongs); //update de tekst
            //i--;
        //}
        //return false;
    });
    /* form */

    $('#nextPage').on("click", '#playlist_ready', function(){
//    $('#playlist_ready').on('click', function (event) { // klaar met de playlist
//        event.preventDefault();
        var playList = []; // begin met lege array
        $("#songList li").each(function () {
            $this = $(this); // jQuery object
            var spID = $this.attr("class"); //pak de cal zo
            playList.push(spID); //push alle id's in de nu VOLLE array
        });
        $.cookie('playList', playList); // maak cookie
    });

    /* zoek de id */
    function searchSpotifyID(q) { //each track uit playList
        $('.suggestedSong').remove(); // verwijder eerst de vorige suggestie nummers
        previewList = []; // maak de previewList leeg

        $.getJSON("http://ws.spotify.com/search/1/track.json?q=" + q, function (data) { //wordt het wel trager
            var p = 0;
            $.each(data.tracks, function () { // data.tracks.each(function(){
                if (p <= 20) { // toon er 20
                    var tempoArray = [];
                    var id = data.tracks[p].href; //spotify ID
                    var artists = (data.tracks[p].artists[0].name); // eerste artiest uit de array :)
                    var name = (data.tracks[p].name);
                    previewList.push(id); // stop alle ID's in de previewList
                    var newLi = $("<li/>");
                    newLi.attr("class", "suggestedSong"); // ---: GAAT hier om
                    newLi.attr("id", id); //voeg in elke suggestie LI, een Spotify ID
                    newLi.html(artists + " -- " + name);
                    $("#suggestedSongs").append(newLi).last(); // dus
                    $("#add_song").css("opacity", "0.4");
//                    isEchonest(id, tempoArray); // tempo van suggested track, via tempoArray[0]
//                    if (tempoArray.length != 0) { // er is een tempo
//                        console.log("er is een tempo");
//
//                        var showTempo = $("<strong/>");
//                        showTempo.html(tempoArray); // bijv. 1.00440
//                        showTempo.after(newLi); // komt weer in conflict met de VAL uitlezen..
//
//                    } else if (tempoArray.length == 0) { // er is geen tempo
//                        console.log("er is geen tempo");
//
//                        var showTempo = $("<strong/>");
//                        showTempo.html(tempoArray); //0
//                        showTempo.after(newLi); // komt weer in conflict met de VAL uitlezen..
//
//                    }
                    p++; // tel op, voor de IF
                }
//                tempoArray.length = 0;
                //tempoArray = [];
                //console.log(tempoArray); // ja ik ben LEEG
            });
        });

    }

//    function isEchonest(id, tempoArray) {
//        var echonestID = id.replace(":", "-WW:"); // Spotify id naar Echo
//        $.getJSON("http://developer.echonest.com/api/v4/song/profile?api_key=C3PC4DQ3HM7DNZIIT&format=json&track_id=" + echonestID + "&bucket=audio_summary", function (data) {
//            if (data.response.status.code == 5) { // en als het fout gaat voor de zkrheid
//                var tempo = 0;
//                tempoArray.push(tempo);
//            } else {
//                var tempo = String(data.response.songs[0].audio_summary.tempo); // JSON speld in een hooiberg ^^
//
//
//                if(tempo == "undefined"){ // als er geen tempo beschikbaar is
//                    // tempo is een bepaalde default
//                    tempo = 175;
//                }
//
//                 if ((tempo != "undefined")){ // als er WEL een tempo beschikbaar is of een DEFAULT is opgepakt ;)
//                    // check of die cookie bestaat
//                    if($.cookie('tempo') != ""){
//                        $.removeCookie('tempo'); // verwijder hem
//                    }
//
//                    //vul hem opnieuw
//                    $.cookie('tempo', tempo); // naam van de cookie, waarde van de cookie
//                     console.log($.cookie('tempo', tempo));
////                 )
//                }
//
//
//                tempoArray.push(tempo); //push alle tempo's erin
//                console.log(tempoArray); // wordt niet leeggemaakt dat is 1!!
//            }
//        });
//    }

} // end init

