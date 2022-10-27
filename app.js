"use strict"
let myLibrary = [];
const addNewBookButton = document.querySelector(".add-new-book");
const submitButton = document.querySelector("#submit");
const bookShelf = document.querySelector(".main");


function Book (title, author, pages, readYet) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readYet = readYet;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages.`
    }
};

function addBookToLibrary(title, author, pages, readYet) { 
    myLibrary.push(new Book(title, author, pages, readYet));
} 


submitButton.addEventListener("click", (e) => {
    const title = document.querySelector("#book-name").value;
    const author = document.querySelector("#book-Author").value;
    const pages = +document.querySelector("#book-Pages").value;
    const readYet = document.querySelector("#book-Read-yet");
    let readYetValue;

    if(!title || !author || !pages){
        console.log("Please Enter a Task");

    }else{
       readYet.checked ? readYetValue = readYet.value : readYetValue = "not yet read";
        addBookToLibrary(title, author, pages, readYetValue);
        bookShelf.innerHTML = "";

        for(let i = 0; i < myLibrary.length; i++){
            bookShelf.innerHTML += `
            <div class="card">
                <h2>${myLibrary[i].info()}</h2>
                <button class="delete" data-index="${i}">Delete</button>
                <button class="read-yet-button" data-index="${i}">${myLibrary[i].readYet}</button>
            </div>
            `;
        };

        const btnreadYet = document.querySelectorAll(".read-yet-button");
        btnreadYet.forEach((btn) => btn.addEventListener("click", () => {
            if(btn.innerHTML === "Read"){
                myLibrary[`${btn.dataset.index}`].readYet = "no it not read";
                btn.innerHTML = "no it not read";
            }else{
                myLibrary[`${btn.dataset.index}`].readYet = "Read";
                btn.innerHTML = "Read";
            }
        }))

        const btndelete = document.querySelectorAll(".delete");
        btndelete.forEach((btn) => btn.addEventListener("click", () => {
            myLibrary.splice(+btn.dataset.index, 1);
            btn.parentNode.remove();
        }))

 
        document.querySelectorAll("#form-section input[type='text']").forEach((button) => button.value = "");
        readYet.checked = false;
        document.querySelector("#form-section").close();
    }
    
    e.preventDefault();
});

addNewBookButton.addEventListener("click", () => {
    document.querySelector("#form-section").showModal();
});
