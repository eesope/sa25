import UserMsg from "../lang/messages/en/user.js";

// Codes made with the help of chatGPT, Stack Overflow

// painting page with messages for users
document.addEventListener("DOMContentLoaded", () => {
    const titleLabel = document.getElementById("title");
    titleLabel.textContent = UserMsg.title;
});

document.addEventListener("DOMContentLoaded", () => {
    const writerBtn = document.getElementById("writer");
    writerBtn.textContent = UserMsg.writerBtn;
    const readerBtn = document.getElementById("reader");
    readerBtn.textContent = UserMsg.readerBtn;
});

const writerPg = document.getElementById("startBtn");
const readerPg = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    const num = document.getElementById("num").value;
    const game = new Game(num);
    game.start();
})
