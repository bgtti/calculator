"use strict";
//GLOBAL VARIABLES:
const displayUserInput = document.querySelector('#displayUserInput'); //displays operation 
const receiveUserInput = document.querySelector('#receiveUserInput'); //displays current operand

const numBtns = document.querySelectorAll('[data-value]'); //Select all numbers by their data-value
const opBtns = document.querySelectorAll('[data-op]'); //Select all operators by their data-op

const btnEqual = document.querySelector('#btnEqual'); //equal button

const btnAC = document.querySelector('#btnAC'); //Clear button
const btnBackspace = document.querySelector('#btnBackSpace'); // backspace btn

const btnPercentage = document.querySelector('#btnPercentage'); //percentage btn
const btnPlusMinus = document.querySelector('#btnPlusMinus'); // +/- btn



//THE CALCULATOR OBJECT
let calculator = {
    operand1: undefined, //saves 1st num
    operand2: undefined,//saves 2nd num
    operator: undefined, //saves operator
    operator2: undefined, //second operator if user clicks another operator instead of the equal sign
    result: 0, //saves result
    equalSign: false, //checks if equal sign was pressed to display result
    divBy0: false, //checks if user trying to divide by 0
    currentOperand: "", // on the big display: user number selection OR result (if equal sign clicked)
    showPastOperation: "", //on the small display above: may display only operand 1 OR operand1 + operator + operand 2 =
    displayCurrentOperant: function () {
        receiveUserInput.value = this.currentOperand;
    },
    displayPastOperation: function () {
        displayUserInput.innerText = this.showPastOperation;
    },

    calculation: function () {
        let operand1Float = parseFloat(this.operand1);
        let operand2Float = parseFloat(this.operand2);
        let numToRound;
        const roundingNum = function(n){ //function that rounds to 5 decimals
            return Math.round((n + Number.EPSILON) * 100000)/100000; // more about why I am rounding this way: https://www.codingem.com/javascript-how-to-limit-decimal-places/
        }
        if (this.operator === "/") {
            numToRound= (operand1Float / operand2Float);
            this.result = roundingNum(numToRound).toString();
        } else if (this.operator === "*") {
            numToRound= (operand1Float * operand2Float);
            this.result = roundingNum(numToRound).toString();
        } else if (this.operator === "+") {
            numToRound = (operand1Float + operand2Float);
            this.result = roundingNum(numToRound).toString();
        } else if (this.operator === "-") {
            numToRound = (operand1Float - operand2Float);
            this.result = roundingNum(numToRound).toString();
        }
        // this.result = eval(this.operand1 + this.operator + this.operand2); ==> eval() considered unsafe, therefore not used.
        console.log("Result of calculation: " + calculator.result); // <= REMOVE ************************************************************************************************
    },
    resetCalculator: function () { //this will be what happens when user clicks AC btn
        this.operand1 = undefined;
        this.operand2 = undefined;
        this.operator = undefined;
        this.operator2 = undefined;
        this.result = 0;
        this.currentOperand = "";
        this.showPastOperation = "";
        this.equalSign = false;
        this.divBy0 = false;
        this.displayCurrentOperant();
        this.displayPastOperation();
    },
    resetCalcMinusOp1: function () { //this resets all but operand1 and operator2, and it does not display the resets
        this.operand2 = undefined;
        this.operator = undefined;
        this.result = 0;
        this.currentOperand = "";
        this.showPastOperation = "";
        this.equalSign = false;
        this.divBy0 = false;
    },
    backspacing: function () { //this will be what happens when user clicks backspace btn
        let slicedNum = this.currentOperand.slice(0, -1);
        this.currentOperand = slicedNum;
        this.displayCurrentOperant();
    },
    whenOperatorSelected: function (sign) {
        console.log("ive reached whenOpSelected ***********************"); // <= REMOVE ************************************************************************************************
        if (this.operand1 === undefined) {
            console.log("ive reached whenOpSelected and op1 is not defined"); // <= REMOVE ************************************************************************************************
            this.operand1 = this.currentOperand;
            this.currentOperand = "";
            this.operator = sign;
            this.showPastOperation = `${this.operand1} ${this.operator}`
            this.displayPastOperation();
            this.displayCurrentOperant();
        } else if ((this.operand1 !== undefined) && (this.operand2 === undefined) && (this.operator !== undefined)) {
            console.log("ive reached whenOpSelected and op2 is not defined"); // <= REMOVE ************************************************************************************************
            console.log("ive reached whenOpSelected and op2 is not defined: operator is" + this.operator); // <= REMOVE ************************************************************************************************
            this.operand2 = this.currentOperand;
            this.operator2 = sign;
            this.checkIfDividingBy0(); //if not dividing by 0, all be sent to be calculated, and return to the following operations
            console.log("i came back from div 0"); // <= REMOVE ************************************************************************************************
            if (this.divBy0 === false) {
                this.ifDivBy0False();
            } else if (this.divBy0 === true) {
                this.ifDivBy0True();
            }
        } else if ((this.operand1 !== undefined) && (this.operand2 === undefined) && (this.operator === undefined)) {
            this.operator = sign;
            this.operand2 = undefined;
            this.showPastOperation = `${this.operand1} ${this.operator}`
            this.currentOperand = "";
            this.displayPastOperation();
            this.displayCurrentOperant();
        }
    },
    whenEqualSelected: function () {
        if ((this.operand1 === undefined) || ((this.operand1 !== undefined) && (this.operator === undefined))) {
            this.operand1 = this.currentOperand;
            this.showPastOperation = `${this.operand1} = ${this.operand1}`
            this.displayPastOperation();
            this.displayCurrentOperant();
        } else if ((this.operand1 !== undefined) && (this.operator !== undefined)) {
            this.operand2 = this.currentOperand;
            this.checkIfDividingBy0();
            if (this.divBy0 === false) {
                this.ifDivBy0False();
            } else if (this.divBy0 === true)
                this.ifDivBy0True();
        }
    },
    checkIfDividingBy0: function () {
        console.log("ive reached div by 0 ***********************"); // <= REMOVE ************************************************************************************************
        if (this.operator === "/") {
            let check0 = parseFloat(this.operand2);
            if (check0 === 0) {
                console.log("its dividing by 0"); // <= REMOVE ************************************************************************************************
                this.divBy0 = true;
            }
        } else {
            this.divBy0 = false;
        }
    },
    ifDivBy0True: function () {
        this.showPastOperation = `${this.operand1} ${this.operator} ${this.operand2} = infinity`
        this.currentOperand = "don't be silly!"
        this.displayPastOperation();
        this.displayCurrentOperant();
        this.resetCalcMinusOp1();
        this.operand1 = undefined;
    },
    ifDivBy0False: function () {
        this.calculation();
        if(this.operator2 === undefined){
            this.showPastOperation = `${this.operand1} ${this.operator} ${this.operand2} = ${this.result}`;
        } else if(this.operator2 !== undefined){
            this.showPastOperation = `${this.operand1} ${this.operator} ${this.operand2} = ${this.result} ${this.operator2} `;
        }
        this.displayPastOperation();
        this.operand1 = this.result;
        this.currentOperand = this.operand1;
        this.displayCurrentOperant();
        this.resetCalcMinusOp1();
        this.operator = this.operator2;
        this.operator2 = undefined;
    },
    ifPercentClicked: function(){
        let percentNum = parseFloat(this.currentOperand) / 100;
        this.currentOperand = percentNum.toString();
        this.displayCurrentOperant();
    },
    ifChangeSignClicked: function (){
        if(this.currentOperand.indexOf("-") === -1){
            this.currentOperand = "-" + this.currentOperand;
            this.displayCurrentOperant();
        } else if (this.currentOperand.indexOf("-") !== -1){
            this.currentOperand = this.currentOperand.substr(1);
            this.displayCurrentOperant();
        }
    }
}

