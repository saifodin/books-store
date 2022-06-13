var addBookForm = document.forms.addBook;

var cardHTML = document.querySelector(".templateCard")

//#region - elements selectors
var bookNameInp = addBookForm.bookName;
var bookTypeInp = addBookForm.bookType;
var urlImgInp = addBookForm.urlImg;
var priceInp = addBookForm.price;
var languageInp = addBookForm.language;
var authorNameInp = addBookForm.authorName;
var authorEmailInp = addBookForm.authorEmail;
var addBookButton = addBookForm.addBookButton;

var editOrSave = document.getElementById("editOrSave");
var deleteOrCancel = document.getElementById("deleteOrCancel");
//#endregion

var booksExample = [
  {
    name: "Atomic Habits",
    type: "Social Psychology",
    urlImg: "https://m.media-amazon.com/images/I/513Y5o-DYtL.jpg",
    price: 192,
    language: "English",
    author: {
      name: "James Clear",
      email: "james.clear@gmail.com"
    }
  },
  {
    name: "A Promised Land",
    type: "Biographies",
    urlImg: "https://m.media-amazon.com/images/I/41N0ibSKKyL.jpg",
    price: 216,
    language: "English",
    author: {
      name: "Barack Obama",
      email: "ObamaBarack@gmail.com"
    }
  },
  {
    name: "Will",
    type: "Biographies",
    urlImg: "https://m.media-amazon.com/images/I/61gS6EWmWwL.jpg",
    price: 311,
    language: "English",
    author: {
      name: "Will Smith",
      email: "willSmith@gmail.com"
    }
  },
  {
    name: "Cracking the Coding Interview",
    type: "Job Interviewing",
    urlImg: "https://images-na.ssl-images-amazon.com/images/I/41oYsXjLvZL._SX348_BO1,204,203,200_.jpg",
    price: 230,
    language: "English",
    author: {
      name: "Gayle Laakmann McDowell",
      email: "gayle.l@gmail.com"
    }
  },
  {
    name: "Introduction to Algorithms",
    type: "Computer Programming",
    urlImg: "https://images-na.ssl-images-amazon.com/images/I/41T0iBxY8FL._SX440_BO1,204,203,200_.jpg",
    price: 219,
    language: "English",
    author: {
      name: "The MIT Press",
      email: "mitPress@mit.com"
    }
  },
  {
    name: "Head First Design Patterns",
    type: "Computer Programming",
    urlImg: "https://images-na.ssl-images-amazon.com/images/I/51rmlxN57sL._SX258_BO1,204,203,200_.jpg",
    price: 211,
    language: "English",
    author: {
      name: "O’Reilly Media",
      email: "support@oreilly.com"
    }
  },
  {
    name: "When We Believed in Mermaids",
    type: "Psychological Fiction",
    urlImg: "https://images-na.ssl-images-amazon.com/images/I/41upRgW3ppL._SX331_BO1,204,203,200_.jpg",
    price: 120,
    language: "English",
    author: {
      name: "Barbara O'Neal",
      email: "barbaraO@gmail.com"
    }
  },
  {
    name: "Clean Code",
    type: "Computer Programming",
    urlImg: "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
    price: 317,
    language: "English",
    author: {
      name: "Robert C. Martin",
      email: "roberyc.m@gmail.com"
    }
  },

]
var allBooks = [...booksExample];
var isEditEnd = 1;
var isEmailValid = 0, isImgValid = 0, isPriceValid = 0, isAllNonEmpty = isAllInputsNonEmpty();
// * for empty books and start adding box form zero, uncomment this
// var allBooks = [];
generateCards();

addBookButton.addEventListener("click", function (e) {
  e.preventDefault();
  isAllNonEmpty = isAllInputsNonEmpty();
  if (isEmailValid && isImgValid && isPriceValid && isAllNonEmpty) {//validation
    var author = new Author(authorNameInp.value, authorEmailInp.value);
    var book = new Book(
      bookNameInp.value,
      bookTypeInp.value,
      urlImgInp.value,
      parseInt(priceInp.value),
      languageInp.value,
      author
    );
    allBooks.push(book);
    generateCards();
  }
  else {
    makeAllInputsFocus();
  }
})

function Book(_name, _type, _urlImg, _price, _language, _author) {
  this.name = _name;
  this.type = _type;
  this.urlImg = _urlImg;
  this.price = _price
  this.language = _language;
  this.author = _author;

  // var myContent = this.content
  // Object.defineProperties(this, {
  //   "content": {
  //     get: function () {
  //       return myContent;
  //     },
  //     set: function () {
  //       throw ("can't set value in content")
  //     }
  //   }
  // });
}

