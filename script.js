let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
            <div class="read">${book.read ? 'Finished' : 'Not read yet'}</div>
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

  error.style.cssText = 'color: #000; font-weight: normal';
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
