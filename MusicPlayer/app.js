const container = document.querySelector(".container");
const image = document.querySelector("#muzik-image");
const title = document.querySelector(".muzik-details .title");
const singer = document.querySelector(".muzik-details .singer");
const prev = document.querySelector(".controls #prev");
const play = document.querySelector(".controls #play");
const next = document.querySelector(".controls #next");
const bitis = document.querySelector("#progress .duration-time");
const baslangic = document.querySelector("#progress .current-time");
const progresBar = document.querySelector("#progress #progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(muzikListesi);

window.addEventListener("load", () => {
  let muzik = player.getMuzik();
  displayMusic(muzik);
  displayMusiclist(player.muzikList);
  isplayingNow();
});

function displayMusic(muzik) {
  title.innerText = muzik.getIsim();
  singer.innerText = muzik.sarkici;
  image.src = "img/" + muzik.img;
  audio.src = "mp3/" + muzik.dosya;
}

play.addEventListener("click", () => {
  const isMuzikPlay = container.classList.contains("playing");
  isMuzikPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
  prevMusic();
});

function prevMusic() {
  player.prev();
  let music = player.getMuzik();
  displayMusic(music);
  playMusic();
  isplayingNow();
}
next.addEventListener("click", () => {
  nextMusic();
});

function nextMusic() {
  player.next();
  let music = player.getMuzik();
  displayMusic(music);
  playMusic();
  isplayingNow();
}

function pauseMusic() {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
}
function playMusic() {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
  isplayingNow();
}
const calculateTime = (toplamSaniye) => {
  const dakika = Math.floor(toplamSaniye / 60);
  const saniye = Math.floor(toplamSaniye % 60);
  const guncelleneSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;

  const sonuc = `${dakika}:${guncelleneSaniye}`;
  return sonuc;
};

audio.addEventListener("loadedmetadata", () => {
  bitis.textContent = calculateTime(audio.duration);
  progresBar.max = math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progresBar.value = Math.floor(audio.currentTime);
  baslangic.textContent = calculateTime(progresBar.value);
});

progresBar.addEventListener("input", () => {
  baslangic.textContent = calculateTime(progresBar.value);
  audio.currentTime = progresBar.value;
});

let sesDurumu = "sesli";

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = true;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
  }
});

volume.addEventListener("click", () => {
  if (sesDurumu === "sesli") {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = true;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

const displayMusiclist = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
          <li li-index= "${i}"
          onclick="selectedMusic(this)"
           class="list-group-item d-flex justify-content-between aling-items-center">
            <span>${list[i].getIsim()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill text-center"></span>
            <audio class="music-${i}" src = "mp3/${list[i].dosya}"></audio>
          </li>
            `;
    ul.insertAdjacentHTML("beforeend", liTag);
    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);
    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMuzik());
  playMusic();
  isplayingNow();
};

const isplayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }
    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

audio.addEventListener("ended", () => {
  nextMusic;
});
