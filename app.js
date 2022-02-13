const prompt = require('prompt-sync')();
//Global Variables
var name = "";
const pInv = [];
const bedroomItems = [];
var endGame = "";

function chooseAdventure() {
    resetAdventure();
    prologue();
    leaveHouse();
}

//Reset all of the objects of this adventure
function resetAdventure() {
    console.clear();
    username = "";
    while(pInv.length > 0) pInv.pop();
    //Means that player took the items. FUTURE maybe initialize some items with Math.random()
    if(bedroomItems.length == 0) bedroomItems.push('Phone','Keys','Wallet');
    endGame = "";

}
/**
 * @name showInv
 * @description Shows inventory to user
 * 
 * @param none
 * 
 * @returns null
 */
function checkInv() {
    if(pInv.length == 0) console.log(`You have NOTHING in your inventory`);
    else console.log(`You have these items in your inventory: ${pInv.toString()}`);
}

function hasItem(item) {
        //Checks index (Could use for loop)
        let index = 0;
        for (const invItem of pInv) {
            //Check inventory for item and automatically uses
            if(invItem.toUpperCase() == item.toUpperCase()) {
                //Item found.
                return true;
            }
            //Adds to index
            index++;
        }
        //Item not found.
        return false;
}

/**
 * @name checkChoice
 * @description Checks statement to single word
 * 
 * @deprecated since checkValidChoice is better used for multiple choices
 * 
 * @param {string} statement 
 * @param {string} keyword 
 * 
 * @returns {boolean} validChoice
 */
function checkPrompt(statement,keyword) {
    return (statement.toUpperCase() == keyword.toUpperCase() || statement.toUpperCase().charAt(0) == keyword.toUpperCase().charAt(0));
}
/**
 * @name indexValidChoice
 * @description Finds the index of choice in prompt array
 * For the future, single letter notation (what if choice of garage and garden)
 * @param {string} statement 
 * @param {array} arrayPrompts 
 * 
 * @returns {int} index
 */

function indexValidChoice(statement,arrayPrompts) {
    //Returns -1 for "" or null
    if(statement == "" || statement == null) return -1;
    return (arrayPrompts.indexOf(statement.toLowerCase()));
}
/**
 * @name checkValidChoice
 * @description Checks the choice of user
 * For the future, single letter notation (what if choice of garage and garden)
 * @param {string} statement 
 * @param {array} arrayPrompts 
 * 
 * @returns {string} choice
 */
function checkValidChoice(statement,arrayPrompts) {
    //Returns -1 for "" or null
    if(statement == "" || statement == null) return 'invalid';
    else if(arrayPrompts.includes(statement.toLowerCase())) return statement.toLowerCase();
    //Global prompt answers: status (checks health) and inv (checks inventory)
    else {
        switch(statement.toLowerCase()) {
            case 'inv': 
                checkInv();
                break;
            case 'status':
                console.log(`ADD STATUS FUNCTION!`);
                break;
            default:
                break;
        }
    }
    return 'invalid';
}

function zombieEncounter() {
    let zombieChoice = "";
    let zombieChoicePrompts = ['fight','run']
    while(checkValidChoice(zombieChoice,zombieChoicePrompts) == 'invalid') zombieChoice = prompt(`Do you [fight] the zombie or try to [run] away? `);
    zombieChoice = zombieChoice.toLowerCase();
    if(zombieChoice == zombieChoicePrompts[0]) console.log("ADD A ZOMBIE FIGHT MECHANIC");
    else if(zombieChoice == zombieChoicePrompts[1]) console.log("ADD AN ESCAPE MECHANIC");
}

function prologue() {
    name = prompt('What is your name? ');
    //console.log(`DISCLAIMER: PLEASE READ THE README.MD BEFORE PLAYING THIS GAME`);
    console.log(`YOU CAN ALWAYS CHECK INVENTORY WITH CHOICE 'inv'`);
    console.log(`${name}, it's been 5 days since the start of a viral infection. You live in City D, an hour away from City P that was the epicenter`);
    console.log(`The last of your supplies have finally run out in your house. You slowly peek outside the window blinds and see no infected nearby.`)
}

/**
 * @name leaveHouse
 * @description Function for prompts involving the house
 * 
 * @param none
 * 
 * @returns
 */
function leaveHouse() {
    //Prompts for house interactions.
    let leaveHouse = "";
    let leaveHousePrompts = ['garage','bedroom','outside'];
    while(checkValidChoice(leaveHouse,leaveHousePrompts) == 'invalid') leaveHouse = prompt(`Would you like to check the [garage], go to your [bedroom], or walk [outside]? `);
    leaveHouse = leaveHouse.toLowerCase();

    //Choice for garage.
    if(leaveHouse == leaveHousePrompts[0]) {
        
        console.log("Dead!")
    }

    //Choice for room.
    else if(leaveHouse == leaveHousePrompts[1]) {
        enterBedroom();
    }

     //Choice for outside.
     if(leaveHouse == leaveHousePrompts[2]) {
        console.log(`You open the door as slowly as possible but a zombie hiding in a bush a few feet away finds you!`);
        //Maybe INCLUDE combat against zombies?
        zombieEncounter();
    }
}

/**
 * @name enterBedroom
 * @description Choices for the bedroom
 * 
 * @param none
 * 
 * @returns null
 */
function enterBedroom() {
    //Let's you know what is in the room.
    console.log('You go back upstairs to your room and look around');
    if(bedroomItems.length > 0) console.log(`You find your ${bedroomItems.toString()}`)
    else if(bedroomItems.length == 0) console.log(`Bedroom is empty!`);

    let leaveBedroomChoice = "";
    let leaveBedroomPrompts = ['pick up','leave'];

    //Prompts until player leaves the bedroom
    do {
        //Prompts for room interactions
        leaveBedroomChoice = "";
        while(checkValidChoice(leaveBedroomChoice,leaveBedroomPrompts) == 'invalid') leaveBedroomChoice = prompt(`Would you like to [pick up] the stuff or [leave]?`);
        leaveBedroomChoice = leaveBedroomChoice.toLowerCase();

        //Moves all items in room to your inventory
        if(leaveBedroomChoice == leaveBedroomPrompts[0]) {
            if(bedroomItems.length == 0) console.log(`Bedroom is empty!`);
            //Picks up all the items
            else {
                while(bedroomItems.length > 0) pInv.push(bedroomItems.shift());
                console.log(`You took as much as you could fit into your pockets.`);
            }
        }
    } while(leaveBedroomChoice !== leaveBedroomPrompts[1]);
    //Returns back to beginning of house.
    leaveHouse();
}


//Calls the main game
do {
    chooseAdventure();
    while(checkValidChoice(endGame,['yes','no']) == 'invalid') endGame = prompt(`Would you like to play again? [yes/no] `);
}while(checkValidChoice(endGame,['yes']) == 'yes')


