/**
 * Created by anton on 19.09.16.
 */


function Slider(elem, delay) {
    this.interval = undefined;
    this.startInterval = undefined;
    this.delay = undefined;
    this.init(elem, delay);
}

Slider.prototype.init = function (elem, delay) {
    this.$elem = $(elem);
    this.delay = delay || 2000;
    this.selectedIndex = 1;
    // this.interval = setInterval(this.slide.bind(this, 1), this.delay);
    this.$elem.find('.gallery').on("click", this.stopSlide.bind(this));
    this.$elem.find('span').on("click", this.selectSlide.bind(this));
    this.$elem.find('.right').on("click", this.slide.bind(this, 1));
    this.$elem.find('.left').on("click", this.slide.bind(this, -1));
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
    this.interval = setInterval(this.slide.bind(this, 1), this.delay);
}

Slider.prototype.stopSlide = function (e) {
    if (e.target.tagName === 'IMG') return;
    if (!this.interval) {
        //this.interval = setInterval(this.slide.bind(this, 1), this.delay);
        return;
    }
    clearInterval(this.interval);
    this.interval = null;
    if (this.startInterval) {
        return;
    }
    this.startInterval = setInterval(this.startSlide.bind(this), 5000);
}

Slider.prototype.selectSlide = function (e) {
    var index = parseInt(e.target.getAttribute('data-id'));
    if (this.selectedIndex === index) return;
    this.selectedIndex = index;
    this.slide(0);
}

var elems = document.getElementsByClassName("slider");
for (var i = 0, len = elems.length; i < len; i++) {
    // var config = {
    //     delay: 2000,
    //     imgs: ['win.jpg']
    // };
    new Slider(elems[i], 2000);
}

