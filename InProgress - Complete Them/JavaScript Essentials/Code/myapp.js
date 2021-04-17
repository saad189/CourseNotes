var pHello = document.getElementById('hello');

pHello.innerText = "new world";

pHello.innerHTML += " order <span>hello world</span>";

pHello.outerHTML = '<h2 id="hello">new world order <span>hello world</span></h2>';

var spanH1 = document.querySelectorAll('h1 span');

spanH1[0].innerHTML = "new text here!!";