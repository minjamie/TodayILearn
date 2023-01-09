let one;
one = 1;


function addOne(num) {
    console.log(one + num)
}

addOne(5)

function makeAdder(x) {
    return function (y) {
        return x+y
    }
}
const add3 = makeAdder(3)
console.log(add3(2))