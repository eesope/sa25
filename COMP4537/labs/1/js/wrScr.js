import UserMsg from "../lang/messages/en/user.js";

// Codes made with the help of chatGPT, Stack Overflow

// painting page with messages for users
const title = document.getElementById("title");
const savingTime = document.getElementById("timeText");
const backHome = document.getElementById("home");
const notesDiv = document.getElementById("notePad");
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
});

function updateLastSavedTime() {
    const timeSpan = document.querySelector("#time");
    timeSpan.textContent = `${new Date().toLocaleTimeString()}`;
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "{}");
    for (const [time, input] of Object.entries(notes)) {
        const note = new Note(input, time);
        note.element;
    }
}

function addNewNote() {
    const time = Date.now();
    const note = new Note("", time);
    note.element;
    note.save();
}

class Note {
    constructor(input, time) {
        this.input = input;
        this.time = time;
        this.element = this.createElement(); // hold their each DOM element
    }

    createElement() {
        const div = document.createElement("div");
        div.classList.add("note");

        const textArea = document.createElement("textarea");
        textArea.value = this.input;
        textArea.addEventListener("input", () => this.edit(textArea.value));

        const removeBtn = document.createElement("button")
        removeBtn.textContent = "✖️"
        removeBtn.addEventListener("click", () => this.remove());

        div.appendChild(textArea);
        div.appendChild(removeBtn);

        const firstNote = notesDiv.firstChild;
        notesDiv.insertBefore(div, firstNote);
        div.appendChild(removeBtn);
        return div;
    }

    save() {
        const notes = JSON.parse(localStorage.getItem("notes") || "{}");
        notes[this.time] = this.input;
        localStorage.setItem("notes", JSON.stringify(notes));
        updateLastSavedTime();
    }

    remove() {
        const notes = JSON.parse(localStorage.getItem("notes") || "{}");
        delete notes[this.time];
        localStorage.setItem("notes", JSON.stringify(notes));
        this.element.remove();
    }

    edit(newInput) {
        this.input = newInput;
        this.save();
    }
}