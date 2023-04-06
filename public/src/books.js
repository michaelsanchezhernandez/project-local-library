function findAuthorById(authors, id) {
  let matching = authors.find((match) => match.id === id);
  return matching;
}

function findBookById(books, id) {
  let matching = books.find((match) => match.id === id);
  return matching;
}

function partitionBooksByBorrowedStatus(books) { 
  //array for returned books
  let available = [];
  //array of unreturned books
  let unavailable = [];
  const result = [];

  books.forEach((book) => {
   const isBookReturned = book.borrows[0].returned;
   // if book is notreturned
   if (isBookReturned) { 
     unavailable.push(book);
     // if book is returned
   } else { 
     available.push(book);
   }
 });
 result.push(available);
 result.push(unavailable);

 return result; 
}


function getBorrowersForBook(book, accounts) {
  let result = [];

  book.borrows.forEach((borrow) => {
    // search for account ids that are included in borrow list 
    let account = accounts.find((person) => person.id === borrow.id);
    let found = account;
    // creating a key and value to add into the array
    found["returned"] = borrow.returned;
    //adding it to the array
    result.push(found);
  });
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
