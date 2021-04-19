// let elements = document.getElementsByName('cssProperty');
// let div = document.getElementById('modify');

// function set()
// {
//     for( let index = 0; index < elements.length; index++ )
//     {
//         let cssProperty = elements[ index ].getAttribute('id');
//         let cssValue = elements[ index ].value;        
//         div.style[ cssProperty ] = cssValue;
//     }
// }

// document.getElementById('set').addEventListener('click',set);





document.getElementById('set').addEventListener('click', function () {
    for (let index = 0, elements = document.getElementsByName('cssProperty'); index < elements.length; index++) {
        document.getElementById('modify').style[elements[index].getAttribute('id')] = elements[index].value;
    }
});