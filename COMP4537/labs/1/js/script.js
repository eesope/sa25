import UserMsg from "../lang/messages/en/user.js";

// Codes made with the help of chatGPT, Stack Overflow

// painting page with messages for users
const titleLabel = document.getElementById("title");
const writerBtn = document.getElementById("writer");
const readerBtn = document.getElementById("reader");

document.addEventListener("DOMContentLoaded", () => {
    titleLabel.textContent = UserMsg.title;
});

document.addEventListener("DOMContentLoaded", () => {
    writerBtn.textContent = UserMsg.writerBtn;
    readerBtn.textContent = UserMsg.readerBtn;
});

writerBtn.addEventListener("click", () => {
    window.location.assign("./pages/writer.html")
})
readerBtn.addEventListener("click", () => {
    window.location.assign("./pages/reader.html")
})