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
const DISPLAY = document.getElementById("display")

class BlockBtn {
    constructor(color, order) {
        this.color = color;
        this.order = order + 1; // from index of array
        this.domElement = document.createElement("button");
        this.hide = true;
        this.domElement.textContent = this.order;
        this.domElement.style.backgroundColor = `#${this.color}`;
    }

    shuffleBB(coord) {
        this.domElement.style.position = "absolute";
        this.domElement.style.left = `${coord.x}px`;
        this.domElement.style.top = `${coord.y}px`;
        this.domElement.hide = this.hide;
    }

    addEventListener(event, callback) {
        this.domElement.addEventListener(event, callback);
    }

    getRandomCoor(element) {
        const btnContainer = DISPLAY.getBoundingClientRect();
        const elementRect = element.domElement.getBoundingClientRect();

        const maxX = btnContainer.width - elementRect.width;
        const maxY = btnContainer.height - elementRect.height;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        return { x: randomX, y: randomY };
    }
}

function gameStart(num) {
    if (validateNum(num)) {
        const userMem = [];
        let buttons = makeBBs(num);
        let shuffledBtns = shuffleOrders(buttons);

        paintBtns(shuffledBtns);

        const delayTime = num * 1000;
        setTimeout(() => {
            DISPLAY.innerHTML = "";
            let counter = 0;

            const interval = setInterval(() => {
                counter++;
                if (counter > num) {
                    shuffledBtns.forEach(btn => {
                        btn.domElement.textContent = "";
                    });
                    clearInterval(interval)
                    mixDisp(shuffledBtns)

                } else {
                    mixDisp(shuffledBtns);
                }
            }, 2000);
        }, delayTime);


        DISPLAY.addEventListener("click", (e) => {
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

function makeBBs(num) {
    const btnArr = [];
    for (let i = 0; i < num; i++) {
        const newBtn = new BlockBtn(colorArray[i], i);
        btnArr[i] = newBtn
    }
    return btnArr;
}

function shuffleOrders(btnArr) {
    let currLen = btnArr.length;
    let temp;
    while (currLen) {
        let randomIndex = Math.floor(Math.random() * currLen--);
        temp = btnArr[currLen].order;
        btnArr[currLen].order = btnArr[randomIndex].order;
        btnArr[randomIndex].order = temp;
    }
    // update shuffled order
    btnArr.forEach(btn => {
        btn.domElement.textContent = btn.order;
    });
    return btnArr;
}

function paintBtns(btnArr) {
    btnArr.sort((a, b) => a.order - b.order)
    btnArr.forEach((btn) => {
        btn.domElement.textContent = btn.order;
        DISPLAY.appendChild(btn.domElement);
    });
}

function mixDisp(btnArr) {
    btnArr.forEach(btn => {
        btn.shuffleBB(btn.getRandomCoor(btn));
        DISPLAY.appendChild(btn.domElement);
    });
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



