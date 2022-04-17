let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // this.info = function () {
    //     return `${this.title} by ${this.author}, ${this.pages} pages, ${
    //         this.read ? 'finished' : 'not read yet'
    //     }`;
    // };
}

const form = document.querySelector('form');
const error = document.querySelector('.error');
const books = document.querySelector('.books');

function addBooktoLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    let read = document.querySelector('input[name="read"]:checked').value;

    if (!title || !author || !pages || !read) {
        error.style.cssText = 'color: red; font-weight: bold';
        return false;
    }

    if (read === 'yes') read = true;
    else read = false;

    const book = new Book(title, author, +pages, read);
    myLibrary.push(book);

    form.reset();

    return book;
}

const showBooks = function () {
    books.textContent = 'Adding...';
    let bookHTML = ``;
    myLibrary.forEach((book) => {
        bookHTML += `<div class="book">
            <h2 class="title">${book.title}</h2>
            <h3 class="author">${book.author}</h3>
            <div class="pages">${book.pages}</div>
            <div class="read">${
                book.read ? 'Finished reading' : 'Not read yet'
            }</div>
        </div>`;
    });

    books.insertAdjacentHTML('afterbegin', bookHTML);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (addBooktoLibrary() === false) return;

    error.style.cssText = 'color: #000; font-weight: normal';
    showBooks();
});
