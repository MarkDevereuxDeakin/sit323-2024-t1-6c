const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded());

//Serves the index.html file as a simple webpage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//addition operation
const addition = (num1, num2) => num1 + num2;

//subtraction operation
const subtraction = (num1, num2) => num1 - num2;

//division operation
const division = (num1, num2) => num1 / num2;

//multiplication operation
const multiplication = (num1, num2) => num1 * num2;

//exponential operation
const exponentiation = (num1, num2) => num1 ** num2;

//modulus operation
const modulus = (num1, num2) => num1 % num2;

//squareroot operation
const squareroot = (num1) => Math.sqrt(num1);

//cubed root operation
const cubedroot = (num1) => Math.cbrt(num1);

//logarithm base 2 operation
const log2 = (num1) => Math.log2(num1);

//logarithm base 10 operation
const log10 = (num1) => Math.log10(num1);

//natural logarithm operation
const ln = (num1) => Math.log(num1);

//Handles the operation and returns the result
function handleOperation (res, req, operation, requiresTwoNumbers) {
    
    try{
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        
        if (isNaN(num1)){
            res.status(400).send('Error: input one is not a number!');
            throw new Error('Input one is not a number!');
        }
        if (requiresTwoNumbers && isNaN(num2)){
            res.status(400).send('Error: input two is not a number!');
            throw new Error('Input two is not a number!');
        }       

        switch (operation) {
            case 'add':
                return res.status(200).send(num1  + " + "  +  num2 + " = " + addition(num1, num2));
            case 'subtract':
                return res.status(200).send(num1  + " - "  +  num2 + " = " + subtraction(num1, num2));
            case 'divide':
                return res.status(200).send(num1  + " / "  +  num2 + " = " + division(num1, num2));
            case 'multiply':
                return res.status(200).send(num1  + " * "  +  num2 + " = " + multiplication(num1, num2));
            case 'exponent':
                return res.status(200).send(num1  + " ^ "  +  num2 + " = " + exponentiation(num1, num2));
            case 'mod':
                return res.status(200).sendnum1  + " % "  +  num2 + " = " + (modulus(num1, num2));
            case 'squareroot':
                return res.status(200).send('Squareroot of ' + num1 + " = " + squareroot(num1));
            case 'cubedroot':
                    return res.status(200).send('Cubedroot of ' + num1 + " = " + cubedroot(num1));
            case 'log2':
                return res.status(200).send('Log base 2 of ' + num1 + " = " + log2(num1));
            case 'log10':
                return res.status(200).send('Log base 10 of ' + num1 + " = " + log10(num1));
            case 'ln':
                return res.status(200).send('Natural Logarithm of ' + num1 + " = " + ln(num1));
            default:
                return 'Invalid operation';
        }

    }
    catch(error){
        res.status(500).send(`Unknwon server error. Error: ${error}`);
    }    
}

//API endpoint for addition with two numbers
app.get('/add', (req, res) => handleOperation (res, req, 'add', true));       

//API endpoint for subtraction with two numbers
app.get('/subtract', (req, res) => handleOperation (res, req, 'subtract', true)); 

//API endpoint for division with two numbers
app.get('/divide', (req, res) => handleOperation (res, req, 'divide', true));

//API endpoint for multiplication with two numbers
app.get('/multiply', (req, res) => handleOperation (res, req, 'multiply', true));

//API endpoint for multiplication with two numbers
app.get('/exponent', (req, res) => handleOperation (res, req, 'exponent', true));

//API endpoint for modulo with two numbers
app.get('/mod', (req, res) => handleOperation (res, req, 'mod', true));

//API endpoint for squareroot of a number
app.get('/squareroot', (req, res) => handleOperation (res, req, 'squareroot', false));

//API endpoint for cubedroot of a number
app.get('/cubedroot', (req, res) => handleOperation (res, req, 'cubedroot', false));

//API endpoint for log base 2 of a number
app.get('/log2', (req, res) => handleOperation (res, req, 'log2', false));

//API endpoint for log base 10 of a number
app.get('/log10', (req, res) => handleOperation (res, req, 'log10', false));

//API endpoint for natural logarithm of a number
app.get('/ln', (req, res) => handleOperation (res, req, 'ln', false));


//Starts the Express Server listening on port 8080
app.listen(port, () => {
    console.log(`Calculator Microservice Listening On Port http://localhost:${port}`);    
});