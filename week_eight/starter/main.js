const alert = document.querySelector(".alert");
const libraryForm = document.querySelector(".library-form");
const inputTitle = document.getElementById("title");
const entryContainer = document.querySelector(".entry-container");
const btnSave = document.getElementById("btn-save");
const btnClearAll = document.querySelector(".clear-all");

let entryTitle;
let editFlag = false;
let entryTitleID = "";