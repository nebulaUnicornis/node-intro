var inquirer = require('inquirer');


var questions = [
    {
        name: 'theNumber',
        message: 'Enter a number between 1 and 100: '
    } 
];

// Generate a random number between 1 and 100:
var hiddenNumber = Math.floor((Math.random() * 100) + 1);
var guesses = 5;


function askUser(guesses) {
    
    if (guesses >= 1) {
            inquirer.prompt(questions).then(function (answer) {
            // Parse user entry to int
            var numberUser = parseInt(answer.theNumber)
            
            console.log('Hidden number: ', hiddenNumber);
            console.log('User number: ', numberUser);
            
            if(numberUser < hiddenNumber){
                console.log('Your number is lower than the hidden number');
                askUser(guesses - 1);
            } else if(numberUser > hiddenNumber){
                console.log('Your number is higher than the hidden number');
                askUser(guesses - 1);
            } else {
                console.log('You won!');
            }
            });
    } else {
        console.log('You lost')
    }
    
    // inquirer.prompt(questions).then(function (answer) {
    //     // Parse user entry to int
    //     var numberUser = parseInt(answer.theNumber)
        
    //     console.log('Hidden number: ', hiddenNumber);
    //     console.log('User number: ', numberUser);
        
    //     if(numberUser < hiddenNumber){
    //         console.log('Your number is lower than the hidden number');
    //         askUser();
    //     } else if(numberUser > hiddenNumber){
    //         console.log('Your number is higher than the hidden number');
    //         askUser();
    //     } else {
    //         console.log('You won!');
    //     }
    // });
}

askUser(guesses);




