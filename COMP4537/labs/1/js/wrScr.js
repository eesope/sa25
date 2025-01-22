import UserMsg from "../lang/messages/en/user.js";
import Note from "./Note.js";

// Codes made with the help of chatGPT, Stack Overflow

// painting page with messages for users
const title = document.getElementById("title");
const savingTime = document.getElementById("timeText");
const backHome = document.getElementById("home");
const addBtn = document.getElementById("add");

document.addEventListener("DOMContentLoaded", () => {
    title.textContent = UserMsg.wrTitle;
    savingTime.textContent = UserMsg.timeSaved;
});

backHome.addEventListener("click", () => {
    window.location.assign("../index.html");
});

document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
    addBtn.addEventListener("click", addNewNote);
    updateLastSavedTime();
    // custom event to observe textArea
    window.addEventListener("noteUpdated", updateLastSavedTime)
});

function updateLastSavedTime() {
    const timeSpan = document.querySelector("#time");
    timeSpan.textContent = `${new Date().toLocaleTimeString()}`;
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "{}");
    for (const [time, input] of Object.entries(notes)) {
        const note = new Note(input, time, true);
        note.element;
    }
}

function addNewNote() {
    const time = Date.now();
    const note = new Note("", time, true);
    note.element;
    note.save();
}