function Author(_name, _email) {
  this.name = _name;
  this.email = _email;
}

function generateCards() {
  document.querySelector(".booksCards .cards").innerHTML = "";
  for (let i in allBooks) {
    var newCardHTML = cardHTML.cloneNode(true)
    newCardHTML.classList.remove("templateCard");
    newCardHTML.classList.add(`card${i}`)
    newCardHTML.querySelector(".bookName span:first-of-type").textContent = allBooks[i].name; //bookName
    newCardHTML.querySelector(".bookImg img").src = allBooks[i].urlImg //img
    newCardHTML.querySelector(".bookName span:last-of-type").textContent = allBooks[i].type //bookType
    newCardHTML.querySelector(".price span:first-of-type").textContent = `${allBooks[i].price} EGP` //price 330 EGP
    newCardHTML.querySelector(".price span:last-of-type").textContent = allBooks[i].language //language
    newCardHTML.querySelector(".author span:first-of-type").textContent = allBooks[i].author.name //author name
    newCardHTML.querySelector(".author span:last-of-type").textContent = allBooks[i].author.email //author email
    document.querySelector(".booksCards .cards").appendChild(newCardHTML);
  }
  eventsAfterCreateCards();
  if (isEmailValid && isImgValid && isPriceValid && isAllNonEmpty) {
    clearForm();
  }
}

//* remove and edit
function eventsAfterCreateCards() {

  //#region - change black img to colorful img when hover
  document.querySelectorAll('#editOrSave img').forEach(item => {
    item.addEventListener('mouseenter', e => {
      if (e.target.alt === 'edit') {
        e.target.src = "imgs/pencil-hover.svg";
      }
      else {
        e.target.src = "imgs/save.svg";
      }
    })
  })
  document.querySelectorAll('#editOrSave img').forEach(item => {
    item.addEventListener('mouseleave', e => {
      if (e.target.alt === 'edit') {
        e.target.src = "imgs/pencil.svg";
      }
      else {
        e.target.src = "imgs/save-hover.svg";
      }
    })
  })
  document.querySelectorAll('#deleteOrCancel img').forEach(item => {
    item.addEventListener('mouseenter', e => {
      if (e.target.alt === 'delete') {
        e.target.src = "imgs/garbage-hover.svg";
      }
      else {
        e.target.src = "imgs/undo.svg";
      }
    })
  })
  document.querySelectorAll('#deleteOrCancel img').forEach(item => {
    item.addEventListener('mouseleave', e => {
      if (e.target.alt === 'delete') {
        e.target.src = "imgs/garbage.svg";
      }
      else {
        e.target.src = "imgs/undo-hover.svg";
      }
    })
  })
  //#endregion

  //* remove book
  document.querySelectorAll('#deleteOrCancel img').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.alt === 'delete' && isEditEnd) {
        var cardIndex = item.parentNode.parentNode.parentNode.classList[1].split("card")[1]
        allBooks.splice(cardIndex, 1);
        generateCards();
      }
    })
  })

  //* edit book information
  document.querySelectorAll('#editOrSave img').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.alt === 'edit' && isEditEnd) { //second one -> for can't edit another card when this card not end editing
        isEditEnd = 0;
        //change edit img to save
        var thisCard = item.parentNode.parentNode.parentNode
        var cardIndex = thisCard.classList[1].split("card")[1]
        e.target.src = "imgs/save-hover.svg";
        e.target.alt = "save";

        //change remove img to cancel
        var deleteImg = item.parentNode.parentNode.querySelector("#deleteOrCancel img");
        deleteImg.src = "imgs/undo-hover.svg"
        deleteImg.alt = 'cancel'

        //change card background color, put new title in form, disable addBookButton
        thisCard.style.backgroundColor = "#e8910d33";
        addBookButton.style.display = "none";
        var editTitle = document.querySelector(".editTitle").cloneNode(true)
        editTitle.classList.remove("templateTitle");
        addBookForm.prepend(editTitle)

        clearForm();
        isEmailValid = 1;
        isImgValid = 1;
        isPriceValid = 1;
        isAllNonEmpty = isAllInputsNonEmpty();

        // put card value in form
        bookNameInp.value = allBooks[cardIndex].name;
        bookTypeInp.value = allBooks[cardIndex].type;
        urlImgInp.value = allBooks[cardIndex].urlImg;
        priceInp.value = allBooks[cardIndex].price;
        languageInp.value = allBooks[cardIndex].language;
        authorNameInp.value = allBooks[cardIndex].author.name;
        authorEmailInp.value = allBooks[cardIndex].author.email;

        // change card info when form value change
        addBookForm.addEventListener("keyup", function () {
          thisCard.querySelector(".bookName span:first-of-type").textContent = bookNameInp.value; //bookName
          thisCard.querySelector(".bookImg img").src = urlImgInp.value; //img
          thisCard.querySelector(".bookName span:last-of-type").textContent = bookTypeInp.value;  //bookType
          thisCard.querySelector(".price span:first-of-type").textContent = `${priceInp.value} EGP`; //price 330 EGP
          thisCard.querySelector(".price span:last-of-type").textContent = languageInp.value;  //language
          thisCard.querySelector(".author span:first-of-type").textContent = authorNameInp.value; //author name
          thisCard.querySelector(".author span:last-of-type").textContent = authorEmailInp.value; //author email
        })

        // click save button
        document.querySelector("#editOrSave img[alt='save']").addEventListener("click", function () {
          isAllNonEmpty = isAllInputsNonEmpty();
          // console.log("isEmailValid",isEmailValid)
          // console.log("isImgValid",isImgValid)
          // console.log("isPriceValid",isPriceValid)
          // console.log("isAllNonEmpty",isAllNonEmpty)
          if (isEmailValid && isImgValid && isPriceValid && isAllNonEmpty) {//validation
            allBooks[cardIndex].name = bookNameInp.value;
            allBooks[cardIndex].type = bookTypeInp.value;
            allBooks[cardIndex].urlImg = urlImgInp.value;
            allBooks[cardIndex].price = priceInp.value;
            allBooks[cardIndex].language = languageInp.value;
            allBooks[cardIndex].author.name = authorNameInp.value;
            allBooks[cardIndex].author.email = authorEmailInp.value;
            generateCards();
            clearForm();
            editTitle.remove();
            addBookButton.style.display = "block";
            isEditEnd = 1
          }
        })

        // click cancel button
        document.querySelector("#deleteOrCancel img[alt='cancel']").addEventListener("click", function () {
          generateCards();
          clearForm();
          editTitle.remove();
          addBookButton.style.display = "block";
          isEditEnd = 1
        })
      }
    })
  })
}

