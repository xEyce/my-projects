const notesContainer = document.querySelector(".notesContainer");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.querySelector("#deleteImg");
let notes = document.querySelector(".noteBox");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
};
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
};

addBtn.addEventListener("click", ()=> {
    const noteBox = document.createElement("div");
    const noteContent = document.createElement("div");
    const deleteImg = document.createElement("img");

    noteBox.className = "noteBox";
    noteContent.className = "noteContent";
    noteContent.setAttribute("contenteditable", "true");
    noteContent.innerHTML = "<br>";

    deleteImg.src = "delete.png";
    deleteImg.id = "deleteImg";
    deleteImg.setAttribute("contenteditable", "false");

    noteBox.appendChild(noteContent);
    noteBox.appendChild(deleteImg);
    notesContainer.appendChild(noteBox);
    updateStorage();
})

notesContainer.addEventListener("click", event => {
    if (event.target.id === "deleteImg") {
        event.target.parentElement.remove();
        updateStorage();
    } else if (event.target.className === "noteContent"){
        notes = document.querySelectorAll(".noteContent");
        notes.forEach(note => {
            note.onkeyup = function() {
                updateStorage();
            };
        })

    };
})

