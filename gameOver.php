<?php
//geen html iig
$link = mysqli_connect('localhost', '0868770', 'c388a7d2', '0868770');
if (!$link) {
    die('Connection error: ' . mysqli_connect_error()); // mysqli variant beter dan mijn voorbeeld
}

$query = "SELECT * FROM highscore ORDER BY score DESC LIMIT 0,10";
$result = mysqli_query($link, $query);

while ($row = mysqli_fetch_assoc($result)) {
    $results[] = array( // ipv een punt dan
        'naam' => $row['naam'],
        'score' => $row['score'],
        'tempo' => $row['tempo']
    );
}


$json = json_encode($results);


echo $json;
// dit WEER WEER even online bekijken ;)
//deze file is dan klaar als het zo klopt, dan heb je nog een html file nodig met js
// get JSON.. oh niet alles dus
?>