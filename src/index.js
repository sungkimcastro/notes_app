import { createNote } from "./notes";
import { setFilters } from "./filters";
import { renderNotes } from "./views";

renderNotes();

document.querySelector("#create-note").addEventListener("click", () => {
  const id = createNote();
  location.assign(`/edit.html#${id}`);
});

// Fires on every single character change
document.querySelector("#search-text").addEventListener("input", e => {
  setFilters({
    searchText: e.target.value
  });
  renderNotes();
});

// Change select list
document.querySelector("#filted-by").addEventListener("change", e => {
  setFilters({
    sortBy: e.target.value
  });
  renderNotes();
});

// Fires on storage window
window.addEventListener("storage", e => {
  if (e.key === "notes") {
    renderNotes();
  }
});
