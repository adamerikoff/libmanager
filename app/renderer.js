var BOOKS         = [];
var SELECTED_BOOK = null;

window.onload = window.api.getDataAPI().then( data => {
  updateBookList(data);
  BOOKS = data;
});



function updateBookList(books) {
  const book_list = document.getElementById("book_list");
  for (let i = 0; i < books.length; i++) {
    book_list.appendChild(createListItem(books[i]));
  }
}

function createListItem(book) {
  let p      = document.createElement("p");
  let li     = document.createElement("li");
  let div    = document.createElement("div");
  let strong = document.createElement("strong");


  let name   = document.createTextNode(book.name);
  let author = document.createTextNode(book.author);

  div.classList.add("media-body")
  li.classList.add("list-group-item");
  
  strong.appendChild(name);
  p.appendChild(author);
  div.appendChild(strong);
  div.appendChild(p);
  li.appendChild(div);

  li.id = book.id;

  li.addEventListener("click", () => {
    previewBook(book.id, SELECTED_BOOK);
  });
  
  return li;  
}

function previewBook(id, selected) {
  if (selected != null) {
    document.getElementById(selected).classList.remove("lib-manager-list-group-item-selected");
  }
  document.getElementById(id).classList.add("lib-manager-list-group-item-selected");

  SELECTED_BOOK = id;

  let book = getBook(BOOKS,id);
  
  document.getElementById("cover").src = "./covers/" + book.cover;

  document.getElementById("name").innerHTML        = book.name;
  document.getElementById("date").innerHTML        = "Published: ".concat(book.date);
  document.getElementById("ISBN").innerHTML        = "ISBN: ".concat(book.ISBN);
  document.getElementById("author").innerHTML      = book.author;
  document.getElementById("description").innerHTML = book.description;
}

function getBook(books, id) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) return books[i];    
  }
}