function clearForm() {
  bookNameInp.value = "";
  bookTypeInp.value = "";
  urlImgInp.value = "";
  priceInp.value = "";
  languageInp.value = "";
  authorNameInp.value = "";
  authorEmailInp.value = "";
  isEmailValid = 0;
  isImgValid = 0;
  isPriceValid = 0;
  isAllNonEmpty = isAllInputsNonEmpty();
  document.querySelectorAll('input').forEach(item => {
    item.classList.remove("inValid")
  })
}

//* validation on form
document.querySelectorAll('input').forEach(item => {
  item.addEventListener('focusout', e => {
    if (e.target.type === "email") {
      if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)) {
        addInvalid();
        isEmailValid = 0;
        console.log("email inValid")
      }
    }
    else if (e.target.name === "urlImg") {
      if (e.target.value.match(/\.(jpeg|jpg|gif|png)$/) === null) {
        addInvalid();
        isImgValid = 0;
      }
    }
    else if (e.target.name === "price") {
      if (!e.target.value.match(/^[0-9]+$/)) {
        addInvalid();
        isPriceValid = 0;
      }
    }
    else if (e.target.value === "") {
      addInvalid();
    }

    function addInvalid() {
      e.target.classList.add("inValid")
      removeErrorImmediately();
    }
  })
})

function removeErrorImmediately() {
  document.querySelectorAll('input').forEach(item => {
    item.addEventListener('keyup', e => {
      if (e.target.type === "email") {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)) {
          e.target.classList.remove("inValid");
          isEmailValid = 1;
          console.log("Email Valid")
        }
      }
      else if (e.target.name === "price") {
        if (e.target.value.match(/^[0-9]+$/)) {
          e.target.classList.remove("inValid");
          isPriceValid = 1;
        }
      }
      else if (e.target.name === "urlImg") {
        if (e.target.value.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
          e.target.classList.remove("inValid");
          isImgValid = 1;
        }
      }
      else if (e.target.value !== "") {
        e.target.classList.remove("inValid")
      }
    })
  })
}

function isAllInputsNonEmpty() {
  if (bookNameInp.value && bookTypeInp.value && urlImgInp.value && priceInp.value && languageInp.value && authorNameInp.value && authorEmailInp.value) {
    return 1;
  }
  return 0;
}

function makeAllInputsFocus() {
  document.querySelectorAll('input').forEach(item => {
    item.focus();
  })
  addBookButton.focus();
}