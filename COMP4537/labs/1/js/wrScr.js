import UserMsg from "../lang/messages/en/user.js";

// Codes made with the help of chatGPT, Stack Overflow

// painting page with messages for users
const title = document.getElementById("title");
const savingTime = document.getElementById("time");
const backHome = document.getElementById("home")
const notesDiv = document.getElementById("content")

document.addEventListener("DOMContentLoaded", () => {
    title.textContent = UserMsg.wrTitle;
    savingTime.textContent = UserMsg.timeSaved;
});

backHome.addEventListener("click", () => {
    window.location.assign("../index.html");
});

notesDiv.insertBefore("")


class Note {
    constructor(input, time) {
        this.input = input;
        this.time = time;
        this.element = document.createElement("div");
        this.element.textContent = input;
    }

    remove(time) {
        if (time == this.time) {
            this.element = document.remove
        } else {
            console.error;
        }

    }

    edit(time, newInput) {
        if (time == this.time) {
            this.element.textContent = newInput;
        } else {
            console.error;
        }

    }
}