//Input Field selection:
const displayUserInput = document.querySelector('#displayUserInput'); //displays operation 
const receiveUserInput = document.querySelector('#receiveUserInput'); //displays current operand

const numBtns = document.querySelectorAll('[data-value]'); //Select all numbers by their data-value
const opBtns = document.querySelectorAll('[data-op]'); //Select all operators by their data-op

const btnAC = document.querySelector('#btnAC'); //Clear button
const btnBackspace = document.querySelector('#btnBackSpace'); // backspace btn

console.log(opBtns);
console.log(typeof opBtns[2].getAttribute('data-op'));
console.log(opBtns[1].getAttribute('data-op'));
console.log(numBtns);



//THE CALCULATOR object
let calculator = {
 operand1: "", //saves 1st num
 operant2: "",//saves 2nd num
 operator: "", //saves operator
 equalSign: false, //checks if equal sign clicked
 result: 0, //saves result
 currentOperand: "", // on the big display as user types
 lastOperand: "", //on the small display above 
 displayCurrentOperant: function(){
  receiveUserInput.value = this.currentOperand;
 },
 displayLastOperand: function(){
     displayUserInput.innerText = this.lastOperand;
 },
 calculation: function(){
     this.result = eval(this.operand1 + this.operator + this.operant2); //eval takes a string and transforms it into a math operation
    },
 resetCalculator: function(){ //this will be what happens when user clicks AC btn
     this.operand1 = "";
     this.operand2 = "";
     this.operator = "";
     this.result = 0;
     this.currentOperand = "";
     this.lastOperand = "";
     this.displayCurrentOperant();
     this.displayLastOperand();
 },
 backspacing: function(){
     let slicedNum = this.currentOperand.slice(0,-1);
     this.currentOperand = slicedNum;
     this.displayCurrentOperant();
 },
 whenOperatorSelected: function(sign){
     if (this.operand1 === ""){
         this.operand1 = this.currentOperand;
         this.currentOperand = "";
         this.lastOperand = `${this.operand1} ${sign}`
         this.displayLastOperand();
         this.displayCurrentOperant();
     }
 }   
}

//EVENT LISTENERS

// Event listener to AC button (clear all)
btnAC.addEventListener('click', ()=>{
    calculator.resetCalculator();
}, false)

// Event listener to backspace btn
btnBackspace.addEventListener('click', ()=>{
    calculator.backspacing();
},false)

// Event Listening to number clicked
document.addEventListener('click', e =>{
    if (e.target.matches('[data-value]')){
        let thisNum = e.target.getAttribute('data-value').toString();
        calculator.currentOperand = calculator.currentOperand + thisNum;
        calculator.displayCurrentOperant();
    }
}, false)



// Event listening to operator clicked
document.addEventListener('click', e =>{
    if (e.target.matches('[data-op]')){
        let thisOp = e.target.getAttribute('data-op');
        calculator.whenOperatorSelected(thisOp);
    }
}, false)



