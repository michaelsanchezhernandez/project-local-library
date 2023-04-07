function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let booksCheckedOut = books.filter((item) => 
    item.borrows.filter((borrowed) => 
      borrowed.returned === false).length > 0
  );
  return booksCheckedOut.length;
}

function organizeFive(contents) {
  return contents.sort((a,b) => b.count - a.count).slice(0,5);
}

function helper(books) {
  let countObj = {}
  books.forEach(aBook => {
    if (countObj[aBook.genre] != null) {
      countObj[aBook.genre]++
    } else {
      countObj[aBook.genre] = 1
    }
  }) 
  return countObj
}

function getMostCommonGenres(books) {
  let countObj = helper(books)
  let countArray = []
  for (const [key, value] of Object.entries(countObj)) {
    countArray.push({
      name: key,
      count: value,
    })
  }
  return organizeFive(countArray);
}

function getMostPopularBooks(books) {
  let popBooks = [];
  books.reduce((acc, book) => {
    popBooks.push ({ name: book.title, count: book.borrows.length});
  }, [])
  return organizeFive(popBooks);
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
   let person = {
    name: `${author.name.first} ${author.name.last}`,
    count: 0
   };
   books.forEach((book) => {
    if (book.authorId === author.id) {
     person.count += book.borrows.length;
    }
   });
   result.push(person);
  });
  return organizeFive(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
