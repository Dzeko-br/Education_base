(function () {

    const messureWidth = (item) => {
        let reqItemWidth = 0
        const screenWidth = $(window).width()
        const container = item.closest(".menu-acco")
        const titlesBlocks = container.find(".menu-acco__btn")
        // const titlesWidth = titlesBlocks.width() * titlesBlocks.length
        const titlesWidth = titlesBlocks.width();

        const textContainer = item.find(".menu-acco__content");
        const paddingLeft = parseInt(textContainer.css("padding-left"))
        const paddingRight = parseInt(textContainer.css("padding-right"))

        const isTabletMenu = window.matchMedia("(max-width: 992px)").matches
        const isMobileMenu = window.matchMedia("(max-width: 480px)").matches

        if (isTabletMenu) {
            reqItemWidth = screenWidth - titlesWidth * titlesBlocks.length;
        }
        else if (isMobileMenu) {
            container.addClass("active");
            reqItemWidth = screenWidth - titlesWidth;

        } else {
            reqItemWidth = 600;
        }

        return {
            container: reqItemWidth,
            textContainer: reqItemWidth - paddingLeft - paddingRight
        }
    };

    const closeEveryItemInContainer = container => {
        const items = container.find(".menu-acco__item")
        const content = container.find(".menu-acco__hidden")

        container.removeClass("active")
        items.removeClass("menu-acco__item--active")
        content.width(0)
    }

    const openAcco = item => {

        const hiddenContent = item.find(".menu-acco__hidden")
        const reqWidth = messureWidth(item)

        const textBlock = item.find(".menu-acco__content")

        item.addClass("menu-acco__item--active")
        hiddenContent.width(reqWidth.container)
        textBlock.width(reqWidth.textContainer)
    };

    $(".menu-acco__btn").on("click", e => {
        e.preventDefault()

        const $this = $(e.currentTarget);
        const item = $this.closest(".menu-acco__item")
        const itemOpened = item.hasClass("menu-acco__item--active")
        const container = $this.closest(".menu-acco")

        if (itemOpened) {
            closeEveryItemInContainer(container)
        } else {
            closeEveryItemInContainer(container)
            openAcco(item)
        }
    });

    $(".menu-acco__close").on("click", e => {
        e.preventDefault()
        closeEveryItemInContainer($('.menu-acco'))
    });
})()