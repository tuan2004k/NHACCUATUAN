
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "PLAYER";

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
            name: "BẠN ĐỜI",
            singer: "KARIK ft GDUCKY",
            path: "https://archive.org/download/ban-doi-karik-x-gducky/Ban-Doi--Karik-x-Gducky.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2023/10/03/f/e/7/2/1696311595243_640.jpg",
        },
        {
            name: "Sự Thât Sau Một Lời Hứa",
            singer: "Chi Dân",
            path: "https://archive.org/download/su-that-sau-mot-loi-hua-chi-dan-3316709/SuThatSauMotLoiHua-ChiDan-3316709.mp3",
            image: "https://cherryradio.com.au/uploads/singer/avatar/2019/01/695/1547199065_600.jpg",
        },
        {
            name: "Ngõ Chạm",
            singer: "EMILY x BIGDADDY",
            path: "https://archive.org/download/ngo-cha-m-bigdaddy-x-emily-official-music-video-v-240-p/NG%C3%95%20CH%E1%BA%A0M%20%20BIGDADDY%20x%20EMILY%20%20OFFICIAL%20MUSIC%20VIDEO_v240P.mp3",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ZyGd_CB28EKSGlam4UH8v2OIqIXvgB5AXUWrG9CM4KB70C5Ec6jIy5DmrAgF-VnmGds&usqp=CAU",
        },
        {
            name: "Anh Là Ai",
            singer: "Huỳnh Công Hiếu & DT Tập Rap",
            path: "https://archive.org/download/anh-la-ai-huynh-cong-hieu-dt-tap-rap/Anh%20L%C3%A0%20Ai%20%20Hu%E1%BB%B3nh%20C%C3%B4ng%20Hi%E1%BA%BFu%20%20DT%20T%E1%BA%ADp%20Rap.mp3",
            image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/394332312_868257764921313_6861759454307793711_n.png?stp=dst-png_p206x206&_nc_cat=107&ccb=1-7&_nc_sid=510075&_nc_ohc=LMXRe8I9wsMAX_spnRC&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR4kwJdLqr3LY2-FDosqtL6mD34ZkodvU06yhbhNBtwGQ&oe=6558E73B",
        },
        {
            name: "Yêu Người Có Ước Mơ",
            singer: "buitruonglinh",
            path: "https://archive.org/download/yeu-nguoi-co-uoc-mo-bai-hat-hay-nhat-buitruonglinh-nhac-viet-hot-thang-12-2022-v_202305/Y%C3%AAu%20Ng%C6%B0%E1%BB%9Di%20C%C3%B3%20%C6%AF%E1%BB%9Bc%20M%C6%A1%20%28B%C3%A0i%20H%C3%A1t%20Hay%20Nh%E1%BA%A5t%29%20-%20buitruonglinh%20-%20Nh%E1%BA%A1c%20Vi%E1%BB%87t%20Hot%20Th%C3%A1ng%2012_2022%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/12/15/0/3/9/2/1671089368641_500.jpg"
        },
        {
            name: "Anh Không Cố Ý",
            singer: "Ogenus & Limitlxss",
            path: "https://archive.org/download/anh-khong-co-y-oge-nus-limitlxss-team-big-daddy-rap-viet-2023-mv-lyrics-v-240-p/Anh%20Kh%C3%B4ng%20C%E1%BB%91%20%C3%9D%20%20OgeNus%20%20Limitlxss%20%20Team%20BigDaddy%20%20Rap%20Vi%E1%BB%87t%202023%20MV%20Lyrics_v240P.mp3",
            image: "https://scontent.xx.fbcdn.net/v/t1.15752-9/393686269_710022661152064_1733492250562868286_n.png?stp=dst-png_s261x260&_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_ohc=GxktAP0aam8AX_Mbp6E&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSP6pmG05A-HeCSbM2oE9WdAVjt0NtMro9A1KdSpD6v9A&oe=6558E936"
        },
        {
            name: "Em Của Ngày Hôm Qua",
            singer: "Sơn Tùng M-TP",
            path: "https://archive.org/download/em-cua-ngay-hom-qua-son-tung-m-tp-v-pop-essentials-v.-a-playlist-nhac-cua-tui/Em%20C%E1%BB%A7a%20Ng%C3%A0y%20H%C3%B4m%20Qua%20-%20S%C6%A1n%20T%C3%B9ng%20M-TP%20-%20V-POP%20Essentials%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYVygoYy8ywSg-_nlDhd7aCditedMcoNVgsw&usqp=CAU"
        },
        {
            name: "Lệ Lưu Ly ",
            singer: "Vũ Phụng Tiên x DT Tập Rap x DRUM 7",
            path:
                "https://archive.org/download/le-lu-u-ly-vu-phu-ng-tie-n-x-dt-ta-p-rap-x-drum-7-official-lyric-video-v-240-p/L%E1%BB%86%20L%C6%AFU%20LY%20%20V%C5%A8%20PH%E1%BB%A4NG%20TI%C3%8AN%20X%20DT%20T%E1%BA%ACP%20RAP%20X%20DRUM7%20%20OFFICIAL%20LYRIC%20VIDEO_v240P.mp3",
            image: "https://i.ytimg.com/vi/Klqg7Ps5VL8/maxresdefault.jpg"
        },
        {
            name: "Bài Này Không Để Đi Diển",
            singer: "Anh Tú Atus",
            path:
                "https://archive.org/download/bai-nay-khong-de-di-dien-anh-tu-atus-nhac-viet-hot-thang-11-2022-v.-a-playlist-nhac-cua-tui/B%C3%A0i%20N%C3%A0y%20Kh%C3%B4ng%20%C4%90%E1%BB%83%20%C4%90i%20Di%E1%BB%85n%20-%20Anh%20T%C3%BA%20Atus%20-%20Nh%E1%BA%A1c%20Vi%E1%BB%87t%20Hot%20Th%C3%A1ng%2011_2022%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtv4OKh1vFbzoz-lfT3tjK2od1ZiL2foIexjwnbK5w0E_6g0KWRX66RivBrJ2ugAQRA6z-Yy_e3pSe-D3eInlvLIXVkfKO5GdCcr8v5t5FSATmAun6FEiXeQxgMryUsR4IcgqJq1XgwZ4rSz9f7MpZkLTb9JqvMDK1SKyEt-nLLPRQSkEVGCo7Z2VdOA/s1440/FB_IMG_1665400345431.jpg"
        },
        {
            name: "À Lôi",
            singer: "Double 2T x MASEW",
            path:
                "https://archive.org/download/double-2-t-x-masew-a-loi-official-lyric-video-masewprod-double-2-tofficial-v-240-p/Double2T%20x%20Masew%20%20%C3%80%20L%C3%B4i%20%20%20Official%20Lyric%20Video%20Masewprod%20Double2TOfficial_v240P.mp3",
            image: "https://cdnphoto.dantri.com.vn/8T0xAg-KyYBFjOfyeHL9DpXHupQ=/thumb_w/1020/2023/07/27/ca-khuc-a-loi-cua-nam-rapper-moi-noi-gay-bao-am-nhac-vietdocx-1690428737751.jpeg"
        },

        {
            name: "Cơn Mưa Xa Dần",
            singer: "Sơn Tùng M-TP",
            path: "https://archive.org/download/con-mua-xa-dan-son-tung-m-tp-co-the-hit-v.-a-playlist-nhac-cua-tui_202305/C%C6%A1n%20M%C6%B0a%20Xa%20D%E1%BA%A7n%20-%20S%C6%A1n%20T%C3%B9ng%20M-TP%20-%20C%C3%B3%20Th%E1%BB%83%20Hit%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://scontent.xx.fbcdn.net/v/t1.15752-9/393838752_875495760811368_6016029949774000207_n.png?stp=dst-png_s261x260&_nc_cat=100&ccb=1-7&_nc_sid=510075&_nc_ohc=DJFkJcGtsuwAX_4PEIR&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRpWyp5TifnTjVbsSy9fx8mijquyTvobobHwzFQ5LRL2w&oe=6557AC0E"
        },
        {
            name: "Nắng Ấm Ngang Qua",
            singer: "Sơn Tùng M-TP",
            path: "https://archive.org/download/nang-am-ngang-qua-son-tung-m-tp-tiec-tung-thoi-v.-a-playlist-nhac-cua-tui_202304/N%E1%BA%AFng%20%E1%BA%A4m%20Ngang%20Qua%20-%20S%C6%A1n%20T%C3%B9ng%20M-TP%20-%20Ti%E1%BB%87c%20T%C3%B9ng%20Th%C3%B4i%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://scontent.xx.fbcdn.net/v/t1.15752-9/393587576_3059834610826846_3291990996972069318_n.png?stp=dst-png_s240x240&_nc_cat=100&ccb=1-7&_nc_sid=510075&_nc_ohc=5q0mi6HP9WgAX_yvqzY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdT_Qfz7x9t47ZHCaOqZWKn_wYP8HPf9i5BPY222Wm9yew&oe=6557A3A0"
        },
        {
            name: "Chạm Khẽ Tim Anh Một Chút Thôi",
            singer: "Noo Phước Thịnh",
            path: "https://archive.org/download/cham-khe-tim-anh-mot-chut-thoi-gala-nhac-viet-noo-phuoc-thinh-hello-lover-v.-a-playlist-nhac-cua-tui/Ch%E1%BA%A1m%20Kh%E1%BA%BD%20Tim%20Anh%20M%E1%BB%99t%20Ch%C3%BAt%20Th%C3%B4i%20%28Gala%20Nh%E1%BA%A1c%20Vi%E1%BB%87t%29%20-%20Noo%20Ph%C6%B0%E1%BB%9Bc%20Th%E1%BB%8Bnh%20-%20Hello%20Lover%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://trixie.com.vn/media/images/article/59037126/noo.jpg"
        },
        {
            name: "Vì Yêu Cứ Đâm Đầu",
            singer: "MIN x ĐEN VÂU x JUSTATEE",
            path: "https://archive.org/download/vi-yeu-cu-dam-dau-min-den-justa-tee-hit-viet-quoc-dan-v.-a-playlist-nhac-cua-tui_202304/V%C3%AC%20Y%C3%AAu%20C%E1%BB%A9%20%C4%90%C3%A2m%20%C4%90%E1%BA%A7u%20-%20MIN%2C%20%C4%90en%2C%20JustaTee%20-%20Hit%20Vi%E1%BB%87t%20Qu%E1%BB%91c%20D%C3%A2n%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/0/3/a/c/03ac82cbf720ea5d24129dc5a2bb5bbe.jpg"
        },
        {
            name: "Em Còn Nhớ Anh Không",
            singer: "Hoàng Tôn",
            path:
                "https://archive.org/download/em-con-nho-anh-khong-hoang-ton-koo-nhac-viet-song-ca-hay-nhat-2020-v.-a-playlist-nhac-cua-tui/Em%20C%C3%B2n%20Nh%E1%BB%9B%20Anh%20Kh%C3%B4ng-%20-%20Ho%C3%A0ng%20T%C3%B4n%2C%20Koo%20-%20Nh%E1%BA%A1c%20Vi%E1%BB%87t%20Song%20Ca%20Hay%20Nh%E1%BA%A5t%202020%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://vcdn-giaitri.vnecdn.net/2019/06/02/hoang-ton-9-3923-1559442775.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=YgliX9wzCbg7Q8wWnAO-3g"
        },
        {
            name: "2AM",
            singer: "Justatee x Big Daddy",
            path: "https://ia601400.us.archive.org/21/items/2-am-justa-tee-big-daddy-nguoi-hat-cho-tinh-yeu-v.-a-playlist-nhac-cua-tui/2AM%20-%20JustaTee%2C%20BigDaddy%20-%20Ng%C6%B0%E1%BB%9Di%20H%C3%A1t%20Cho%20T%C3%ACnh%20Y%C3%AAu%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://i.ytimg.com/vi/XGrvLJG8tuM/hqdefault.jpg"
        },
        {
            name: "Muộn Rồi Mà Sao Còn",
            singer: "Sơn Tùng M-TP",
            path: "https://archive.org/download/muon-roi-ma-sao-con-son-tung-m-tp/Mu%E1%BB%99n%20R%E1%BB%93i%20M%C3%A0%20Sao%20C%C3%B2n%20-%20S%C6%A1n%20T%C3%B9ng%20M-TP.mp3",
            image:
                "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/dataimages/202104/original/images2364451_t17_3.jpg"
        },
        
        {
            name: "Chiều Hôm Ấy",
            singer: "Jaykii",
            path: "https://archive.org/download/chieu-hom-ay-jay-kii-nu-hon-tam-biet-v.-a-playlist-nhac-cua-tui/Chi%E1%BB%81u%20H%C3%B4m%20%E1%BA%A4y%20-%20JayKii%20-%20N%E1%BB%A5%20H%C3%B4n%20T%E1%BA%A1m%20Bi%E1%BB%87t%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://static2.yan.vn/YanNews/2167221/202109/jaykii-la-ai-thong-tin-tieu-su-ca-si-tran-anh-quan-4d3dc683.jpeg"
        },
        {
            name: "Khi Cơn Mơ Dần Phai",
            singer: "Tez Ft Myra Trần",
            path: "https://archive.org/download/khi-con-mo-dan-phai-tez-ft-myra-tran-team-big-daddy-rap-viet-2023-mv-lyrics-v-240-p/Khi%20C%C6%A1n%20M%C6%A1%20D%E1%BA%A7n%20Phai%20%20Tez%20ft%20Myra%20Tr%E1%BA%A7n%20%20Team%20BigDaddy%20%20Rap%20Vi%E1%BB%87t%202023%20MV%20Lyrics_v240P.mp3",
            image:
                "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/9/3/1237038/Thi-Sinh-Tez-7.jpg"
        },
        {
            name: "Yêu 5",
            singer: "RHYMASTIC",
            path: "https://archive.org/download/yeu-5-rhymastic-da-den-luc-yeu-v.-a-playlist-nhac-cua-tui/Y%C3%AAu%205%20-%20Rhymastic%20-%20%C4%90%C3%A3%20%C4%90%E1%BA%BFn%20L%C3%BAc%20Y%C3%AAu%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://yt3.googleusercontent.com/PEk69mTAxuH0HufHMPfpoNs8083NDC5EXRUeJK9ACkkgdmvPEG6Oh_I5KLCuuOSlH79u0QRWHw=s900-c-k-c0x00ffffff-no-rj"
        },
        {
            name: "Tháng Tư Là Lời Nói Dối Của Em",
            singer: "Hà Anh Tuấn",
            path: "https://archive.org/download/thang-tu-la-loi-noi-doi-cua-em-ha-anh-tuan-v-pop-essentials-v.-a-playlist-nhac-cua-tui/Th%C3%A1ng%20T%C6%B0%20L%C3%A0%20L%E1%BB%9Di%20N%C3%B3i%20D%E1%BB%91i%20C%E1%BB%A7a%20Em%20-%20H%C3%A0%20Anh%20Tu%E1%BA%A5n%20-%20V-POP%20Essentials%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://vnn-imgs-a1.vgcloud.vn/img.infonet.vn/w490/Uploaded/2020/rkjokv/2020_04_01/kpodbivavwmdb7yczkrjr0cdvtccjzshfsxl8qpg_oumk.jpeg"
        },
        {
            name: "Take It Easy",
            singer: "Liu Grace",
            path: "https://archive.org/download/take-it-easy-liu-grace-team-thai-vg-rap-viet-2023-mv-lyrics-v-240-p/Take%20It%20Easy%20%20Liu%20Grace%20%20Team%20Th%C3%A1i%20VG%20%20Rap%20Vi%E1%BB%87t%202023%20MV%20Lyrics_v240P.mp3",
            image:
                "https://scontent.xx.fbcdn.net/v/t1.15752-9/394224206_295943570043462_6424527389384590089_n.png?stp=dst-png_p235x165&_nc_cat=107&ccb=1-7&_nc_sid=510075&_nc_ohc=faPQD-5CKCwAX8joqLa&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRr0iWUVQl0CVNRgPvn0qQCEe80talHelp1SjwohjVXNg&oe=6558FC7B"
        },
        {
            name: "Buông Đôi Tay Nhau Ra",
            singer: "Sơn Tùng M-TP",
            path: "https://archive.org/download/BuongDoiTayNhauRaSonTungMTP4184408Hq/BuongDoiTayNhauRa-SonTungMTP-4184408_hq.mp3",
            image:
                "https://images2.thanhnien.vn/Uploaded/vuphuong/2015_12_18/dsj_5746_XCNT.jpg?width=500"
        },
        {
            name: "Suýt Nữa Thì",
            singer: "Andiez",
            path: "https://archive.org/download/SuytNuaThiAndiezLosslessFLAC/Suyt%20Nua%20Thi%20-%20Andiez%20%5BLossless_FLAC%5D.mp3",
            image:
                "https://images2.thanhnien.vn/zoom/700_438/Uploaded/phuongthanh/2018_05_22/batch_a7200228_NGJY.jpg"
        },
        {
            name: "Anh Đã Quen Với Cô Đơn",
            singer: "Soobin Hoàng Sơn",
            path: "https://archive.org/download/anh-da-quen-voi-co-don-soobin-hoang-son/Anh%20%C4%90%C3%A3%20Quen%20V%E1%BB%9Bi%20C%C3%B4%20%C4%90%C6%A1n_Soobin%20Ho%C3%A0ng%20S%C6%A1n.mp3",
            image:
                "https://vnn-imgs-f.vgcloud.vn/2021/11/07/09/soobin-hoang-son-co-luc-ap-luc-tinh-than-toi-hoan-toan-suy-sup.jpg"
        },
        {
            name: "Nếu Lúc Đó",
            singer: "tlinh (ft 2pillz)",
            path: "https://archive.org/download/neu-luc-do-tlinh-2pillz-v-pop-essentials-v.-a-playlist-nhac-cua-tui/n%E1%BA%BFu%20l%C3%BAc%20%C4%91%C3%B3%20-%20tlinh%2C%202pillz%20-%20V-POP%20Essentials%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://vcdn-giaitri.vnecdn.net/2023/03/06/Tlinh-3403-1678086389.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=0W411dFg3khe-OwYxspViA"
        },
        {
            name: "Chờ Đợi Có Đáng Sợ",
            singer: "Andiez",
            path: "https://archive.org/download/cho-doi-co-dang-so-andiez-that-tinh-vol.-37-v.-a-playlist-nhac-cua-tui_202202/Ch%E1%BB%9D%20%C4%90%E1%BB%A3i%20C%C3%B3%20%C4%90%C3%A1ng%20S%E1%BB%A3%20-%20Andiez%20-%20Th%E1%BA%A5t%20T%C3%ACnh%20%28Vol.%2037%29%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://i.ytimg.com/vi/AYVXY7Rsu2c/maxresdefault.jpg"
        },
        {
            name: "Khi Người Mình Yêu Khóc",
            singer: "Phan Mạnh Quỳnh",
            path: "https://archive.org/download/khi-nguoi-minh-yeu-khoc-phan-manh-quynh-se-co-ngay-v.-a-playlist-nhac-cua-tui/Khi%20Ng%C6%B0%E1%BB%9Di%20M%C3%ACnh%20Y%C3%AAu%20Kh%C3%B3c%20-%20Phan%20M%E1%BA%A1nh%20Qu%E1%BB%B3nh%20-%20S%E1%BA%BD%20C%C3%B3%20Ng%C3%A0y%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://galaxylands.com.vn/wp-content/uploads/2022/12/ca-si-phan-manh-quynh-2.jpg"
        },

        {
            name: "Có Em Chờ",
            singer: "MIN ft Mr.A",
            path: "https://archive.org/download/min-co-em-cho-ft-mr-a-official-mv-v-240-p/MIN%20%20C%C3%B3%20Em%20Ch%E1%BB%9D%20ft%20Mr%20A%20Official%20MV_v240P.mp3",
            image:
                "https://ss-images.saostar.vn/2017/05/10/1277995/cpn_1619.jpg"
        },
        {
            name: "Phía Sau Em",
            singer: "Kay Trần x Binz",
            path: "https://archive.org/download/phia-sau-em-kay-tran-binz-my-nam-nhac-viet-v.-a-playlist-nhac-cua-tui/Ph%C3%ADa%20Sau%20Em%20-%20Kay%20Tr%E1%BA%A7n%2C%20Binz%20-%20M%E1%BB%B9%20Nam%20Nh%E1%BA%A1c%20Vi%E1%BB%87t%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/song/2018/07/11/6/b/a/3/1531324811184_640.jpg"
        },
        {
            name: "Cao Ốc 20",
            singer: "B Ray x Đat G x MASEW",
            path: "https://archive.org/download/cao-oc-20-b-ray-dat-g-v-pop-hay-nhat-2019-v.-a-playlist-nhac-cua-tui/Cao%20%E1%BB%90c%2020%20-%20B%20Ray%2C%20%C4%90%E1%BA%A1t%20G%20-%20V-Pop%20Hay%20Nh%E1%BA%A5t%202019%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://i1.sndcdn.com/artworks-000556537428-fuinlx-t500x500.jpg"
        },
        {
            name: "Sài Gòn Hôm Nay Mưa",
            singer: "Hoàng Duyên x Hứa Kim Tuyền",
            path: "https://archive.org/download/sai-gon-dau-long-qua-hua-kim-tuyen-hoang-duyen/S%C3%A0i%20G%C3%B2n%20%C4%90au%20L%C3%B2ng%20Qu%C3%A1%20-%20H%E1%BB%A9a%20Kim%20Tuy%E1%BB%81n%2C%20Ho%C3%A0ng%20Duy%C3%AAn.mp3",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2FPxj67_rr-gxv7OF6PU1LMut2783BrB2W77TQjdb0bu3c7JZSvonenKLbNKAdfab4z4&usqp=CAU"
        },
        {
            name: "Vệ Tinh",
            singer: "HIEUTHUHAI",
            path: "https://archive.org/download/ve-tinh-hieuthuhai-hoang-ton-kewtiie-tiec-tung-thoi-v.-a-playlist-nhac-cua-tui_202304/V%E1%BB%87%20Tinh%20-%20HIEUTHUHAI%2C%20Ho%C3%A0ng%20T%C3%B4n%2C%20Kewtiie%20-%20Ti%E1%BB%87c%20T%C3%B9ng%20Th%C3%B4i%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://media.viez.vn/prod/2023/4/19/large_image_2974b45ac0.png"
        },
        {
            name: "Khó Vẽ Nụ Cười",
            singer: "Đạt G x Du Uyên",
            path: "https://archive.org/download/kho-ve-nu-cuoi-dat-g-du-uyen-v-pop-essentials-v.-a-playlist-nhac-cua-tui/Kh%C3%B3%20V%E1%BA%BD%20N%E1%BB%A5%20C%C6%B0%E1%BB%9Di%20-%20%C4%90%E1%BA%A1t%20G%2C%20Du%20Uy%C3%AAn%20-%20V-POP%20Essentials%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://i1.sndcdn.com/artworks-000612189364-sccajj-t500x500.jpg"
        },
        {
            name: "Để Anh Một Mình",
            singer: "Rhyder",
            path: "https://archive.org/download/de-anh-mot-minh-rhyder/%C4%90%E1%BB%83%20Anh%20M%E1%BB%99t%20M%C3%ACnh%20%20Rhyder.mp3",
            image:
                "https://i1.sndcdn.com/artworks-WyRACRxXYPY9fhPv-UEiz2Q-t500x500.jpg"
        },
        {
            name: "Dù Cho Mai Về Sau",
            singer: "buitruonglinh",
            path: "https://archive.org/download/du-cho-mai-ve-sau-acoustic-version-bui-truong-linh-tuoi-mat-tam-hon-v.-a-playlist-nhac-cua-tui_202107/D%C3%B9%20Cho%20Mai%20V%E1%BB%81%20Sau%20%28Acoustic%20Version%29%20-%20B%C3%B9i%20Tr%C6%B0%E1%BB%9Dng%20Linh%20-%20T%C6%B0%E1%BB%9Bi%20M%C3%A1t%20T%C3%A2m%20H%E1%BB%93n%20-%20V.A%20-%20Playlist%20NhacCuaTui.mp3",
            image:
                "https://images.genius.com/0307e788dcf5483556030ecbcd3c6a24.500x500x1.jpg"
        },

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

