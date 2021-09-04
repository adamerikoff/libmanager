


var name        = document.getElementById("name");
var date        = document.getElementById("date");
var ISBN        = document.getElementById("ISBN");
var author      = document.getElementById("author");
var description = document.getElementById("description");


window.onload = () => {
  document.getElementById("finish").addEventListener("click", () => {
    var book = {
      cover: '5.jpg',
      name: name.value,
      date: date.value,
      ISBN: ISBN.value,
      author: author.value,
      description: description.value
    }
    window.addApi.addBookApi(book);
  });
  document.getElementById("cancel").addEventListener("click", () => {
    window.addApi.exitBookApi();
  });
  document.getElementById("exit").addEventListener("click", () => {
    window.addApi.exitBookApi();
  });
};

