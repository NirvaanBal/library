let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const form = document.querySelector('form');
const error = document.querySelector('.error');
const books = document.querySelector('.books');
const addNewBookBtn = document.querySelector('.add-new-book');

form.style.display = 'none';
addNewBookBtn.addEventListener('click', () => {
  form.style.display = 'grid';
  addNewBookBtn.style.display = 'none';
  error.textContent = 'All fields are required';
});

function addBooktoLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  let read = document.querySelector('input[name="read"]:checked').value;

  if (!title || !author || !pages || !read) {
    error.style.cssText = 'color: crimson; font-weight: bold';
    return false;
  }

  if (read === 'yes') read = true;
  else read = false;

  const book = new Book(title, author, +pages, read);
  myLibrary.push(book);

  form.reset();
  form.style.display = 'none';
  addNewBookBtn.style.display = 'block';
  error.textContent = '';

  return book;
}

const showBooks = function () {
  books.textContent = '';
  let bookHTML = ``;
  myLibrary.forEach((book, index) => {
    book.id = index;
    bookHTML += `<div class="book" data-id="${index}">
            <h2 class="title">${book.title}</h2>
            <p class="author">Writer: ${book.author}</p>
            <p class="pages">Pages: ${book.pages}</p>
            <p class="read">${book.read ? 'Finished' : 'Not read yet'}</p>
            <button class="remove">Remove</button>
            <button class="status">${
              book.read ? 'Reading' : 'Finished'
            }</button>
        </div>`;
  });

  books.insertAdjacentHTML('afterbegin', bookHTML);

  removeBook();
  updateStatus();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (addBooktoLibrary() === false) return;
  showBooks();
});

const removeBook = () => {
  const removeBookBtns = document.querySelectorAll('.remove');
  removeBookBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const bookToRemove = e.target.parentElement.dataset.id;
      myLibrary = [...myLibrary.filter((book) => book.id !== +bookToRemove)];

      showBooks();
    });
  });
};

const updateStatus = () => {
  const statusBookBtns = document.querySelectorAll('.status');
  statusBookBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const bookToUpdate = e.target.parentElement.dataset.id;
      myLibrary = [
        ...myLibrary.map((book) => {
          if (book.id === +bookToUpdate) {
            book.read = !book.read;
            return book;
          } else return book;
        }),
      ];

      showBooks();
    });
  });
};
