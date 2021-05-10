(function () {
    const findBlockByAlias = (alias) => {
        return $(".reviews__content").filter((ndx, item) => {
            return $(item).attr("data-tab-content") == alias
        });
    }

    $(".reviews__tab .reviews__tab-link").click(e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const target = $this.attr("data-tab");
        const itemToShow = findBlockByAlias(target);
        const curItem = $this.closest(".reviews__tab");

        itemToShow.addClass("active").siblings().removeClass("active");
        curItem.addClass("round-pic--active").siblings().removeClass("round-pic--active");
    });
})()