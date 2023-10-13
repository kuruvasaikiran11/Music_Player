var leftSection = document.getElementById("left-section");
var rightSection = document.getElementById("right-section");
var progressWrapper = document.getElementById("progress-wrapper");
var songTrack = document.getElementById("song-track");

var audioPlayer = document.getElementById("audio")
var  playButtonElement = document.getElementById("play");
var pauseButtonElement = document.getElementById("pause");
var replay = document.getElementById("replay");
var forward = document.getElementById("forward");
var backward = document.getElementById("backward");
var slow = document.getElementById("slow");
var fast = document.getElementById("fast");
var normal = document.getElementById("normal");


$(document).ready(function(){
    $.get("https://5dd1894f15bbc2001448d28e.mockapi.io/playlist", function(response){
      let musicData = response;

      for(let i = 0; i < musicData.length; i++){
          // console.log(musicData[i]);
          createSongsList(musicData[i]);
      }
      var audio = document.getElementById("audio")
      var coverImage = document.getElementById("cover-img")

      // $(window).on("load", function(){
      //     audio.src = musicData[0].file;
      //     coverImage.src = musicData[0].albumCover;

      //     songTrack.innerHTML = `
      //         <h3>${musicData[0].track}</h3>
      //         <p>${musicData[0].artist}</p>
      //     `;

      // });

      $(document).on("click", ".tracks", function () {
        var id = $(this).attr("id");
        
        audio.src = musicData[id - 1].file;
        // audio.id = "audio";

        coverImage.src = musicData[id - 1].albumCover;

        leftSection.insertBefore(audio, progressWrapper);
        leftSection.insertBefore(coverImage, progressWrapper);

        songTrack.innerHTML = `
            <h3>${musicData[id - 1].track}</h3>
            <p>${musicData[id - 1].artist}</p>
        `;
        audioPlayer.currentTime = 0;
        audioPlayer.play();
        playButtonElement.style.display = "none";
        pauseButtonElement.style.display = "block";
    });
    // console.log("index.js", document.getElementById("audio"));

    playButtonElement.addEventListener("click", function(){
        audioPlayer.play();
        playButtonElement.style.display = "none";
        pauseButtonElement.style.display = "block";
    });
    
    pauseButtonElement.addEventListener("click", function(){
        audioPlayer.pause();
        pauseButtonElement.style.display = "none";
        playButtonElement.style.display = "block";
    })
    
    forward.addEventListener("click", function(){
        audioPlayer.currentTime += 10; 
    })
    
    backward.addEventListener("click", function(){
        audioPlayer.currentTime -= 10; 
    })
    
    replay.addEventListener("click", function(){
        audioPlayer.currentTime = 0;
        progress.style.width = 0+"%";
        // console.log(audioPlayer.currentTime);
    })
    
    fast.addEventListener("click", function(){
        audioPlayer.playbackRate = 2;
        fast.style.display = "none";
        slow.style.display = "block";
    })
    
    slow.addEventListener("click", function(){
        audioPlayer.playbackRate = 0.5;
        slow.style.display = "none";
        normal.style.display = "block";
    })
    
    normal.addEventListener("click", function(){
        audioPlayer.playbackRate = 1;
        normal.style.display = "none";
        fast.style.display = "block";
    })
    
    var progress = document.getElementById("progress-bar");
    audioPlayer.addEventListener("timeupdate", function(){
        // console.log((audioPlayer.currentTime / audioPlayer.duration) * 100 +"%");
        progress.style.width = (audioPlayer.currentTime / audioPlayer.duration) * 100 +"%";
    })
    })

    //left section
    {/* <audio src="https://edyoda.s3.ap-south-1.amazonaws.com/public/musicfiles/without-you.mp3" id="audio"></audio>
                        <img src="https://pm1.narvii.com/6806/3e2b13347653f657cefb76e8da003cf49e17adeav2_hq.jpg" alt=""></img> */}
    {/* <h3>Youngblood</h3>
    <p>5 Seconds of Summer</p> */}

    // right Section
    {/* <div class="tracks">
                            <img src="https://pm1.narvii.com/6806/3e2b13347653f657cefb76e8da003cf49e17adeav2_hq.jpg" alt="">
                            <div class="track-details">
                                <h3>Youngblood</h3>
                                <p>5 Seconds of Summer</p>
                            </div>
                        </div> */}
    
    function createSongsList(song){
        rightSection.innerHTML += `
        <div class="tracks" id="${song.id}">
            <img src="${song.albumCover}" alt="">
            <div class="track-details">
                <h3>${song.track}</h3>
                <p>${song.artist}</p>
            </div>
        </div>
        `;
    }
});
