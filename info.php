<?php
// oh nee hier sql voor insert into

//db connectie
$link = mysqli_connect('localhost', '0868770', 'c388a7d2', '0868770');
if (!$link) {
    die('Connection error: ' . mysqli_connect_error()); // mysqli variant beter dan mijn voorbeeld
}

if(isset($_POST['naam']) && isset($_POST['score']) && isset($_POST['tempo'])){
    $naam = $_POST['naam']; // gebruikersnaam
    $score = $_POST['score']; // totale score
    $tempo = $_POST['tempo']; // gemiddelde tempo
    $query = "INSERT INTO highscore (naam, score, tempo) VALUES ('$naam', '$score', '$tempo')";
    $result = mysqli_query($link, $query);


}


?>
