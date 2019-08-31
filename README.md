# LIRI Node App
## LIRI (Language Interpretation and Recognition Interface)

* LIRI is acommand line node app that takes in parameters and gives back data.
* It searchs Spotify for songs, Bands in Town for concerts, and OMDB for movies.

### LIRI takes the following commands:
    - concert-this - to search Bands in Town/an artist and render information about each event to the terminal.
    - spotify-this-song - to search songs by song name and show information about the song.
            - If no song is provided then your program will default to "The Sign" by Ace of Base.
    - movie-this - to search movie by using movie name and render information about the movie.
            - If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    - do-what-it-says - takes the text inside of random.txt and then use it to call one of LIRI's commands eg. spotify-this-song
