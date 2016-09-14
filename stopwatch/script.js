/**
 * Created by anton on 13.09.16.
 */
function SW(elem, options) {
    this.elem = elem;
    this.options = options || {};
    this.options.delay = this.options.delay || 1;
    this.init();
}

SW.prototype.init = function () {
    this.timer = this.createTimer();
    this.startButton = this.createButton("start/stop", this.startStop);
    var resetButton = this.createButton("reset", this.reset);
    var lapButton = this.createButton("lap", this.lap);
    this.id = this.elem.id;
    this.clock = 0;
    this.interval = undefined;
    this.elem.appendChild(this.timer);
    this.elem.appendChild(this.startButton);
    this.elem.appendChild(lapButton);
    this.elem.appendChild(resetButton);
    this.reset(this);
}

SW.prototype.createTimer = function () {
    return document.createElement("h1");
}

SW.prototype.createButton = function (action, handler) {
    var input = document.createElement('input');
    input.setAttribute('type', 'button');
    input.setAttribute('value', action);
    input.setAttribute('action', action);
    input.addEventListener("click", handler.bind(this));
    return input;
}

SW.prototype.formaTime = function () {
    if (this.clock === 0) {
        return '00:00:00:00';
    }
    var h = m = s = ms = 0;
    var newTime = '', time = this.clock;
    h = Math.floor(time / (60 * 60 * 1000));
    time = time % (60 * 60 * 1000);
    m = Math.floor(time / (60 * 1000));
    time = time % (60 * 1000);
    s = Math.floor(time / 1000);
    ms = time % 1000;
    newTime = h + ':' + m + ':' + s + ':' + (ms / 10).toFixed();
    return newTime;
}

SW.prototype.update = function () {
    this.clock += this.options.delay;
    this.render();
}

SW.prototype.render = function () {
    this.timer.innerHTML = this.formaTime();
}

SW.prototype.startStop = function () {
    var action = this.startButton.getAttribute('action');
    if (action === 'stop') {
        this.startButton.setAttribute('action', 'start');
        this.stop();
        return;
    }
    this.startButton.setAttribute('action', 'stop');
    this.start();
}

SW.prototype.start = function () {
    if (this.interval) {
        return;
    }
    this.interval = setInterval(this.update.bind(this), this.options.delay);
}

SW.prototype.stop = function () {
    if (!this.interval) {
        return;
    }
    clearInterval(this.interval);
    this.interval = null;
}

SW.prototype.reset = function () {
    this.stop();
    this.startButton.setAttribute('action', 'start');
    var grid = document.getElementById('grid');
    var tbody = grid.getElementsByTagName('tbody')[0];
    var ntbody = document.createElement('tbody');
    grid.replaceChild(ntbody, tbody);
    this.clock = 0;
    this.render();
}

SW.prototype.lap = function () {
    if (this.clock === 0)  return;
    var grid = document.getElementById('grid');
    var tbody = grid.getElementsByTagName('tbody')[0];
    var row, cell, input;

    row = document.createElement('tr');
    cell = document.createElement('td');
    input = document.createTextNode(this.id);
    cell.appendChild(input);
    row.appendChild(cell);

    cell = document.createElement('td');
    input = document.createTextNode(this.formaTime());
    cell.appendChild(input);
    row.appendChild(cell);

    cell = document.createElement('td');
    input = document.createElement('input');
    input.setAttribute('type', 'button');
    input.setAttribute('value', 'X');
    cell.appendChild(input);
    row.appendChild(cell);

    tbody.appendChild(row);
}


console.clear();

document.addEventListener("keydown", keyPress, false);

function keyPress(e) {
    var elem = div || document.getElementsByClassName("stopwatch")[0];
    if (!elem) {
        return;
    }
    var keyCode = e.keyCode,
        stop = stops[elem.id - 1];
    switch (keyCode) {
        case 83 :
            stop.startStop();
            break;
        case 82 :
            stop.reset();
            break;
        case 76 :
            stop.lap();
            break;
    }
}

var div, stops = [];

var grid = document.getElementById('grid');
grid.onclick = function (e) {
    if (e.target.tagName !== 'INPUT') return;
    var indx = e.target.parentNode.parentNode.rowIndex;
    grid.deleteRow(indx);
};

var elems = document.getElementsByClassName("stopwatch");
for (var i = 0, len = elems.length; i < len; i++) {
    elems[i].onmouseover = function (e) {
        if (e.target.tagName !== 'DIV') return;
        div = e.target;
    };
    stops[i] = new SW(elems[i], {delay: 0});
}
