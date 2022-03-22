const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Anh yêu vội thế",
      singer: "Lala Trần",
      path: "https://mp3-s1-zmp3.zadn.vn/5ba69f388e7967273e68/815233182308815199?authen=exp=1648027732~acl=/5ba69f388e7967273e68/*~hmac=0384c6fb22a0476a800305a10aebce49&fs=MTY0Nzg1NDkzMjIzOXx3ZWJWNnwwfDE0LjI1My45NC4z",
      image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/2/9/8/e/298e3fa437530f9a712cab992ea15841.jpg"
    },
    {
      name: "Chúng ta dừng lại ở đây thôi",
      singer: "Nguyễn Đình Vũ",
      path: "https://mp3-s1-zmp3.zadn.vn/1880034796037f5d2612/1369731046804013482?authen=exp=1648028413~acl=/1880034796037f5d2612/*~hmac=d41bf67181f3a4529adbcd4f2012eca9&fs=MTY0Nzg1NTYxMzM3OXx3ZWJWNnwxMDYwMDY4MDAxfDEyMy4yMC4xMDAdUngNTk",
      image:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/avatars/d/6/d61e6c4d3db79eff63b5b5e982149990_1473937824.jpg"
    },
    {
      name: "Khói thuốc đợi chờ",
      singer: "Phương Phương Thảo",
      path:
        "https://mp3-s1-zmp3.zadn.vn/c9b3cd20b2615b3f0270/4659461715075314007?authen=exp=1648028759~acl=/c9b3cd20b2615b3f0270/*~hmac=ba76f107d58b70f2669e83da1c45d345&fs=MTY0Nzg1NTk1OTM3M3x3ZWJWNnwwfDEdUngNTUdUngMjUyLjIzNg",
      image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/a/3/7/a/a37af929ae1643f792f2fe7bcce901ac.jpg"
    },
    {
      name: "Anh là của em",
      singer: "Karik",
      path: "https://mp3-s1-zmp3.zadn.vn/7b0509b170f599abc0e4/2575907685505638146?authen=exp=1648030067~acl=/7b0509b170f599abc0e4/*~hmac=a6097686ebd44d78c8431a9c9c15d0f9&fs=MTY0Nzg1NzI2NzExN3x3ZWJWNnwwfDE0LjIzMS4xMzIdUngMjE",
      image:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/covers/0/c/0c2b0067691ef5521afcebe2887028dc_1443425336.jpg"
    },
    {
      name: "Im Lặng",
      singer: "Lil' Knight",
      path: "https://mp3-s1-zmp3.zadn.vn/6f27f4c29f8676d82f97/843217914205189101?authen=exp=1648029827~acl=/6f27f4c29f8676d82f97/*~hmac=acb3a14be504e9784d4bfdc3566ea15f&fs=MTY0Nzg1NzAyNzE1Nnx3ZWJWNnwwfDE0LjIzMS4xMzIdUngMjE",
      image:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/avatars/0/e/0e099e8539364e5ac3667529fa04bc48_1508603757.jpg"
    },
    {
      name: "Vĩnh biệt màu xanh",
      singer: "Phương Phương thảo",
      path:
        "https://mp3-s1-zmp3.zadn.vn/2d4624d55b94b2caeb85/4595511745550010967?authen=exp=1648030183~acl=/2d4624d55b94b2caeb85/*~hmac=8e193001da2aec75020f51acd27ed173&fs=MTY0Nzg1NzM4MzmUsICxMXx3ZWJWNnwwfDE0LjIzMS4xMzIdUngMjE",
      image:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/a/3/7/a/a37af929ae1643f792f2fe7bcce901ac.jpg"
    },
    {
      name: "Nàng thơ",
      singer: "Hoàng Dũng",
      path: "https://data3.chiasenhac.com/downloads/2107/2/2106863-664f8a95/128/Nang%20Tho%20-%20Hoang%20Dung.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2020/07/31/c/5/8/9/1596188259603_500.jpg"
    }
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
