const alert = document.querySelector(".alert");
const libraryForm = document.querySelector(".library-form");
const title = document.getElementById("title");
const entryContainer = document.querySelector(".entry-container");
const btnSave = document.getElementById("btn-save");
const btnClearAll = document.querySelector(".clear-all");

// entryContainer.style.visibility = "hidden";
// entryContainer.classList.add('hide-entry-container');
// alert.style.display = "none";
// document.body.style.backgroundColor = "red";

let editFlag = false;

libraryForm.addEventListener("submit", addEntry);
btnClearAll.addEventListener("click", clearAll);

function addEntry(e) {
  e.preventDefault();
  const bookTitle = title.value;
  const id = Math.round(Math.random() * 10000000000).toString();

  if (bookTitle && !editFlag) {
    const entryItem = document.createElement("div");
    entryItem.classList.add("entry-item");

    const attr = document.createAttribute("data-id");
    attr.value = id;
    entryItem.setAttributeNode(attr);

    entryItem.innerHTML = `<div class="title">${bookTitle}</div>
                    <div class="action-btns-container">
                        <a href="#" class="btn btn-actions btn-progress"><i class="fa-solid fa-spinner"></i></a>
                        <a href="#" class="btn btn-actions btn-done"><i class="fa-regular fa-square-check"></i></a>
                        <a href="#" class="btn btn-actions btn-delete"><i class="fa-solid fa-trash-can"></i></a>
                    </div>`;

    // because these buttons were created dynamically, we have access to them
    // after they have been rendered, else they will be null.
    const btnProgress = entryItem.querySelector(".btn-progress");
    const btnDone = entryItem.querySelector(".btn-done");
    // btnDone.addEventListener("click", function () {
    //   console.log(getAllBookItems());
    // });
    const btnDelete = entryItem.querySelector(".btn-delete");
    btnDelete.addEventListener("click", deleteBook);

    entryContainer.appendChild(entryItem);
    showFormEntries();
    showAlert("book added to library", "success");
    saveBookItem(id, bookTitle);
    resetToDefault();

    // entryContainer.style.display = "block";
  } else if (bookTitle && editFlag) {
    console.log("editing");
  } else {
    showAlert("Enter book title", "danger");
  }
}

function saveBookItem(id, bookTitle) {
  localStorage.setItem(id, bookTitle);
  console.log("added to local storage");
}

function getBookItem(id) {
  const item = localStorage.getItem(id);
  return item;
}

function getAllBookItems() {
  let items = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    items[key] = value;
  }

  return items;
}

function resetToDefault() {
  title.value = "";
  editFlag = false;
}

function clearAll() {
  const entryItems = document.querySelectorAll(".entry-item");
  if (entryItems.length > 0) {
    entryItems.forEach(function (item) {
      entryContainer.removeChild(item);
    });
  }

  hideFormEntries();
  showAlert("All books deleted", "success");
  resetToDefault();
  // localStorage.removeItem('book');
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

function deleteBook(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  console.log(`data id is ${id}`);
  entryContainer.removeChild(element);
  if (entryContainer.children.length === 0) {
    hideFormEntries();
  }
  showAlert("Book deleted", "success");
  resetToDefault();
  // removeFromLocalStorage(id);
}

function hideFormEntries() {
  entryContainer.classList.remove("show-entry-container");
  btnClearAll.classList.remove("show-clear-all");
}

function showFormEntries() {
  entryContainer.classList.add("show-entry-container");
  btnClearAll.classList.add("show-clear-all");
}
