(function () {
    const slider = $('.products').bxSlider({
        pager: false,
        controls: false,
        touchEnabled: false,//пришлось отключить свайп. Не работает клик по кнопке
    });

    $(".arrow--next").click(e => {
        e.preventDefault();
        slider.goToNextSlide();
    })

    $(".arrow--prev").click(e => {
        e.preventDefault();
        slider.goToPrevSlide();
    })
})()
