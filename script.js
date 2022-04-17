let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${
            this.read ? 'finished' : 'not read yet'
        }`;
    };
}

const form = document.querySelector('form');
const error = document.querySelector('.error');
function addBooktoLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    let read = document.querySelector('input[name="read"]:checked').value;

    if (!title || !author || !pages || !read) {
        error.style.cssText = 'color: red; font-weight: bold';
        return;
    }

    if (read === 'yes') read = true;
    else read = false;

    const book = new Book(title, author, +pages, read);
    myLibrary.push(book);

    return book;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBooktoLibrary();
});
