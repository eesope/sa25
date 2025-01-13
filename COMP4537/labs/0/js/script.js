import UserMsg from "../lang/messages/en/user.js";

// Codes made with the help of chatGPT, Stack Overflow

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
    gameStart(num);
})

const colorArray = ["d00000", "ffba08", "3f88c5", "fa3e16", "136f63", "855194", "7f5539"]

class MemBtn {
    constructor(color, order) {
        this.color = color;
        this.order = order + 1; // from index of array
        this.domElement = null;
        this.disabled = true;
        boxLocation.appendChild(this.domElement);
        this.domElement.textContent = this.order;
    }

    createButton(index) {
        const button = document.createElement("button");
        button.textContent = index + 1;
        button.style.backgroundColor = `#${this.color}`;
        this.domElement = button;
        return button;
    }
}

function gameStart(num) {
    if (validateNum(num)) {
        let buttons = makeB(num);
        let shuffledBtns = shuffleB(buttons);
        const userMem = [];
        const display = document.getElementById("display")

        paintB(shuffledBtns);
        mixB(shuffledBtns);

        const delayTime = parseInt(shuffledBtns.length) * 1000;
        setTimeout(() => {
            display.innerHTML = "";
        }, delayTime);

        display.addEventListener("click", (e) => {
            if (e.target.tagName.toLowerCase() == 'button') {
                const clickedBtn = e.target;
                userMem.push(clickedBtn.style.backgroundColor);

                if (userMem.length == shuffledBtns.length) {
                    compareMem(userMem, shuffledBtns);
                }
            }
        });

    } else {
        alert(UserMsg.validateNum);
        location.reload()
    }
}

function validateNum(num) {
    if (num > 2 && num < 8) {
        return true;
    } else {
        return false;
    }
}

function makeB(num) {
    const btnArr = [];
    for (let i = 0; i < num; i++) {
        const newBtn = new MemBtn(colorArray[i]);
        btnArr[i] = newBtn;
    }
    return btnArr;
}

function shuffleB(btnArr) {
    let currLen = btnArr.length;
    let temp;
    while (currLen) {
        let randomIndex = Math.floor(Math.random() * currLen--);
        temp = btnArr[currLen];
        btnArr[currLen] = btnArr[randomIndex];
        btnArr[randomIndex] = temp;
    }
    return btnArr;
}

function paintB(btnArr) {
    const display = document.getElementById("display");
    btnArr.forEach((btn, i) => {
        const newBtn = btn.createButton(i);
        display.appendChild(newBtn);
    });
}

function mixB(btnArr) {
    const display = document.getElementById("display");
    let count = 0;

    const intervalMix = setInterval(() => {
        // move to random location
        btnArr.forEach(btn => {

            // get button size to bound random location
            const targetBtn = btn.domElement;
            if (targetBtn) {
                const btnStyle = getComputedStyle(targetBtn);
                const btnWidth = parseFloat(btnStyle.width);
                const btnHeight = parseFloat(btnStyle.height);

                const randomX = Math.random() * (display.offsetWidth - btnWidth);
                const randomY = Math.random() * (display.offsetHeight - btnHeight);

                targetBtn.style.left = `${randomX}px`;
                targetBtn.style.top = `${randomY}px`;
                targetBtn.style.position = "absolute";
            } else {
                console.error();
            }
        });

        count++;
        if (count == btnArr.length) {
            clearInterval(intervalMix);
        }
    }, 2000);
}

function compareMem(userMem, shuffledBtns) {
    const shuffledColors = shuffledBtns.map(btn => btn.color);
    if (JSON.stringify(userMem) === JSON.stringify(shuffledColors)) {
        alert(UserMsg.correct);
    } else {
        alert(UserMsg.incorrect);
    }

    btnArr.forEach(btn => {
        btn.textContent(btn[i])
    });

    paintB(shuffledBtns);
}



