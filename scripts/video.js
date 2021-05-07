// let player;
// const playerContainer = $('.player')

// let eventsInit = () => {
//     $(".player__start").click(e => {
//         e.preventDefault();

//youtube

//         $(e.currentTarget).toggleClass('paused');

//         if (playerContainer.hasClass("paused")) {
//             player.pauseVideo();
//         } else {
//             player.playVideo();
//         }
//     });


//     $('.player__playback').click(e => {
//         const bar = $(e.currentTarget);
//         const clickedPosition = e.originalEvent.layerX;
//         const btnPosition = (clickedPosition / bar.width()) * 100;
//         const newPlaybackPosition = (player.getDuration() / 100) * btnPosition;

//         $('.player__playback-btn').css({
//             left: `${btnPosition}%`
//         });

//         player.seekTo(newPlaybackPosition)

//         // let x = (e.pageX - $(this).offset().left) / $(this).width();
//         // video.currentTime = x * video.duration;

//     })

//     $('.volume__playback').on('click', e => {
//         const bar = $(e.currentTarget);
//         const clickedPosition = e.originalEvent.layerX;
//         let btnPosition = (clickedPosition / bar.width()) * 100;
//         btnPosition = Math.round(btnPosition);

//         $('.volume__playback-btn').css({
//             left: `${btnPosition}%`
//         });

//         player.setVolume(btnPosition)
//     })



//     $('.player__splash').on('click', e => {
//         player.playVideo();
//     })
// }

// const onPlayerReady = () => {
//     let interval;
//     const durationSec = player.getDuration();
//     // const volumeLine = player.getVolume();

//     // $(".player__duration-estimate").text(formatTime(durationSec));

//     if (typeof interval !== "undefined") {
//         clearInterval(interval);
//     }

//     interval = setInterval(() => {
//         const completedSec = player.getCurrentTime();
//         const completedPersent = (completedSec / durationSec) * 100;

//         $('.player__playback-btn').css({
//             left: `${completedPersent}%`
//         })

//         // $('.volume__playback-btn').css({
//         //     // left: `${completedPersentVol}%`
//         // })


//         // $(".player__duration-completed").text(formatTime(completedSec));
//     }, 1000);
// };

// const onPlayerStateChange = event => {
//     /*
//     Возвращает состояние проигрывателя. Возможные значения:
//     -1 – воспроизведение видео не началось
//     0 – воспроизведение видео завершено
//     1 – воспроизведение
//     2 – пауза
//     3 – буферизация
//     5 – видео находится в очереди
//     */

//     switch (event.data) {
//         case 1:
//             playerContainer.addClass('active')
//             playerContainer.addClass("paused");
//             break;
//         case 2:
//             playerContainer.removeClass('active')
//             playerContainer.removeClass("paused");
//             break;
//     }
// }


// function onYouTubeIframeAPIReady() {
//     player = new YT.Player("yt-player", {
//         height: "405",
//         width: "660",
//         videoId: "9Hn8twBs6QQ",
//         events: {
//             onReady: onPlayerReady,
//             onStateChange: onPlayerStateChange
//         },
//         playerVars: {
//             controls: 0,
//             disablekb: 0,
//             showinfo: 0,
//             rel: 0,
//             autoplay: 0,
//             modestbranding: 0
//         }
//     });
// }

// eventsInit()




const btnPlay = document.querySelector('.player__start');
const video = document.querySelector('.player__video');
const splash = document.querySelector('.player__splash');

const togglePlay = () => {
    if (video.paused || video.ended) {
        video.play();
        $('.player').addClass('active');
        $('.player__start').addClass('paused');
        setInterval(currentMove);
    } else {
        video.pause();
        $('.player').removeClass('active');
        $('.player__start').removeClass('paused');
    }
};

$(splash).on('click', togglePlay);
$(btnPlay).on('click', togglePlay);
$(video).on('click', togglePlay);

const currentMove = () => {
    const completedSec = video.currentTime;
    const completedPercent = (completedSec / video.duration) * 100;

    const completedVolume = (video.volume * 100)

    $('.player__playback-btn').css({
        left: `${completedPercent}%`
    });

    $('.volume__playback-btn').css({
        left: `${completedVolume}%`
    });
};

$('.player__playback').on('click', function (e) {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const btnPosition = (clickedPosition / bar.width()) * 100;

    $('.player__playback-btn').css({
        left: `${btnPosition}%`
    });

    let x = (e.pageX - $(this).offset().left) / $(this).width();
    video.currentTime = x * video.duration;

});

$('.player__volume-btn').on('click', function () {

    if (video.volume > 0) {
        video.volume = 0;
        $(this).addClass('mute');

    } else {
        video.volume = 1;
        $('.player__volume-btn').removeClass('mute');
    }
});

$('.volume__playback').on('click', function (e) {
    let x = (e.pageX - $(this).offset().left) / $(this).width();
    video.volume = x;
});