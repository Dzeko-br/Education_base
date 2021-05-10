(function () {

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

})()