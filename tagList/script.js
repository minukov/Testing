/**
 * Created by anton on 14.09.16.
 */

function TagList(parentNode, tags) {
    this.parent = parentNode;
    this.init();
    if (!tags) {
        return;
    }
    this.addTags(tags);
}

TagList.prototype.init = function () {
    var elem, parent, div;
    div = document.createElement('div');
    div.setAttribute("class", "taglist");

    parent = document.createElement("p");
    elem = document.createElement("b");
    elem.innerHTML = 'Режим редактирования:';
    parent.appendChild(elem);
    elem = document.createElement("input");
    elem.setAttribute("class", "check");
    elem.setAttribute("type", "checkbox");
    elem.setAttribute("checked", true);
    elem.addEventListener("click", this.checkEdit.bind(this));
    parent.appendChild(elem);
    div.appendChild(parent);

    parent = document.createElement("p");
    elem = document.createElement("b");
    elem.innerHTML = 'Введите текст:';
    elem.setAttribute("class", "enter");
    parent.appendChild(elem);
    elem = document.createElement("input");
    elem.setAttribute("class", "text");
    elem.setAttribute("type", "text");
    elem.addEventListener("keydown", this.enterPress.bind(this));
    parent.appendChild(elem);
    div.appendChild(parent);

    parent = document.createElement("p");
    elem = document.createElement("input");
    elem.setAttribute("type", "button");
    elem.setAttribute("class", "add");
    elem.setAttribute("value", "Добавить");
    elem.addEventListener("click", this.addTag.bind(this));
    parent.appendChild(elem);
    elem = document.createElement("input");
    elem.setAttribute("type", "button");
    elem.setAttribute("class", "clear");
    elem.setAttribute("value", "Очистить");
    elem.addEventListener("click", this.clearTagList.bind(this));
    parent.appendChild(elem);
    elem = document.createElement("input");
    elem.setAttribute("type", "button");
    elem.setAttribute("class", "get");
    elem.setAttribute("value", "Список");
    elem.addEventListener("click", this.getTagList.bind(this));
    parent.appendChild(elem);
    div.appendChild(parent);

    this.parent.appendChild(div);
    this.parent.getElementsByClassName("text")[0].focus();

}

TagList.prototype.addTags = function (arr) {
    if (!arr || !(arr instanceof Array)) {
        return;
    }
    var div = this.parent.getElementsByClassName("list")[0];
    if (!div) {
        div = document.createElement("div");
        div.setAttribute("class", "list");
        div.addEventListener("click", this.removeTag.bind(this));
        this.parent.appendChild(div);
    }
    var i = 0, l = arr.length, s;
    for (; i < l; i++) {
        if (typeof arr[i] !== 'string' || arr[i].length === 0 || !this.checkTag(arr[i])) {
            continue;
        }
        s = document.createElement("span");
        s.innerHTML = arr[i];
        div.appendChild(s);
    }
}

TagList.prototype.addTag = function () {
    var input = this.parent.getElementsByClassName("text")[0];
    var text = input.value.split(',');
    this.addTags(text);
    input.value = '';
}

TagList.prototype.clearTagList = function () {
    var div = this.parent.getElementsByClassName("list")[0];
    if (!div) {
        return;
    }
    this.parent.removeChild(div);
}

TagList.prototype.enterPress = function (e) {
    if (e.keyCode !== 13) {
        return;
    }
    this.addTag();
}

TagList.prototype.getTagList = function () {
    var div = this.parent.getElementsByClassName("list")[0];
    if (!div) {
        return;
    }
    var elems = div.getElementsByTagName("*");
    return elems;
}

TagList.prototype.checkEdit = function () {
    var ckeck = this.parent.getElementsByClassName("check")[0];
    var style = "inline";
    if (!ckeck.checked) {
        style = 'none';
    }
    var inputs = this.parent.getElementsByTagName("input");
    var i = 0, l = inputs.length;
    for (; i < l; i++) {
        if (inputs[i].type === 'checkbox') {
            continue;
        }
        inputs [i].style.display = style;
    }
    var text = this.parent.getElementsByClassName("enter")[0];
    text.style.display = style;
}

TagList.prototype.checkTag = function (name) {
    var tags = this.getTagList(), j, ls = tags.length;
    for (j = 0; j < ls; j++) {
        if (tags[j].innerHTML !== name) {
            continue;
        }
        return false;
    }
    return true;
}

TagList.prototype.removeTag = function (e) {
    if (e.target.tagName !== 'SPAN') {
        return;
    }
    e.target.parentNode.removeChild(e.target);
}

console.clear();
new TagList(document.body, ['TEST']);