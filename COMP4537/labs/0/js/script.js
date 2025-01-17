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
    const game = new Game(num);
    game.start();
})

const colorArray = ["d00000", "ffba08", "3f88c5", "fa3e16", "136f63", "855194", "7f5539"]
const DISPLAY = document.getElementById("display")

class Game {
    constructor(num) {
        this.num = num;
        this.userMem = [];
        this.buttons = this.makeBBs(num);
        this.shuffledBtns = this.shuffleOrders(this.buttons);
    }

    start() {
        this.paintBtns(this.shuffledBtns);

        const delayTime = this.num * 1000;
        const intervalTime = 2000;
        
        setTimeout(() => {
            DISPLAY.innerHTML = "";
            let counter = 0;

            const interval = setInterval(() => {
                counter++;
                if (counter >= this.num) {
                    this.shuffledBtns.forEach(btn => {
                        btn.domElement.textContent = "";
                    });
                    clearInterval(interval);
                    this.mixDisp();
                } else {
                    this.mixDisp();
                }
            }, intervalTime);

        }, delayTime);

        // user input compare with answer
        DISPLAY.addEventListener("click", (e) => {
            if (e.target.tagName.toLowerCase() == 'button') {
                const clickedBtn = e.target;
                const button = this.shuffledBtns.find(btn => btn.domElement === clickedBtn);
                this.userMem.push({ color: button.color, order: button.order });

                if (this.userMem.length === this.shuffledBtns.length) {
                    const memoryTest = new MemoryTest(this.shuffledBtns, this.userMem);
                    memoryTest.compareMem();
                }
            }
        });
    }

    validateNum(num) {
        return num > 2 && num < 8;
    }

    makeBBs(num) {
        const btnArr = [];
        for (let i = 0; i < num; i++) {
            const newBtn = new BlockBtn(colorArray[i], i);
            btnArr[i] = newBtn;
        }
        return btnArr;
    }

    // update shuffled order
    shuffleOrders(btnArr) {
        let currLen = btnArr.length;
        let temp;
        while (currLen) {
            let randomIndex = Math.floor(Math.random() * currLen--);
            temp = btnArr[currLen].order;
            btnArr[currLen].order = btnArr[randomIndex].order;
            btnArr[randomIndex].order = temp;
        }
        btnArr.forEach(btn => {
            btn.domElement.textContent = btn.order;
        });
        return btnArr;
    }

    paintBtns(btnArr) {
        btnArr.sort((a, b) => a.order - b.order);
        btnArr.forEach((btn) => {
            DISPLAY.appendChild(btn.domElement);
        });
    }

    mixDisp() {
        this.shuffledBtns.forEach(btn => {
            const coord = btn.getRandomCoor();
            btn.shuffleBB(coord);
            DISPLAY.appendChild(btn.domElement);
        });
    }
}

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

    getRandomCoor() {
        const btnContainer = DISPLAY.getBoundingClientRect();
        const elementRect = this.domElement.getBoundingClientRect();

        const maxX = btnContainer.width - elementRect.width;
        const maxY = btnContainer.height - elementRect.height;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        return { x: randomX, y: randomY };
    }
}

class MemoryTest {
    constructor(shuffledBtns, userMem) {
        this.shuffledBtns = shuffledBtns;
        this.userMem = userMem;
    }

    compareMem() {
        const shuffledOrders = this.shuffledBtns.map(btn => ({ color: btn.color, order: btn.order }));

        console.log(this.userMem)
        console.log(shuffledOrders)

        if (JSON.stringify(this.userMem) === JSON.stringify(shuffledOrders)) {
            alert(UserMsg.correct);
        } else {
            alert(UserMsg.incorrect);
        }

        this.shuffledBtns.forEach(btn => {
            btn.domElement.textContent = btn.order; // reset the text
        });

        this.paintBtns(this.shuffledBtns);
    }

    paintBtns(btnArr) {
        btnArr.forEach((btn) => {
            DISPLAY.appendChild(btn.domElement);
        });
    }
}
