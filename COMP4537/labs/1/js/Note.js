export default class Note {
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

        const notesDiv = document.getElementById("notePad");
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
