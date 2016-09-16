/**
 * Created by anton on 16.09.16.
 */
function FV() {
    this.init();
}

FV.prototype.init = function () {
    //document.getElementById("login").addEventListener("invalid",this.invalidLogin.bind(this));
    // $("#login").on("invalid", this.invalidLogin.bind(this));
    $("button").on("click", this.validateForm.bind(this));
}


FV.prototype.invalidLogin = function (e) {
    console.log("e = ", e);
    var label = $('label[for="' + $(e.target).attr('id') + '"]');
    label.addClass("control-label");
    e.target.setCustomValidity('TEST');
}

FV.prototype.validateForm = function (e) {
    console.log("e = ", e);
    var inputs = $("input[type='text']");

    var i = 0, l = inputs.length, label,
        type, val, regexp,
        invalid = false;
    for (; i < l; i++) {
        label = $('label[for="' + $(inputs[i]).attr('id') + '"]');
        label.removeClass("control-label");
        val = $(inputs[i]).val();
        console.log("val = ", inputs[i]);
        if ($(inputs[i]).parent().hasClass("required") && !val) {
            label.addClass("control-label");
            invalid = true;
        }
        type = $(inputs[i]).data("type");
        console.log("type = ", type);
        switch (type) {
            case 'email':
                break;
            case  'pass':
                break;
            case 'conf':
                if ($('#pass').val() !== val) {console.log('re');}
                break;
        }
    }
    return false;
}

new FV();