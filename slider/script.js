/**
 * Created by anton on 19.09.16.
 */


function Slider(elem, options) {
    this.$elem = $(elem);
    var options = options || {};
    this.interval = undefined;
    this.startInterval = undefined;
    this.maxImgWidth = options.maxImgWidth || '800px';
    this.selectedIndex = options.selectedIndex || 1;
    this.slideDelay = options.slideDelay || 2000;
    this.startDelay = options.startDelay || 5000;
    this.init(this.$elem, options.imgs || []);
}


Slider.prototype.init = function (element, imageArray) {
    var $parent, $elem, $img, $span,
        i = 0, l = imageArray.length;
    if (l === 0) {
        return;
    }
    $parent = $("<div></div>");
    $parent.attr("class", "gallery");
    $parent.css("max-width", this.maxImgWidth);
    $parent.on("click", this.stopSlide.bind(this));

    $elem = $("<a></a>");
    $elem.attr("class", "left");
    $elem.on("click", this.slide.bind(this, -1));
    $parent.append($elem);

    $elem = $("<a></a>");
    $elem.attr("class", "right");
    $elem.on("click", this.slide.bind(this, 1));
    $parent.append($elem);

    $elem = $("<div></div>");
    $elem.attr("class", "indicator");
    $parent.append($elem);

    for (; i < l; i++) {
        $img = $("<img>");
        $span = $("<span></span>");
        $span.on("click", this.selectSlide.bind(this));
        if ((i + 1) === this.selectedIndex) {
            $img.attr('class', 'active');
            $span.attr('class', 'white');
        }
        $img.attr('src', imageArray[i]);
        $span.attr('data-id', i + 1);
        $parent.append($img);
        $elem.append($span);
    }

    element.append($parent);
    this.startSlide();
}

Slider.prototype.slide = function (step) {
    var nextIndex = this.selectedIndex + step;
    var imgs = this.$elem.find('IMG');

    if (nextIndex === 0) nextIndex = imgs.length;
    if (nextIndex > imgs.length) nextIndex = 1;

    var $active = this.$elem.find('SPAN.white');
    var $next = $(this.$elem.find('SPAN')[nextIndex - 1]);

    $active.removeClass('white');
    $next.addClass('white');

    $active = this.$elem.find('IMG.active');
    $next = $(imgs[nextIndex - 1]);

    $next.addClass('active');
    $active.removeClass('active');

    this.selectedIndex = nextIndex;
}

Slider.prototype.startSlide = function () {
    if (this.startInterval) {
        clearInterval(this.startInterval);
        this.startInterval = null;
    }
    if (this.interval) {
        return;
    }
    this.interval = setInterval(this.slide.bind(this, 1), this.slideDelay);
}

Slider.prototype.stopSlide = function (e) {
    if (e.target.tagName === 'IMG') return;
    if (!this.interval) {
        return;
    }
    clearInterval(this.interval);
    this.interval = null;
    if (this.startInterval) {
        return;
    }
    this.startInterval = setInterval(this.startSlide.bind(this), this.startDelay);
}

Slider.prototype.selectSlide = function (e) {
    var index = parseInt(e.target.getAttribute('data-id'));
    if (this.selectedIndex === index) return;
    this.selectedIndex = index;
    this.slide(0);
}

var data, elems = document.getElementsByClassName("slider");
for (var i = 0, len = elems.length; i < len; i++) {
    data = $(elems[i]).data('config');
    new Slider(elems[i], data);
}

