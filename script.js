let myLibrary = [
    // {
    //     id: 1,
    //     title: 'Rani Tatt',
    //     author: 'Harman',
    //     pages: 128,
    //     read: true,
    // },
    // {
    //     id: 2,
    //     title: 'Maharani',
    //     author: 'Deewan Jarmani Das',
    //     pages: 200,
    //     read: false,
    // },
];

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
const addNewBookBtn = document.querySelector('.add-new-book');

form.style.display = 'none';
addNewBookBtn.addEventListener('click', () => {
    form.style.display = 'block';
    addNewBookBtn.style.display = 'none';
    error.textContent = 'All fields are required';
});

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
    books.textContent = '';
    let bookHTML = ``;
    myLibrary.forEach((book, index) => {
        book.id = index;
        bookHTML += `<div class="book" data-id="${index}">
            <h2 class="title">${book.title}</h2>
            <h3 class="author">${book.author}</h3>
            <div class="pages">${book.pages}</div>
            <div class="read">${
                book.read ? 'Finished reading' : 'Not read yet'
            }</div>
            <button class="remove">Remove</button>
        </div>`;
    });

    books.insertAdjacentHTML('afterbegin', bookHTML);

    removeBook();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (addBooktoLibrary() === false) return;

    error.style.cssText = 'color: #000; font-weight: normal';
    showBooks();
});

const removeBook = () => {
    const removeBookBtns = document.querySelectorAll('.remove');
    removeBookBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const bookToRemove = e.target.parentElement.dataset.id;
            myLibrary = [
                ...myLibrary.filter((book) => book.id !== +bookToRemove),
            ];

            showBooks();
        });
    });
};
