// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

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
            name: "Yêu người có ước mơ",
            singer: "buitruonglinh",
            path: "https://archive.org/download/yeu-nguoi-co-uoc-mo-bai-hat-hay-nhat-buitruonglinh-nhac-viet-hot-thang-12-2022-v_202305/Y%C3%AAu%20Ng%C6%B0%E1%BB%9Di%20C%C3%B3%20%C6%AF%E1%BB%9Bc%20M%C6%A1%20%28B%C3%A0i%20H%C3%A1t%20Hay%20Nh%E1%BA%A5t%29%20-%20buitruonglinh%20-%20Nh%E1%BA%A1c%20Vi%E1%BB%87t%20Hot%20Th%C3%A1ng%2012_2022%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/12/15/0/3/9/2/1671089368641_500.jpg"
        },
        {
            name: "Em của ngày hôm qua",
            singer: "Son Tung M-TP",
            path: "https://archive.org/download/em-cua-ngay-hom-qua-son-tung-m-tp-v-pop-essentials-v.-a-playlist-nhac-cua-tui/Em%20C%E1%BB%A7a%20Ng%C3%A0y%20H%C3%B4m%20Qua%20-%20S%C6%A1n%20T%C3%B9ng%20M-TP%20-%20V-POP%20Essentials%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYVygoYy8ywSg-_nlDhd7aCditedMcoNVgsw&usqp=CAU"
        },
        {
            name: "Tìm lại bầu trời ",
            singer: "Tuấn Hưng",
            path:
                "https://archive.org/download/tim-lai-bau-troi-tuan-hung-ngoai-ay-v.-a-playlist-nhac-cua-tui/T%C3%ACm%20L%E1%BA%A1i%20B%E1%BA%A7u%20Tr%E1%BB%9Di%20-%20Tu%E1%BA%A5n%20H%C6%B0ng%20-%20Ngo%C3%A0i%20%E1%BA%A4y%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image: "https://dep.com.vn/wp-content/uploads/2017/05/Ca-si-Tuan-Hung-3.jpg"
        },
        {
            name: "Cơn mưa xa dần",
            singer: "Sơn Tùng M-TP",
            path: "https://archive.org/download/con-mua-xa-dan-son-tung-m-tp-co-the-hit-v.-a-playlist-nhac-cua-tui_202305/C%C6%A1n%20M%C6%B0a%20Xa%20D%E1%BA%A7n%20-%20S%C6%A1n%20T%C3%B9ng%20M-TP%20-%20C%C3%B3%20Th%E1%BB%83%20Hit%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://ss-images.saostar.vn/wp700/pc/1642295797624/saostar-9y89egqz0wq5r5ry.jpg"
        },
        {
            name: "Chạm khẽ tim anh một chút thôi",
            singer: "Noo Phước Thịnh",
            path: "https://archive.org/download/cham-khe-tim-anh-mot-chut-thoi-gala-nhac-viet-noo-phuoc-thinh-hello-lover-v.-a-playlist-nhac-cua-tui/Ch%E1%BA%A1m%20Kh%E1%BA%BD%20Tim%20Anh%20M%E1%BB%99t%20Ch%C3%BAt%20Th%C3%B4i%20%28Gala%20Nh%E1%BA%A1c%20Vi%E1%BB%87t%29%20-%20Noo%20Ph%C6%B0%E1%BB%9Bc%20Th%E1%BB%8Bnh%20-%20Hello%20Lover%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://trixie.com.vn/media/images/article/59037126/noo.jpg"
        },
        {
            name: "Em còn nhớ anh không???",
            singer: "Hoàng Tôn",
            path:
                "https://archive.org/download/em-con-nho-anh-khong-hoang-ton-koo-nhac-viet-song-ca-hay-nhat-2020-v.-a-playlist-nhac-cua-tui/Em%20C%C3%B2n%20Nh%E1%BB%9B%20Anh%20Kh%C3%B4ng-%20-%20Ho%C3%A0ng%20T%C3%B4n%2C%20Koo%20-%20Nh%E1%BA%A1c%20Vi%E1%BB%87t%20Song%20Ca%20Hay%20Nh%E1%BA%A5t%202020%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://vcdn-giaitri.vnecdn.net/2019/06/02/hoang-ton-9-3923-1559442775.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=YgliX9wzCbg7Q8wWnAO-3g"
        },
        {
            name: "2AM",
            singer: "Justatee x Big Daddy",
            path: "https://archive.org/download/2-am-justa-tee-big-daddy-nguoi-hat-cho-tinh-yeu-v.-a-playlist-nhac-cua-tui/2-am-justa-tee-big-daddy-nguoi-hat-cho-tinh-yeu-v.-a-playlist-nhac-cua-tui_archive.torrent",
            image:
                "https://i.ytimg.com/vi/XGrvLJG8tuM/hqdefault.jpg"
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
                        <div class="song ${index === this.currentIndex ? "active" : ""
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
