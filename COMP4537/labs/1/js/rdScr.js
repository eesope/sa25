import UserMsg from "../lang/messages/en/user.js";
import Note from "./Note.js";

// Codes made with the help of chatGPT, Stack Overflow

// painting page with messages for users
const title = document.getElementById("title");
const savingTime = document.getElementById("timeText");
const backHome = document.getElementById("home");
const notesContainer = document.getElementById("notePad");

document.addEventListener("DOMContentLoaded", () => {
    title.textContent = UserMsg.rdTitle;
    savingTime.textContent = UserMsg.timeUpdated;
    loadNotes();
    updateLastSavedTime();
});

backHome.addEventListener("click", () => {
    window.location.assign("../index.html");
});

setInterval(() => {
    updateLastSavedTime()
    loadNotes()
}, 2000);

function updateLastSavedTime() {
    const timeSpan = document.querySelector("#time");
    timeSpan.textContent = `${new Date().toLocaleTimeString()}`;
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "{}");
    notesContainer.innerHTML = "";

    for (const [time, input] of Object.entries(notes)) {
        const note = new Note(input, time, false);
        note.element;
    }
}

