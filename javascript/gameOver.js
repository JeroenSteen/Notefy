$(document).ready(init);

function init(){
    $("#opnieuw").on("click", restart);
    // laat de score's van andere alvast zien
    $.getJSON("http://stud.cmi.hr.nl/0868770/Jaar%201/imp%20P3/Notefy/gameOver.php", function(data){
        var scoreData = data.length;
        for(var s = 0; s < scoreData; s++){
            var naam = data[s].naam;
            var score = data[s].score;
            var tempo = data[s].tempo;
            var newScore = $("<li/>").html("Naam: " + naam +" - "+ "Score: " + score +" - "+ "Tempo: " + tempo); // een van de 2 :P
            $("#scoreList").append(newScore);
        }
    });
}

function restart(){
    window.location.replace("index.html");
}