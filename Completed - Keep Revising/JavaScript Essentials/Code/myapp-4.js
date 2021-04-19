// var pHello = document.getElementById('hello');
// pHello.innerText = "new world";
// pHello.innerHTML += " order <span>hello world</span>";
// pHello.outerHTML = '<h2 id="hello">new world order <span>hello world</span></h2>';
// var spanH1 = document.querySelectorAll('h1 span');
// spanH1[0].innerHTML = "new text here!!";

// var el = document.getElementById('style');

// el.style.color = "white";
// el.style.width = "200px";

// This can also be done:

// el.style.cssText = "background : blue; color : white; width:200px; height:100px";

// console.log(getComputedStyle(el));

var select = document.getElementsByName('cars')[0];
select.onclick = function (event) {
    console.log('Kill ThiS THING LIVE!', event);
}

select.addEventListener('click', function (event) {
    console.log('Inside Event Listener')
});
select.addEventListener('click', function (event) {
    console.log('Inside Event Listener THE OTHER')
});

function ClickCallbackFunction(event) {
    console.log('HELLOO!!');
};
select.addEventListener('click', ClickCallbackFunction);
select.removeEventListener('click', ClickCallbackFunction);