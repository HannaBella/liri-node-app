require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

//Bands in town 
var getconcert = function(bandName) {
    // We then run the request with axios module on a URL with a JSON

    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(
        function(response) {

            var jsonData = response.data;
            for (var i = 0; i < jsonData.length; i++) {
                console.log(i);
                console.log("Venue: " + jsonData[i].venue.name);
                console.log("Location: " + jsonData[i].venue.city + ", " + jsonData[i].venue.country);
                console.log("Event Date: " + moment(jsonData[i].datetime).format("MM/DD/YYYY"));
                console.log("----------------------------------");
            }

        }
    );
}

//movie search from omdb
var getmovie = function(movieName) {
    // We then run the request with axios module on a URL with a JSON

    if (!movieName) {
        movieName = "Mr.Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function(response) {

            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rated: " + response.data.Rated);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}

//search song on spotify
var getArtistName = function(artist) {
    return artist.name;

}

var getSpotify = function(songName) {
    if (!songName) {
        songName = "The Sign";
        console.log("Artist: Ace of Base");
        console.log("Song Name: The Sign");
        console.log("Preview Song: https://p.scdn.co/mp3-preview/b176774bc04182501c2d5d201afda143b1193f31?cid=c34a2f3d8e1245f4afe3a152a2765676");
        console.log("Album: The Sign (US Album) [Remastered]");
        console.log("----------------------------------");
    } else {
        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            var songs = data.tracks.items;
            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("Artist(s): " + songs[i].artists.map(getArtistName));
                console.log("Song Name: " + songs[i].name);
                console.log("Preview Song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("----------------------------------");
            }
        });
    }
}

//read from txt file and respond accordingly
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) throw err;
        var dataArr = data.split(',');
        if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            pick(dataArr[0]);
        }
    });
}

var pick = function(caseData, runFunction) {
    switch (caseData) {
        case "concert-this":
            getconcert(runFunction);
            break;
        case "spotify-this-song":
            getSpotify(runFunction);
            break;
        case "movie-this":
            getmovie(runFunction);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI does not know that");
    }
}
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);