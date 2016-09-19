/**
 * Created by anton on 16.09.16.
 */
var mails = ['test@mail.ru', 'email@gmail.com'];

function FV() {
    this.init();
}

FV.prototype.init = function () {
    $("button").on("click", this.validateForm.bind(this));
    $("input").on("change", this.validateInput.bind(this));
}

FV.prototype.validateForm = function (e) {
    var inputs = $("input[type='text'], input[type='password']");
    var i = 0, l = inputs.length,
        val, input, mess, type;

    for (; i < l; i++) {
        input = $(inputs[i]);
        if (!input.parent().hasClass('required')) {
            continue;
        }
        val = input.val();
        if (!val) {
            mess = ' * Обязательны для заполнения';
            this.setValidity(input, mess);
        } else if (input.hasClass('inv')) {
            type = input.data("type");
            mess = this.checkInput(type, val);
            this.setValidity(input, mess);
        }
    }

    if (!mess) {
        input = $("input[type='checkbox']");
        val = input.is(':checked');
        if (!val) {
            mess = ' * Надо согласиться';
            var label = $('label[for="' + input.attr('id') + '"]');
            label.addClass("control-label");
        }
        this.setValidity(input, mess);
    }

    if (mess) {
        return false;
    }
    console.log('FORM VALID!!!');
    return false;
}

FV.prototype.validateInput = function (e) {
    var target = $(e.target),
        label = $('label[for="' + target.attr('id') + '"]'),
        val = target.val(),
        mess = '', type;
    if (target.parent().hasClass('required') && !val) {
        label.addClass("control-label");
        mess = ' * Обязательны для заполнения';
    } else {
        label.removeClass("control-label");
    }
    if (mess) {
        this.setValidity(target, mess);
        return;
    }
    type = target.data("type");
    mess = this.checkInput(type, val);
    if (mess) {
        this.setValidity(target, mess);
        return;
    }
    this.setValidity(target);
}

FV.prototype.checkInput = function (type, value) {
    var mess, valid;
    switch (type) {
        case 'email':
            valid = (mails.indexOf(value) === -1);
            mess = 'Адрес эл. почты уже занят';
            break;
        case 'pass':
            valid = /[0-9]/.test(value) && /[A-Za-z]/.test(value) && (value.length > 4);
            mess = 'Пароль должен содержать цифры и буквы и быть не короче 5 символов';
            this.validateInput({target: $('input[id="conf"]')});
            break;
        case 'conf':
            valid = (value === $('input[id="pass"]').val());
            mess = 'Пароль и подтверждение не совпадают';
            break;
    }
    if (valid) {
        return '';
    }
    return mess;
}

FV.prototype.setValidity = function (input, message) {
    if (!message) {
        $("span")[0].innerHTML = '';
        input.removeClass("inv");
        $("button").attr("disabled", false);
        return;
    }
    input.addClass("inv");
    $("button").attr("disabled", true);
    $("span")[0].innerHTML = message;
}

new FV();