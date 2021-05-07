const slider = $('.products').bxSlider({
    pager: false,
    controls: false,

});

$(".arrow--next").click(e => {
    e.preventDefault();
    slider.goToNextSlide();
})

$(".arrow--prev").click(e => {
    e.preventDefault();
    slider.goToPrevSlide();
})