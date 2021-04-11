//console.log( this );

var object = {
    prop: this,
    embed:
    {
        method: function(){ return this; }
    }
};

var array = [
    this,
    function(){ return this; }
];

function global(){
    return this;
}

// Normal invokation
global();
object.embed.method();
array[1]();

// Assign context
global.call( object );
object.embed.method.call( object );
array[1].call( object );

// New context
new global();
new object.embed.method( object );
new array[1]();