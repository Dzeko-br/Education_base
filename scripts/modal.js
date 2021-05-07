const validateFields = (form, fieldsArray) => {

    fieldsArray.forEach((field) => {
        field.removeClass('input-error');

        //$('.error').text() очицает сообщение ЗАПОЛНИТЕ Поле, но при пустом не выводится

        if (field.val().trim() === "") {
            field.addClass('input-error');
            $('.error').text('Заполните это поле').css({ 'color': 'red' });
        }

    });

    const errorFields = form.find('.input-error');


    return errorFields.length === 0;
}

$('.form').submit((e) => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");
    const isValid = validateFields(form, [name, phone, comment, to]);

    console.log(isValid);


    const modal = $('#modal');
    const content = modal.find('.modal__content')

    if (isValid) {
        const request = $.ajax({
            url: 'https://webdev-api.loftschool.com/sendmail',
            method: 'post',
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            }
        });

        request.done(data => {
            content.text(data.message);
            $('.error').text('');
            $(form)[0].reset();
        });

        request.fail(data => {
            $('.error').text('');
            $(form)[0].reset();
            const message = data.responseJSON.message;
            content.text(message);
        });

        request.always(() => {
            $.fancybox.open({
                src: "#modal",
                type: "inline",
                smallBtn: false,
            });
        })
    }
});

$(".app-close-btn").click((e) => {
    e.preventDefault();

    $.fancybox.close();
})