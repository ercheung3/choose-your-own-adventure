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
/**
 * @name hasItem
 * @description Checks player's inventory for a specific item
 * 
 * @param {string} item Item to be checked
 * 
 * @return {boolean} true if found, false if not found
 */
function hasItem(item) {
        //Checks index (Could use for loop)
        let index = 0;
        for (const invItem of pInv) {
            //Check inventory for item and automatically uses
            if(invItem.toLowerCase() == item.toLowerCase()) {
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
 * @name useItem
 * @description Uses up an item for an interaction
 * 
 * @param none
 * 
 * @returns none
 */
function useItem(item) {
    pInv.splice(pInv.indexOf(item),1);
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

/**
 * @name zomebieEncounter
 * @description Function for zombie encounters
 * 
 * @param none;
 * 
 * @returns null;
 */
function zombieEncounter() {
    let zombieChoice = "";
    let zombieChoicePrompts = ['fight','run']
    while(checkValidChoice(zombieChoice,zombieChoicePrompts) == 'invalid') zombieChoice = prompt(`Do you [fight] the zombie or try to [run] away? `);
    zombieChoice = zombieChoice.toLowerCase();
    if(zombieChoice == zombieChoicePrompts[0]) console.log("ADD A ZOMBIE FIGHT MECHANIC");
    else if(zombieChoice == zombieChoicePrompts[1]) console.log("ADD AN ESCAPE MECHANIC");
}

/**
 * @name prologue
 * @description prologue function to set the scene and ask for name
 * 
 * @param none
 * 
 * @returns null
 */
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
    if(leaveHouse == leaveHousePrompts[0]) enterGarage();
    //Choice for room.
    else if(leaveHouse == leaveHousePrompts[1]) enterBedroom();
     //Choice for outside.
    else if(leaveHouse == leaveHousePrompts[2]) {
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

/**
 * @name enterGarage
 * @description Choices for the garage
 * 
 * @param none
 * 
 * @returns null
 */
function enterGarage() {
    console.log(`You walk towards the garage and open the door. Turning on the light switch, you find your 2010 Toyota Camry and some tools.`);
    let garageChoice = "";
    let garageChoicePrompts = ['car','tools','inside'];
    
    let carChoice = "";
    let carChoicePrompts = ['start','look'];
    //Continues prompts until car is [start]ed or you go back [inside] the house.
    do {
        //Prompt for garage interactions
        garageChoice = "";
        while(checkValidChoice(garageChoice,garageChoicePrompts) == 'invalid') garageChoice = prompt(`Check [car], [tools], or go back [inside] your house? `);
        garageChoice = garageChoice.toLowerCase();

        //User selects [car] choice
        if(garageChoice == garageChoicePrompts[0]) {
            //Checks for car keys in inventory
            //Has keys in inventory
            if(hasItem('keys')) {
                carChoice = checkCar();
            }
            //No key in inventory
            else console.log(`You check you pockets and don't find the keys to the car. Maybe you left it somewhere else in the house.`);
        }
        //User selects [tools]
        else if(garageChoice == garageChoicePrompts[1]) {
            console.log(`It's just a bunch of rusty old tools on the rack that you haven't used since the end of fall.`);
            console.log(`You question yourself if its right or wrong to try to put these in your small pockets.`)
        }
        //User selects [inside]
        else if(garageChoice == garageChoicePrompts[2]) leaveHouse();
    } while(carChoice !== carChoicePrompts[0] && garageChoice !== garageChoicePrompts[2]);
}

/**
 * @name checkCar
 * @description Checks the car (with keys or not) and returns the user's choice in the car
 * 
 * @param none
 * 
 * @returns {string} carChoice
 */
function checkCar() {
    let carChoice = "";
    let carChoicePrompts = ['start','look'];
    while(checkValidChoice(carChoice,carChoicePrompts) == 'invalid') carChoice = prompt(`You remember that you picked up your keys from the bedroom, do you want to [start] the car and leave the house or [look] around the garage?`);
        carChoice = carChoice.toLowerCase();

    if(carChoice == carChoicePrompts[0]) {
        console.log(`LEAVE THE GARAGE FUNCTION`);
        return carChoice;
    }
    else {
        console.log(`You leave the car and look around the garage again.`);
        return carChoice;
    }
        
}

//Calls the main game
do {
    chooseAdventure();
    while(checkValidChoice(endGame,['yes','no']) == 'invalid') endGame = prompt(`Would you like to play again? [yes/no] `);
}while(checkValidChoice(endGame,['yes']) == 'yes')


