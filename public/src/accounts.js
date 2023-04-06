function findAccountById(accounts, id) {
  let account = accounts.find((match) => match.id === id);
  return account;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((nameA,nameB) => nameA.name.last > nameB.name.last ? 1 : -1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let borrowed = 0;
  for (let i = 0; i< books.length; i++) {
    let title = books[i];
    for (let j = 0; j < title.borrows.length; j++) {
      if (account.id === title.borrows[j].id) {
        borrowed += 1;
      }
    }
  }
  return borrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  // final array of all books they own
  let booksPossessed = [];
  //array of borrowed book
  let match = [];

  books.forEach((item) => {
    let borrowed = item.borrows;
    const book = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      authorId: item.authorId,
      author: {},
      borrows: {},
    };
    const {id, title, genre, authorId, author, borrows} = book;

    borrowed.forEach((copy) => {
      if (copy.id === account.id && copy.returned === false) {
        booksPossessed.push(book);
        match.push(copy);
        book.author = authors.filter((auth) => auth.id === book.authorId)[0];
        book.borrows = match;
      }
    });
  });
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
