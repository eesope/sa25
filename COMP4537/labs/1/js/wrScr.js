import UserMsg from "../lang/messages/en/user.js";

// Codes made with the help of chatGPT, Stack Overflow

// painting page with messages for users
const titleLabel = document.getElementById("title");

document.addEventListener("DOMContentLoaded", () => {
    titleLabel.textContent = UserMsg.wrTitle;
});
