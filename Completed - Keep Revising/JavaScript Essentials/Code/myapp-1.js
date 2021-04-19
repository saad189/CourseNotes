var car = {
    make: "volvo",
    speed: 160,
    engine: {
        size: 2.0,
        make: "bmw",
        fuel: "petrol",
        pistons: [
            { maker: "BMW" },
            { maker: "BMW2" }
        ]
    },
    drive: function () { return "drive"; }
};

var array = [
    "string",
    100,
    ["embed", 200],
    { car: "ford" },
    function () { return "drive"; }
];

function namefunc() {
    var fullname = "Saad Ahmed";
    function concat(name) {
        return "MR." + name;
    }
    return concat(fullname);
}
function namefuncFun(fullname) {
    return fullname.firstname + fullname.lastname;
}
console.log(namefuncFun({ firstname: "Saad", lastname: "Ahmed" }))
console.log(namefunc());
console.log(car.make);

function callableFunc(functionValue) {
    return functionValue();
}

var obj = function () { return "Embed"; };
console.log(callableFunc(obj));

//Note Here:

console.log(myName,printName());
var myName = "Saad";
function printName(){
    return "Ahmed";
}