// Any method with element will return a single object.
// Any method with elements will return an array.

console.log(document.getElementsByTagName('p'));

console.log(document.getElementById('hello'));

console.log(document.getElementsByClassName('pClass'));

console.log(
    document.querySelectorAll(
        ' p[data-content="123"], body > h1.pClass > span '
    )
);