const alert = document.querySelector(".alert");
const libraryForm = document.querySelector(".library-form");
const inputTitle = document.getElementById("title");
const entryContainer = document.querySelector(".entry-container");
const btnSave = document.getElementById("btn-save");
const btnClearAll = document.querySelector(".clear-all");

// entryContainer.style.visibility = "hidden";
// entryContainer.classList.add('hide-entry-container');
// alert.style.display = "none";
// document.body.style.backgroundColor = "red";

let entryTitle;
let editFlag = false;
let entryTitleID = "";

libraryForm.addEventListener("submit", addEntry);
btnClearAll.addEventListener("click", clearAll);

// to be implemented later
window.addEventListener("DOMContentLoaded", setupItemsFromStorage);

function addEntry(e) {
  e.preventDefault();
  const bookTitle = inputTitle.value;
  const id = Math.round(Math.random() * 10000000000).toString();

  if (bookTitle && !editFlag) {
    // createEntryItem(id, bookTitle);
    /*************************************************************************/
    /******** Modularize this section with 'createEntryItem(id, bookTitle)' ****/
    /*************************************************************************/
    const entryItem = document.createElement("div");
    entryItem.classList.add("entry-item");

    //HTML Data Attributes: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    const attr = document.createAttribute("data-id");
    attr.value = id;
    entryItem.setAttributeNode(attr);

    entryItem.innerHTML = `<div class="title">${bookTitle}</div>
                    <div class="action-btns-container">
                        <a href="#" class="btn btn-done"><i class="fa-regular fa-square-check"></i></a>
                        <a href="#" class="btn btn-edit"><i class="fa-regular fa-pen-to-square"></i></a>
                        <a href="#" class="btn btn-delete"><i class="fa-solid fa-trash-can"></i></a>
                    </div>`;

    // because these buttons below were created dynamically, we only have access to them
    // after they have been rendered, else they will be null.
    const btnDone = entryItem.querySelector(".btn-done");

    const btnEdit = entryItem.querySelector(".btn-edit");
    btnEdit.addEventListener("click", editBook);

    const btnDelete = entryItem.querySelector(".btn-delete");
    btnDelete.addEventListener("click", deleteBook);

    entryContainer.appendChild(entryItem);
    /*************************************************************************/
    /****************************** End module *******************************/
    /*************************************************************************/

    showEntriesContainer();
    showAlert("Book added to library", "success");
    saveBookInStorage(id, bookTitle);
    resetToDefault();

    // entryContainer.style.display = "block";
  } else if (bookTitle && editFlag) {
    console.log("editing");
    entryTitle.innerHTML = bookTitle;
    showAlert("Book title edited", "success");
    // Edit local storage
    editBookInStorage(entryTitleID, bookTitle);
    resetToDefault();
  } else {
    showAlert("Enter book title", "danger");
  }
}

function saveBookInStorage(id, title) {
  const storageEntry = { id, title };

  let items = getLocalStorage();
  items.push(storageEntry);

  localStorage.setItem("list", JSON.stringify(items));

  console.log(items);
}

function getBookFromStorage(id) {
  const item = localStorage.getItem(id);
  return item;
}

function getAllBooksFromStorage() {
  let items = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    items[key] = value;
  }

  return items;
}

function deleteBookFromStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  // update localStorage
  localStorage.setItem("list", JSON.stringify(items));
}

function editBookInStorage(id, title) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.title = title;
    }
    return item;
  });

  // update localStorage
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function resetToDefault() {
  inputTitle.value = "";
  editFlag = false;
  entryTitleID = "";
  btnSave.innerHTML = `<i class="fa-regular fa-floppy-disk"></i>`;
}

function clearAll() {
  const entryItems = document.querySelectorAll(".entry-item");
  if (entryItems.length > 0) {
    entryItems.forEach(function (item) {
      entryContainer.removeChild(item);
    });
  }

  hideEntriesContainer();
  showAlert("All books deleted", "success");
  resetToDefault();
  localStorage.removeItem("list");
}

function showAlert(text, type) {
  // alert.style.display = "block";
  alert.textContent = text;

  // Add the appropriate alert style
  // if (type === "danger") alert.classList.add("alert-danger");
  // if (type === "success") alert.classList.add("alert-success");

  // or shorter method with template string
  alert.classList.add(`alert-${type}`);

  // Remove the alert after some time
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${type}`);
  }, 3000);
}

function editBook(e) {
  const element = e.currentTarget.parentElement.parentElement;
  entryTitle = e.currentTarget.parentElement.previousElementSibling;
  inputTitle.value = entryTitle.innerHTML;
  editFlag = true;
  entryTitleID = element.dataset.id;
  btnSave.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
}

function deleteBook(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  console.log(`data id is ${id}`);
  entryContainer.removeChild(element);
  if (entryContainer.children.length === 0) {
    hideEntriesContainer();
  }
  showAlert("Book deleted", "success");
  resetToDefault();

  deleteBookFromStorage(id);
}

function hideEntriesContainer() {
  entryContainer.classList.remove("show-entry-container");
  btnClearAll.classList.remove("show-clear-all");
}

function showEntriesContainer() {
  entryContainer.classList.add("show-entry-container");
  btnClearAll.classList.add("show-clear-all");
}

function setupItemsFromStorage() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createEntryItem(item.id, item.title);
    });
    
    showEntriesContainer();
  }
}

function createEntryItem(id, bookTitle) {
  const entryItem = document.createElement("div");
  entryItem.classList.add("entry-item");

  //HTML Data Attributes: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
  const attr = document.createAttribute("data-id");
  attr.value = id;
  entryItem.setAttributeNode(attr);

  entryItem.innerHTML = `<div class="title">${bookTitle}</div>
                    <div class="action-btns-container">
                        <a href="#" class="btn btn-done"><i class="fa-regular fa-square-check"></i></a>
                        <a href="#" class="btn btn-edit"><i class="fa-regular fa-pen-to-square"></i></a>
                        <a href="#" class="btn btn-delete"><i class="fa-solid fa-trash-can"></i></a>
                    </div>`;

  // because these buttons below were created dynamically, we only have access to them
  // after they have been rendered, else they will be null.
  const btnDone = entryItem.querySelector(".btn-done");

  const btnEdit = entryItem.querySelector(".btn-edit");
  btnEdit.addEventListener("click", editBook);

  const btnDelete = entryItem.querySelector(".btn-delete");
  btnDelete.addEventListener("click", deleteBook);

  entryContainer.appendChild(entryItem);
}
