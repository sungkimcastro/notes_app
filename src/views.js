import moment from "moment";
import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";
import { removeNote, saveNote } from "./notes";

// Generate the DOM structure for a note
const generateNoteDom = note => {
  const createEl = document.createElement("div");
  createEl.classList.add("list-item");
  const textEl = document.createElement("a");

  const statusEl = document.createElement("p");

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.setAttribute("href", `/edit.html#${note.id}`);
  textEl.classList.add("list-item__title");
  createEl.appendChild(textEl);

  // Setup  the status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  createEl.appendChild(statusEl);

  return createEl;
};

// Render application notes
const renderNotes = () => {
  const notesContainer = document.querySelector("#notes");
  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesContainer.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(note => {
      const createEl = generateNoteDom(note);

      notesContainer.appendChild(createEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    notesContainer.appendChild(emptyMessage);
  }
};

const initializedEditPage = noteId => {
  const titleElement = document.querySelector("#note-title");
  const spanElement = document.querySelector("#edited");
  const bodyElement = document.querySelector("#note-body");

  const notes = getNotes();
  const note = notes.find(note => note.id === noteId);

  if (!note) {
    location.assign("/index.html");
  }

  titleElement.value = note.title;
  bodyElement.value = note.body;
  spanElement.textContent = generateLastEdited(note.updatedAt);
};

// Generate the last edited message
const generateLastEdited = timeStamp => {
  return `Last edited: ${moment(timeStamp).fromNow()}`;
};

export {
  generateNoteDom,
  renderNotes,
  generateLastEdited,
  initializedEditPage
};
