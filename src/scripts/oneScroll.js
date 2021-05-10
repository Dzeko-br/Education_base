(function () {

    const sections = $("section");
    const display = $(".main-content");

    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();

    const sidemenu = $(".fix-dots");
    const hamburger = $('.humburger');

    let inScroll = false;

    sections.first().addClass("active");

    const countSectionPosition = sectionEq => {
        return sectionEq * -100;
    }

    const resetActiveClassForItem = (items, itemEq, activeClass) => {
        items.eq(itemEq).addClass(activeClass).siblings().remove(activeClass);
    }

    //
    const performTransition = sectionEq => {

        if (inScroll) return;

        const transitionOver = 1200;
        const mouseInertiaOver = 300;

        inScroll = true;
        const position = countSectionPosition(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        });

        resetActiveClassForItem(sections, sectionEq, "active");
        sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

        setTimeout(() => {
            inScroll = false;

            sidemenu
                .find(".fix-dots__item")
                .eq(sectionEq)
                .addClass("fix-dots__item--active")
                .siblings().removeClass("fix-dots__item--active");

            sidemenu.removeClass('fix-dots--black');
            hamburger.removeClass('humburger--black');

            if (sections.eq(sectionEq).attr('data-menu-color') === 'black') {
                sidemenu.addClass('fix-dots--black')
                hamburger.addClass('humburger--black');
            }

        }, transitionOver + mouseInertiaOver);
    };


    const scrollViewport = direction => {
        const activeSection = sections.filter(".active");
        const nextSection = activeSection.next();
        const prevSection = activeSection.prev();


        if (direction == "next" && nextSection.length) {
            performTransition(nextSection.index())
        }

        if (direction == "prev" && prevSection.length) {
            performTransition(prevSection.index())
        }
    };

    $(window).on("wheel", e => {
        const deltaY = e.originalEvent.deltaY;

        if (deltaY > 0) {
            scrollViewport("next");
        };

        if (deltaY < 0) {
            scrollViewport("prev");
        }
    });

    $(window).on("keydown", e => {

        const tagName = e.target.tagName.toLowerCase();

        if (tagName != "input" && tagName != "textarea") {

            switch (e.keyCode) {
                case 38:
                    scrollViewport("prev");
                    break;
                case 40:
                    scrollViewport("next");
                    break;
            }
        }
    });


    $("[data-scroll-to]").click(e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const target = $this.attr("data-scroll-to");
        const reqSection = $(`[data-section-id=${target}]`);

        performTransition(reqSection.index());
    })



    if (isMobile) {
        //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

        $("body").swipe({

            swipe: function (event, direction) {


                if (direction == "up") {
                    scrollViewport("next");
                };
                if (direction == "down") {
                    scrollViewport("prev");
                }

                // scroller[scrollDirection]();

            },
        });
    }

})()