if (getSpotifyApi(1)){
    var spotfiy = getSpotifyApi(1);
    var models = sp.require('sp://import/scripts/api/models');
    var views = sp.require("$api/views");

    var myAwesomePlaylist = new models.Playlist("My Awesome Playlist");
    myAwesomePlaylist.add(models.player.track);
    myAwesomePlaylist.add("spotify:track:6JEK0CvvjDjjMUBFoXShNZ");

    /*
    var single_track = models.Track.fromURI('spotify:track:0blzOIMnSXUKDsVSHpZtWL');

    var single_track_playlist = new models.Playlist();
    single_track_playlist.add(single_track);
    var single_track_player = new views.Player();
    single_track_player.track = null; // Don't play the track right away
    single_track_player.context = single_track_playlist;

    //Pass the player HTML code to #single-track-player
    var single_track_player_HTML = document.getElementById('cur_song');
    single_track_player_HTML.appendChild(single_track_player.node);
     */
}

