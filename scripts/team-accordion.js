(function () {
    const openItem = item => {
        const container = item.closest(".team-list__item");
        const contentBlock = container.find(".team-list__desc");
        const textBlock = contentBlock.find(".team-list__desc-inner");
        const reqHeight = textBlock.height();

        container.addClass('active');
        contentBlock.height(reqHeight);
    }

    const closeEveryItem = container => {
        const items = container.find(".team-list__desc")
        const ItemContainer = container.find(".team-list__item");

        ItemContainer.removeClass("active");
        items.height(0);
    };

    $('.team-list__name').on('click', e => {
        const $this = $(e.currentTarget);
        const container = $this.closest(".team-list");
        const elemContainer = $this.closest(".team-list__item");

        $this.toggleClass('team-list__name--active');

        if (elemContainer.hasClass("active")) {
            closeEveryItem(container);
        } else {
            closeEveryItem(container);
            openItem($this);
        }
    });
})()
