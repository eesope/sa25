// get number of boxes

// make individual boxes
// colorBoxes(color, orderNum, shuffledLoc)

// make array of boxes

// display box array with limited time && no other texts || buttons

// shuffle box array
// Then move them around within browser window every two second for three times.
// Make sure each time before moving them around utilize the current window size so buttons don't land outside window. 

// hide the numbers from the buttons, 
// make the buttons clickable now 
// let the user test their memory to remember their orders. 

// Then the user has to remember the order in which they originally appeared and to click them in the same order. If the user remembered the order and clicked all of them in same order, display message "Excellent memory!" 

// Each time the users clicks on a button in correct order, 
// confirm the order of that button by revealing the number on it.

// Otherwise, the moment the user clicked a button in wrong order, 
// display "Wrong order!" message 
// and reveal the correct order of all buttons and game ends.

const colorArray = ["d00000", "ffba08", "3f88c5", "032b43", "136f63", "595959", "7f5539"]

const number = document.getElementById("num").value

// import random
class Buttons {
    constructor(color, order, shuffleXY) {
        this.color = color;
        this.order = order;
        this.shuffleXY = shuffleXY;
    }
}

function validateNum(number) {
    if (number > 2 && number < 8) {
        alert(number);
    } else {
        alert("else");
    }
}

function makeBtn(number) {

}

function shuffleBtn(btnArr) {

}











