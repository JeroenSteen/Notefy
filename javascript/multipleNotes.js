//var tempoC = $.cookie('tempo'); // waarde uit de tempo van echonest
//var tempoC;
var score = 0; // de score
var falls = []; // array van alle noten
var noteArray = [];
var check = false;
//tempoGet(200); // deze uit?
//range vergelijking

function tempoGet(tempoC) {
//    setTimeout(function(){
    if($.inArray("tempo=", tempoC)){
        //alert("Ik ben illigaal in de MultipleNotes");
        tempoC = tempoC.substring(6); // knip "de tempo=" navelstreng eraf :P
    }
    tempoC = parseInt(tempoC, 10);
//    tempoC = tempoC.toFixed(0);
    $("#tempo").html(tempoC);


        if (tempoC >= 0 && tempoC <= 25) { // tempo var wordt overschreven is het plan
            tempoC = 2;
        } else if (tempoC > 25 && tempoC <= 50) {
            tempoC = 3;
        } else if (tempoC > 50 && tempoC <= 75) {
            tempoC = 4;
        } else if (tempoC > 75 && tempoC <= 100) {
            tempoC = 5;
        } else if (tempoC > 100 && tempoC <= 125) {
            tempoC = 6;
        } else if (tempoC > 125 && tempoC <= 150) {
            tempoC = 7;
        } else if (tempoC > 150 && tempoC <= 175) {
            tempoC = 8;
        } else if (tempoC > 175 && tempoC <= 200) {
            tempoC = 9;
        } else if (tempoC > 200) {
            tempoC = 10;
        }

    var begin = setInterval(function(){
        if(check == false){
            if(tempoC != ""){

                init(tempoC);
                check = true;
            }
        }},1000);
    }


//var noteArray = [];
//var isFalling; // hoeveel noten er nu vallen
//var newNote;



function init(tempoC) {
    var game = $("#game");
    var game_offset = game.offset();
    var game_left = game_offset.left;
    var game_right = game_left + game.width();
    var game_top = game_offset.top;
    var game_bottom = game_top + game.height();

    var player = $("#player");
    var offset = player.offset();
    var player_left = offset.left;
    var player_top = offset.top;
    var player_right = offset.left + player.width();
    var player_bottom = offset.top + player.height();

    $(window).on("keydown", function (event) {
        if (event.which == 37 || event.keyCode === 37) { // Left arrow
            event.preventDefault();
            if (player_left - 10 > game_left) {
                player.css("left", "-=10");
                player_left -= 10;
                player_right -= 10;
            }
        } else if (event.which == 39 || event.keyCode === 39) { // Right arrow
            event.preventDefault();
            if (player_right < game_right) {
                player.css("left", "+=10");
                player_left += 10;
                player_right += 10;
            }
        }
    });

    $("#control_left").mousehold(function () {
        if (player_left - 10 > game_left) {
            player.css("left", "-=10");
            player_left -= 10;
            player_right -= 10;
        }
    });
    $("#control_right").mousehold(function () {
        if (player_right < game_right) {
            player.css("left", "+=10");
            player_left += 10;
            player_right += 10;
        }
    });


    invokeNotes();
    function invokeNotes() {
        var random = Math.floor((Math.random() * 10) + 1);
        noteArray =[];
        for (var i = 0; i < random; i++) {
            var newNote = new MakeNote(i); // leverd iets op
            //console.log(newNote); //#div3
            falls.push(newNote); // eerst 1
//            var tempoArray = [tempoC - 1.5 , tempoC-1, tempoC - 0.5, tempoC, tempoC + 0.5, tempoC + 1, tempoC + 1.5];
            var tempoArray = [tempoC, tempoC + 1, tempoC + 2, tempoC + 3, tempoC + 4, tempoC + 5] ;
//            var tempoArray = [tempoC - 1.5 , tempoC-1, tempoC - 0.5, tempoC, tempoC + 0.5, tempoC + 1, tempoC + 1.5];
    //heel iets anders...
            var randomTempo = Math.floor(Math.random() * 6);
            noteArray.push(tempoArray[randomTempo]);
        }
        //player.top = 303
        //console.log(falls);
        //console.log(falls.length);
        var offset = $("#1").offset();
        var bottom = offset.top + $("#1").height();
    }

     setInterval(function () {
        for (var j = 0; j < falls.length; j++) {
//            console.log(falls[j].fall_left);
//            console.log(falls[j].fall_bottom);
//            console.log(falls[j].fall_right);

            //fall_left, fall_bottom, fall_right, player_left, player_right, game_bottom, id
            if (typeof falls[j] != 'undefined') {
                var hit = isHit(falls[j].fall_left, falls[j].fall_bottom, falls[j].fall_right, player_left, player_right, player_top, game_bottom, falls[j].id, falls[j]);

                if (hit == false) {         // spreek dus alle noten aan, en doe dan die top ophogen
//                    var tempo = tempoC;

                    $("#" + (j + 1)).css("top", "+=" + noteArray[j]); //tempo verhaal
                    falls[j].fall_bottom += noteArray[j]; // deze noot nu even
                }
                else if (hit == true) { // hier kwam een return true
                        $("#" + (j + 1)).remove();
                        delete falls[j];
                        var checkLength = falls.length;
                        var checkUndefined = 0;
                        for (var h = 0; h < falls.length; h++) {
                            if (typeof falls[h] == 'undefined') {
                                checkUndefined += 1;
                            }
                        }
                        if (checkLength == checkUndefined) {
                            falls = [];
                            invokeNotes(); // doe opnieuw nootje
                        }
                }
            }
        }
    }, 40);
}

