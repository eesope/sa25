import UserMsg from "../lang/messages/en/user.js";

document.addEventListener("DOMContentLoaded", () => {
    const questionDiv = document.getElementById("question");
    questionDiv.textContent = UserMsg.question;
});

const goButton = document.getElementById("goBtn");
goButton.addEventListener("click", () => {
    const num = document.getElementById("num").value;
    validateNum(num);
})

const colorArray = ["d00000", "ffba08", "3f88c5", "032b43", "136f63", "595959", "7f5539"]

function validateNum(num) {
    if (num > 2 && num < 8) {
        console.log(num);
        makeBtn(num)
    } else {
        alert(UserMsg.validateNum);
        location.reload()
    }
}

function makeBtn(num) {



}

function shuffleBtn(btnArr) {
    const currLen = btnArr.length;
    let temp;

    while (currLen) {
        let randomIndex = Math.floor(Math.random() * currLen--);
        temp = btnArr[currLen];
        btnArr[currLen] = btnArr[randomIndex];
        btnArr[randomIndex] = temp;
    }
    return btnArr;
}

function paintBtn(btnArr) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    ctx.fillRect(0, 0, 150, 75);

}

// import random
class Buttons {
    constructor(color, order) {
        this.color = color;
        this.order = order;
        this.shuffleXY = shuffleXY;
    }
}