const music = document.querySelector('audio');
const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('#progress');
const currTimeEL = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');

// Music
const songs = [
    {
        name: 'image-1',
        displayName: 'Broken Angel',
        artist: 'Arash'
    },
    {
        name: 'image-2',
        displayName: 'Thoda Thoda Pyaar',
        artist: 'Stebin Ben'
    },
    {
        name: 'image-3',
        displayName: 'Peaky Blinder',
        artist: 'Peaky Blinder'
    },
    {
        name: 'image-4',
        displayName: 'Arcade',
        artist: 'Duncan Laurence'
    }
]

// cheak is playing or not
let isPlaying = false;

// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

playBtn.addEventListener('click', () => {
    // console.log('clicked bro')
    isPlaying ? pauseSong() : playSong()
});

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `images/${song.name}.jpg`;
}

let currIdx = 0;

loadSong(songs[currIdx]);

// next song
function prevSong() {
    if (currIdx == 0) {
        return;
    } else {
        currIdx--;
        loadSong(songs[currIdx]);
        playSong();
    }
}

// prev song
function nextSong() {
    if (currIdx == songs.length - 1) {
        return;
    }
    else {
        currIdx++;
        loadSong(songs[currIdx]);
        playSong();
    }
}

function updateProgressBar(e) {
    if (isPlaying) {
        // console.log(e);
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);

        // Update Progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // setting duration to UI
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        // Calculate display for current-time
        let currElapseMinutes = Math.floor(currentTime / 60);
        let currElapseSeconds = Math.floor(currentTime % 60);
        if(currElapseSeconds < 10) {
            currElapseSeconds = `0${currElapseSeconds}`;
        }
        // console.log('currElapseSecond', currElapseSeconds);

        // Setting current time it to UI
        currTimeEL.textContent = `${currElapseMinutes}:${currElapseSeconds}`

    }
}

// set Progress bar
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}


prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