//check of een noot de player raakt, of de grond :)
function isHit(fall_left, fall_bottom, fall_right, player_left, player_right, player_top, game_bottom, id, fall) { // genoeg voor een check
//check de aanraking van de player met het object

    if (fall_bottom >= player_top && ((fall_left >= player_left && fall_left <= player_right) || (fall_right >= player_left && fall_right <= player_right))) {
        if(fall.fall.hasClass("goodFall")){
            score += 10;
            $("#score").html(score);

        }
        else if(fall.fall.hasClass("badFall")){
            $("#life img:last-child").remove();
//            if($("#life").children().length == 0){
//                window.location.replace("name.html")
//            }
        }
//        score += 10;
//        $("#score").html(score);
        return true; // return 2 :)

        //hier??

        //return true; // reset pos // return ook welke noot het was.. om hem weer te verwijderen

    } else { //wordt niet aangeraakt, met de player maar mis wel met de grond
        var groundHit = hitBottom(game_bottom, fall_bottom); // functie terugzetten ook :P
//        console.log("Ik ben isbottem"+id);

        if (groundHit == true) { //grond word aangeraakt > reset pos
            return true;
        } else {
            return false; // er wordt dit keer niks aangeraakt
        }
    }
}

function hitBottom(game_bottom, fall_bottom) {
    if (fall_bottom >= game_bottom) {
        return true;
    }

    else {
        return false;
    }
}

//maak een noot aan, of meerdere dit gaat nu goed
function MakeNote(i) {  // bijv. maak er 3 aan
//    for (var f = 0; f < aantal; f++) {
//        console.log("f " + f);
//        console.log(aantal);
    this.fall = $("<div>"); // maak een div

    var luck = Math.random();
//        console.log(luck); // 50 procent dus zoiets
    if (luck > 0.1) {
        this.fall.attr("class", "fall goodFall"); // of
    }
    else if(luck <= 0.1) {
        this.fall.attr("class", "fall badFall");
    }

    var count = $("#game").find(".fall").length;
    this.fall.attr("id", count + 1); // ik ben noot nummer #

    var random = Math.floor((Math.random() * 580) + 1); // of hier iets mee?? hoezo 580

    //hierzo mis eerste de game offset opvragen?
    // voor de fall lefft right bootom
    //wat denk je?
    var game = $("#game");
    var game_offset = game.offset();
    var game_left = game_offset.left; // dit geeft de hoeveelheid PIXELS aan buiten de GAME DIV.. naar de kant toe?
//        console.log(game_left); // 277 ? steeds anders natuurlijk.. de post van fall is dan game_left + waarde

    var game_right = game_left + game.width();

    var game_top = game_offset.top;
    var game_bottom = game_top + game.height();
//        console.log("game bottom" + game_bottom);

//       this.fall.css("top", "50px"); // positioneer vanuit HARD CODED css
    this.fall.css("top", "0px"); // positioneer vanuit HARD CODED css.. min het poppetje

//        this.fall.css("left", "1px");
    this.fall.css("left", game_left + random); // zouden we hier niet die.. game_left ook moeten hebben

    this.fall_left = game_left + random + 8; // DIT IS BELANGERIJK
    this.fall_right = game_left + random + 68; //?

    var offset = this.fall.offset();
    var bottom = offset.top + this.fall.height();
//        console.log(bottom);//hier offset? 180

//      this.fall_bottom = 88; // <-- ? // eerst dit
//        this.fall_bottom = -95; // <-- ?   // toen dat dus..
    this.fall_bottom = 30; // <-- ?   // toen dat dus..

    this.id = i + 1;

    $("#game").append(this.fall); // append aan game
//    }

}

//var fall = $("#fall");
//var fall_offset = fall.offset();
//var fall_bottom = fall_offset.top + fall.height();
//var top_pos = fall_bottom; // 109
//var fall_left = fall_offset.left;
//var fall_right = fall_offset.left + fall.width();
////console.log(player_top);
////console.log($("#fall").css("top"));