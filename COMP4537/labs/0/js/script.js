import UserMsg from "../lang/messages/en/user.js";

// painting page with messages for users
document.addEventListener("DOMContentLoaded", () => {
    const inputLabel = document.getElementById("inputLabel");
    inputLabel.textContent = UserMsg.question;
});

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    startBtn.textContent = UserMsg.startBtn;
});

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
    const num = document.getElementById("num").value;
    validateNum(num);
})

const colorArray = ["d00000", "ffba08", "3f88c5", "fa3e16", "136f63", "855194", "7f5539"]
const btnArr = [];

class MemBtn {
    constructor(color) {
        this.color = color;
        // this.shuffleXY = shuffleXY;
    }
}

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
    for (let i = 0; i < num; i++) {
        const newBtn = new MemBtn(colorArray[i]);
        btnArr[i] = newBtn;
    }
    shuffleBtn(btnArr);
}

function shuffleBtn(btnArr) {
    let currLen = btnArr.length;
    let temp;
    while (currLen) {
        let randomIndex = Math.floor(Math.random() * currLen--);
        temp = btnArr[currLen];
        btnArr[currLen] = btnArr[randomIndex];
        btnArr[randomIndex] = temp;
    }
    paintBtn(btnArr)
}

// Made with the help of chatGPT
function paintBtn(btnArr) {
    const display = document.getElementById("display");
    for (let i = 0; i < btnArr.length; i++) {
        const colorBtn = document.createElement("button");

        colorBtn.textContent = i + 1;
        colorBtn.style.backgroundColor = `#${btnArr[i].color}`;

        display.appendChild(colorBtn);
    }
    setTimeout(() => {
        display.innerHTML = "";
    }, btnArr.length * 1000);

    mixBtn(btnArr);
}

function mixBtn(btnArr) {
    // const canvas = document.getElementById("canvas");
    // const ctx = canvas.getContext("2d");

    // randomly show divs on 

    setInterval(function () {
        console.log("len")
    }, btnArr.length * 1000);

}




