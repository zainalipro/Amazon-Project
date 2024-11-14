// automate testing
// automated test is the way of test in which we use the code to test the code.

import { formatCurrency } from "../scripts/utils/money.js";

console.log(`
    Test Suite: format Currency\n
    ---------------------------`);

console.log('Test 1: formatCurrency(2000)')
// test case 1
if (formatCurrency(2295) === "$22.95") {
    console.log('pass');
}
else {
    console.log('failed ')
}

// test case 2
console.log('round to zero')
if (formatCurrency(0) === "$0.00") {
    console.log('pass');
}
else {
    console.log('failed ')
}

console.log('round to nearest number');
// test case 3
if (formatCurrency(2000.5) === "$20.01") {
    console.log('pass');
}
else {
    console.log('failed ')
}

// test case 4
if (formatCurrency(2000.4) === "$20.00") {
    console.log('pass');
}
else {
    console.log('failed ')
}


