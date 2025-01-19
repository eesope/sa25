export default class Note {
    constructor(input, time, isWr) {
        this.input = input;
        this.time = time;
        this.isWr = isWr;
        this.element = this.createElement(); // hold their each DOM element
    }

    createElement() {
        const div = document.createElement("div");
        div.classList.add("note");

        const textArea = document.createElement("textarea");
        textArea.value = this.input;

        if (!this.isWr) {
            textArea.setAttribute("readonly", "true");
        }

        textArea.addEventListener("input", () => {
            if (this.isWr) {
                this.edit(textArea.value);
                const updateEvent = new CustomEvent("noteUpdated");
                window.dispatchEvent(updateEvent);
            }
        });
        div.appendChild(textArea);

        if (this.isWr) {
            const removeBtn = document.createElement("button")
            removeBtn.textContent = "✖️"
            removeBtn.addEventListener("click", () => this.remove());
            div.appendChild(removeBtn);
        }

        const notesDiv = document.getElementById("notePad");
        const firstNote = notesDiv.firstChild;
        if (firstNote) {
            notesDiv.insertBefore(div, firstNote);
        } else {
            notesDiv.appendChild(div);
        }
        return div;
    }

    save() {
        const notes = JSON.parse(localStorage.getItem("notes") || "{}");
        notes[this.time] = this.input;
        localStorage.setItem("notes", JSON.stringify(notes));
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