//EVENT LISTENERS

// Event listener to AC button (clear all)
btnAC.addEventListener('click', () => {
    calculator.resetCalculator();
}, false)

// Event listener to backspace btn
btnBackspace.addEventListener('click', () => {
    calculator.backspacing();
}, false)

// Event Listening to number clicked (and prevents user from typing 2x . )
document.addEventListener('click', e => {
    if (e.target.matches('[data-value]')) {
        let thisNum = e.target.getAttribute('data-value').toString();
        if (thisNum !== ".") {
            calculator.currentOperand = calculator.currentOperand + thisNum;
            calculator.displayCurrentOperant();
        } else if ((thisNum === ".") && (!calculator.currentOperand.includes("."))) {
            calculator.currentOperand = calculator.currentOperand + thisNum;
            calculator.displayCurrentOperant();
        }
    }
    
}, false)

// Event listening to operator clicked
document.addEventListener('click', e => {
    if (e.target.matches('[data-op]')) {
        let thisOp = e.target.getAttribute('data-op');
        calculator.whenOperatorSelected(thisOp);
    }
}, false)


// Event listening to equal sign
btnEqual.addEventListener('click', () => {

    console.log("OP1 at sending " + calculator.operand1);
    console.log("OP2 at sending " + typeof (calculator.operand2));
    console.log("OP2 at sending: " + (this.operand2 === undefined));
    console.log("OP2 at sending: " + (this.operand2 === ""));
    console.log("curOP at sending " + calculator.currentOperand);
    console.log("pastOP at sending " + calculator.showPastOperation);
    console.log("Operator at sending " + calculator.operator);
    calculator.whenEqualSelected();
}, false);

//event listening to % symbol
btnPercentage.addEventListener('click', ()=> {
    calculator.ifPercentClicked();
}, false)

//event listening to sign change (+/- button)
btnPlusMinus.addEventListener('click', ()=>{
    calculator.ifChangeSignClicked();
}, false)