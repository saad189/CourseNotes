var element = document.createElement('div');

element.style.cssText = "width:200px; height:20px; background:blue;";

element.onclick = function () { alert('hello'); };

document.body.appendChild( element );

var target = document.getElementById('yellow');

function Help() {
    let element = document.createElement('div');

    element.style.cssText = "width:200px; height:40px; background:pink;";

    element.onclick = function () { alert('hello'); };
    return element;
}
document.body.appendChild(Help());