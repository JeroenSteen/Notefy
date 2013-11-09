$(document).ready(init);

function init(){
    //voeg je score toe
    $("#scoreEnd").on("click", function(){
        var naamInput = $("#naamEnd").val(); // de gebruiker moet natuurlijk eerst zijn/haar naam invullen

        if(naamInput !=  ""){
            var temposUnsplitted = $.cookie('allTempos');
            var temposSplitted = temposUnsplitted.split(".."); // split is eig voor string maar volgens mij is dat het ook nu he
            var tempoLength = temposSplitted.length;
            var tempoTotaal = 0;
            var tempoParse;
            console.log(tempoLength);
            console.log(temposSplitted);
            console.log(temposUnsplitted);
            for(var t = 0; t < tempoLength; t++){ // alles optellen delen door aantal nummers
                tempoParse = parseInt(temposSplitted[t]); // string > int
                tempoTotaal += tempoParse;
            }
            var tempoInput = tempoTotaal / tempoLength; // 800 / 5.. gemiddelde tempo
            var scoreInput = $.cookie('youScore'); // bijv even 100..

            $.ajax({
                type: "POST",
                url: "http://stud.cmi.hr.nl/0868770/Jaar%201/imp%20P3/Notefy/info.php", // in die file moet iig een INSERT enzo
                data: { naam: naamInput, score: scoreInput, tempo: tempoInput } // met POST kan je dus zo naam opvangen
            }).done(function(){
                    window.location.replace("end.html");
                })
        }
    });
}