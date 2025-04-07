let songs;
let isClicked = false

function addCard() {
  let html = `
        <div class="card">
            <img src="https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO05sWIF-default.jpg" width="220px" height="240px">
            <h2>Happy Hits!</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>`;

  let cardContainer = document.querySelector(".cards");

  if (!cardContainer) {
    console.error("Card container not found!");
    return;
  }

  let div = document.createElement("div");
  div.innerHTML = html;

  // Append the actual card, not the wrapper div
  cardContainer.appendChild(div);
}

async function getSongs() {
  let response = await fetch("http://127.0.0.1:3000/songs/");
  let responseText = await response.text();
//   console.log(a);
  let div = document.createElement("div")
  div.innerHTML = responseText
  let as = div.getElementsByTagName("a")
  console.log(as)
  songs = []
  for(i=0; i<as.length; i++){
    let element = as[i]
    if(element.href.endsWith(".mp3")){
        songs.push(element.href)   
    }
  }
  return songs
}


async function main(){
    let songList = await getSongs()
    console.log(songList)

    var firstSong = new Audio(songs[0])
    console.log(firstSong)

    let playBar = document.getElementsByClassName("playbar")[0]
    let playBtn = playBar.children[1]
    playBtn.addEventListener("click", () => {
      if(isClicked){
        firstSong.pause() 
        isClicked = false
      }
        else{
          firstSong.play()
          isClicked = true
        } 
    })

    let playList = document.querySelector(".playlist").getElementsByTagName("ul")[0]
    for (const song of songList) {
      let filteredSong = song.split("/songs/")[1].replaceAll("%20", "")
      playList.innerHTML = playList.innerHTML + `<li>
        <img src="musical-note.png" alt="" width"20px">
        <p>${filteredSong}</p>
        <img src="play-button.png" alt="">
      </li>`
    }
}

addCard();
addCard();
addCard();
addCard();
addCard();
addCard();

getSongs();
main()
