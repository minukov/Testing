/**
 * Created by anton on 15.09.16.
 */

function MZ() {
    this.init();
}

MZ.prototype.init = function () {
    $('#gallery').on("click", this.zoomImg.bind(this));
    $("#close").on("click", this.hideImg.bind(this));
    $(window).on('resize', this.resizeWindow.bind(this));
    $(window).on('keydown', this.keyWindow.bind(this));
}

MZ.prototype.zoomImg = function (e) {
    if (e.target.tagName !== 'IMG') {
        return;
    }

    $("#overlay").css({
        'display': 'block'
    });

    $("#close").css({
        'display': 'block',
        'cursor': 'pointer'
    });

    var img = $("<img/>").attr("src", $(e.target).attr('src'))[0];
    $(img).attr("width", "100%");
    $(img).attr("height", "100%");
    $("#cont").prepend(img);

    this.setImgSize(img.naturalWidth, img.naturalHeight);

}

MZ.prototype.hideImg = function () {
    $("#overlay").css({
        'display': 'none'
    });

    $("#cont").css({
        'display': 'none'
    });

    $("#close").css({
        'display': 'none'
    });

    $("#cont > img").remove();
}

MZ.prototype.setImgSize = function (width, height) {
    var imageWidth = width,
        imageHeight = height,
        maxWidth = $(window).width(),
        maxHeight = $(window).height(),
        widthRatio = maxWidth / imageWidth,
        heightRatio = maxHeight / imageHeight;

    var ratio = widthRatio;
    if (widthRatio * imageHeight > maxHeight) {
        ratio = heightRatio;
    }

    $("#cont").removeAttr('style');
    $("#cont").css({
        'display': 'block',
        'width': imageWidth * ratio,
        'height': imageHeight * ratio,
        'margin-left': -1 * imageWidth * ratio / 2,
        'margin-top': -1 * imageHeight * ratio / 2
    });

}

MZ.prototype.resizeWindow = function () {
    this.setImgSize($("#cont").width(), $("#cont").height());
}

MZ.prototype.keyWindow = function (e) {
    // code Esc
    if (e.keyCode !== 27) {
        return;
    }
    this.hideImg();
}

new MZ();