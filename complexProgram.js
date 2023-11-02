/* 
   Filename: complexProgram.js
   Description: This program performs complex calculations using various mathematical operations
*/

// Function to calculate the factorial of a number
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

// Function to calculate the sum of all digits in a number
function sumOfDigits(num) {
  let sum = 0;
  while (num > 0) {
    let digit = num % 10;
    sum += digit;
    num = Math.floor(num / 10);
  }
  return sum;
}

// Function to determine if a number is prime
function isPrime(num) {
  if (num <= 1) {
    return false;
  } else if (num <= 3) {
    return true;
  } else if (num % 2 === 0 || num % 3 === 0) {
    return false;
  }

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
    i += 6;
  }

  return true;
}

// Function to calculate the nth Fibonacci number
function fibonacci(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1 || n === 2) {
    return 1;
  }

  let fibPrev = 1;
  let fibCurr = 1;

  for (let i = 3; i <= n; i++) {
    let temp = fibPrev + fibCurr;
    fibPrev = fibCurr;
    fibCurr = temp;
  }

  return fibCurr;
}

// Function to calculate the greatest common divisor of two numbers
function gcd(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

// Sample usage of the functions

console.log("Factorial of 5:", factorial(5)); // Output: 120

console.log("Sum of digits in 345:", sumOfDigits(345)); // Output: 12

console.log("Is 17 a prime number?", isPrime(17)); // Output: true

console.log("8th Fibonacci number:", fibonacci(8)); // Output: 21

console.log("GCD of 15 and 25:", gcd(15, 25)); // Output: 5

// More complex calculations and logic can be added to this code as required. This is just a starting point.