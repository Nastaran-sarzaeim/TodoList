// variable

const form = document.querySelector("#form");
const result = document.querySelector("#result");
const date = document.querySelector("#date");

// eventlistener

listener();
function listener() {
  form.addEventListener("submit", newNote);

  document.addEventListener("DOMContentLoaded", function () {
    const todayDate = document.createElement("p");
    date.appendChild(todayDate);
    todayDate.innerHTML = `
        <p class="text-center my-4 py-2 text-white rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500">
    ${new Date().toLocaleDateString()}</p>`;
  });
  document.addEventListener("DOMContentLoaded", LSOnLoad);
}

// function
function newNote(e) {
  e.preventDefault();
  const note = { note: document.querySelector("#note").value, checked: false };

  const div = document.createElement("div");
  result.appendChild(div);

  div.innerHTML = `
    <div class="flex py-2 bg-violet-400 rounded-lg my-2 hover:shadow-md shadow-sm hover:-translate-y-1 duration-150">
      <li class="flex justify-between min-w-[85%] pl-2">${note.note}</li>
      ${
        note.checked
          ? '<img src="./img/icons8-checkmark.svg" alt="" class="w-6 hover:-translate-y-1 duration-150 cursor-pointer" onclick="doneNote(this)" id="done">'
          : '<img src="./img/circle.svg" alt="" class="w-6 hover:-translate-y-1 duration-150 cursor-pointer" onclick="doneNote(this)" id="done">'
      }
      <img src="./img/icons8-trash.svg" alt="" class="w-6 hover:-translate-y-1 duration-150 cursor-pointer" onclick="removeNote(this)" id="delete">
    </div>
    `;
  this.reset();

  addToLS(note);
}

function doneNote(e) {
  let noteDone = e.parentElement;
  let checked;
  if (noteDone.classList.contains("task-done")) {
    noteDone.classList.remove("task-done");
    e.src = "./img/circle.svg";
    checked = false;
  } else {
    noteDone.classList.add("task-done");
    e.src = "./img/icons8-checkmark.svg";
    checked = true;
  }
  console.log(noteDone);
  doneFromLS(noteDone.children[0].textContent, checked);
}
function removeNote(e) {
  e.parentElement.parentElement.remove();
  removeFromLS(e.parentElement.parentElement.textContent.trim());
}

function addToLS(note) {
  let listNotes = getFromLS();
  listNotes.push(note);

  LSSetList(listNotes);
}

function getFromLS() {
  let note;

  let getFromLS = localStorage.getItem("notes");
  if (getFromLS === null) {
    note = [];
  } else {
    note = JSON.parse(getFromLS);
  }
  return note;
}
function removeFromLS(noteContent) {
  console.log(noteContent);
  let notes = getFromLS();
  notes.forEach((note, index) => {
    if (note.note === noteContent) {
      notes.splice(index, 1);
    }
  });
  LSSetList(notes);
}
function doneFromLS(content, checked) {
  let notes = getFromLS();

  notes.forEach((note) => {
    if (note.note === content) {
      note.checked = checked;
    }
  });
  LSSetList(notes);
}
function LSOnLoad() {
  let notes = getFromLS();
  notes.forEach((note) => {
    const div = document.createElement("div");
    result.appendChild(div);
    div.innerHTML = `
      <div class="flex py-2 bg-violet-400 ${
        note.checked && "task-done"
      } rounded-lg my-2 hover:shadow-md shadow-sm hover:-translate-y-1 duration-150 ">
        <li class="flex justify-between min-w-[85%] pl-2">${note.note}</li>
        ${
          note.checked
            ? '<img src="./img/icons8-checkmark.svg" alt="" class="w-6 hover:-translate-y-1 duration-150 cursor-pointer" onclick="doneNote(this)" id="done">'
            : '<img src="./img/circle.svg" alt="" class="w-6 hover:-translate-y-1 duration-150 cursor-pointer" onclick="doneNote(this)" id="done">'
        }
        <img src="./img/icons8-trash.svg" alt="" class="w-6 hover:-translate-y-1 duration-150 cursor-pointer" onclick="removeNote(this)" id="delete">
      </div>
      `;
  });
}
function LSSetList(items) {
  localStorage.setItem("notes", JSON.stringify(items));
}
