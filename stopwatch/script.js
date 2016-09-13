/**
 * Created by anton on 13.09.16.
 */


var Stopwatch = function (elem, options) {

    var timer = createTimer(),
        startButton = createButton("start/stop", startStop),
        resetButton = createButton("reset", reset),
        lapButton = createButton("lap", lap),
        id = elem.id,
        //offset,
        clock,
        interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1;
    startButton.setAttribute('id', 'ss');
    // append elements
    elem.appendChild(timer);
    elem.appendChild(startButton);
    elem.appendChild(lapButton);
    elem.appendChild(resetButton);

    // initialize
    reset();

    // private functions
    function createTimer() {
        return document.createElement("h1");
    }

    function createButton(action, handler) {
        var input = document.createElement('input');
        input.setAttribute('type', 'button');
        input.setAttribute('value', action);
        input.setAttribute('action', action);
        input.addEventListener("click", function (event) {
            handler();
            event.preventDefault();
        });
        return input;
    }

    function startStop() {
        var action = startButton.getAttribute('action');
        if (action === 'stop') {
            startButton.setAttribute('action', 'start');
            stop();
            return;
        }
        startButton.setAttribute('action', 'stop');
        start();
    }

    function start() {
        if (interval) {
            return;
        }
        interval = setInterval(update, options.delay);
    }

    function stop() {
        if (!interval) {
            return;
        }
        clearInterval(interval);
        interval = null;
    }

    function reset() {
        stop();
        startButton.setAttribute('action', 'start');
        var grid = document.getElementById('grid');
        var tbody = grid.getElementsByTagName('tbody')[0];
        var ntbody = document.createElement('tbody');
        grid.replaceChild(ntbody, tbody);
        clock = 0;
        render();
    }

    function update() {
        clock += options.delay; //delta();
        render();
    }

    function render() {
        timer.innerHTML = formaTime(clock);
    }

    function formaTime(clock) {
        if (clock === 0) {
            return '00:00:00:00';
        }
        var h = m = s = ms = 0;
        var newTime = '', time = clock;
        h = Math.floor(time / (60 * 60 * 1000));
        time = time % (60 * 60 * 1000);
        m = Math.floor(time / (60 * 1000));
        time = time % (60 * 1000);
        s = Math.floor(time / 1000);
        ms = time % 1000;
        newTime = h + ':' + m + ':' + s + ':' + (ms / 10).toFixed();
        return newTime;
    }

    function lap() {
        if (clock === 0)  return;
        var grid = document.getElementById('grid');
        var tbody = grid.getElementsByTagName('tbody')[0];
        var row, cell, input;

        row = document.createElement('tr');
        cell = document.createElement('td');
        input = document.createTextNode(id);
        cell.appendChild(input);
        row.appendChild(cell);

        cell = document.createElement('td');
        input = document.createTextNode(formaTime(clock));
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


    // public API
    this.start = start;
    this.stop = stop;
    this.reset = reset;
    this.lap = lap;
    this.startStop = startStop;
};

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

window.onload = function () {
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
            // console.log(e);
        };
        stops[i] = new Stopwatch(elems[i], {delay: 0});
    }
}
