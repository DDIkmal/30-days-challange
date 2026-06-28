//Simple Calculator

//Selector element
const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');

//For Save input value
let currentInput = '';


//Make interactive buttons
buttons.addEventListener('click', (e) => {
    //prevent input offside click from button
    if(e.target.tagName !== 'BUTTON') return;

    //get value from button
    const value = e.target.dataset.value;

    //Logic for operation input
    if (value === '='){
     //use try and catch to prevent error input
        try{
            //use eval(only for local practice) for change string to number and make string to operator
            currentInput = eval(currentInput);
            //for update input to display
            display.value = currentInput;
        }catch(error){
            //show error on display, and reset the value to continue valid input after, without error value.
            display.value = 'Error';
            currentInput = '';
        }
        
    }else if(value === 'C'){
        currentInput = '';
        display.value = currentInput;
    }else{
        //For save value and update input display value before you execute/do operation
        currentInput += value
        display.value = currentInput;
    }

});


