//BUTTON CLICKS USE:
// .btn:active {
// 	border: 3px solid var(--cDarkGrey);
// 	background-color: chartreuse;
// }back
//Input Field selection:
const displayUserInput = document.querySelector('#displayUserInput');
const receiveUserInput = document.querySelector('#receiveUserInput');
//Button selection:
const btnPlusMinus = document.querySelector('#btnPlusMinus');
const btnPercentage = document.querySelector('#btnPercentage');
const btnAC = document.querySelector('#btnAC');
const btnBackspace = document.querySelector('#btnBackSpace');

const btn7 = document.querySelector('#btn7');
const btn8 = document.querySelector('#btn8');
const btn9 = document.querySelector('#btn9');
const btnDivision = document.querySelector('#btnDivision');

const btn4 = document.querySelector('#btn4');
const btn5 = document.querySelector('#btn5');
const btn6 = document.querySelector('#btn6');
const btnMultiplication = document.querySelector('#btnMultiplication');

const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btnSubtraction= document.querySelector('#btnSubtraction');

const btnDot = document.querySelector('#btnDot');
const btn0= document.querySelector('#btn0');
const btnEqual = document.querySelector('#btnEqual');
const btnSum= document.querySelector('#btnSum');

//Logic


//Requirement: https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator
 const operations = {
  minus: "-",
  plus : "+",
  divide: "/",
  multiply: "*",
  percent:"%" 
 }
 const userInput = {
  input1: "",
  input2: "",
  operator: "",
  displayed: `${this.input1} ${this.operator} ${this.input2}`
 }
receiveUserInput.addEventListener('input', (e)=> {
 displayUserInput.textContent = e.target.value;
 console.log("yeyy")
}, false)
 

console.log(btn1.getAttribute("data-value"));



console.log(numBtns);

for (nums of numBtns){
 nums.addEventlistener('click', ()=>{
  calculator.numBuilding(numBtns.innerText);
  calculator.displayNumber();
 })
}



let calculator = {
 operand1: "",
 operant2: "",
 currentOperand: "", // on the display as user types
 numBuilding: function(num){
  this.currentOperand = this.currentOperand.toString() + num.toString();
 },
 displayNumber: function(){
  this.numBuilding = this.currentOperand;
 }
}