# calculator

Live preview: https://bgtti.github.io/calculator/

Part of the Odin Project "Calculator"

This calculator can do simple mathematical operations: addition, subtraction, multiplication, division.
It evaluates two numbers at a time and rounds the result to 5 decimal points.

![Calculator example](calculator_preview.png)

This simple calculator is built using HTML, CSS, and vanilla JavaScript.
All calculator functions are inside of a calculator object, and event listeners are used to access the calculator methods.

How this project could be improved:

- Rounding issues: 8 / 3, then the result \* 3 will yield 8.00001. This happens because of calculations on rounded numbers.
- Mobile friendliness: currently not optimal for very narrow screens such as Galaxy fold
- A Favicon could be added
- Cursor could be changed when hovering buttons

Link to the Odin Project guidelines: https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator
