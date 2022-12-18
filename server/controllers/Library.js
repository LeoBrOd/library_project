import Library from "../model/LibraryModel.js";

export const addbook = async (req, res) => {
  const { bookId, userId, favorite } = req.body;
  try {
    await Library.create({
      bookId: bookId,
      userId: userId,
      favorite: favorite,
    });
    res.json({ msg: "Book added successfully!" });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      msg: e,
    });
  }
};

export const getbooks = async (req, res) => {
  try {
    const books = await Library.findAll({
      attributes: [
        "bookId",
        "review",
        "mark",
        "status",
        "favorite",
      ],
      where: { userId: req.headers.userid },
    });
    const favoriteBooks = await Library.findAll({
      attributes: [
        "bookId",
        "review",
        "mark",
        "status",
        "favorite",
      ],
      where: {
        userId: req.headers.userid,
        favorite: true,
      },
    });
    const readBook = await Library.findAll({
      attributes: [
        "bookId",
        "review",
        "mark",
        "status",
        "favorite",
      ],
      where: {
        userId: req.headers.userid,
        status: "read",
      },
    });
    const wantToReadBook = await Library.findAll({
      attributes: [
        "bookId",
        "review",
        "mark",
        "status",
        "favorite",
      ],
      where: {
        userId: req.headers.userid,
        status: "wantToRead",
      },
    });
    const currentlyReadingBook =
      await Library.findAll({
        attributes: [
          "bookId",
          "review",
          "mark",
          "status",
          "favorite",
        ],
        where: {
          userId: req.headers.userid,
          status: "currentlyReading",
        },
      });
    res.json([
      books,
      favoriteBooks,
      readBook,
      wantToReadBook,
      currentlyReadingBook,
    ]);
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .json({ msg: "List of books is empty" });
  }
};

export const checkinlibrarybooks = async (
  req,
  res
) => {
  try {
    const books = await Library.findAll({
      attributes: [
        "bookId",
        "favorite",
        "review",
        "mark",
        "status",
      ],
      where: {
        userId: req.headers.userid,
        bookId: req.headers.bookid,
      },
    });
    res.json(books);
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .json({ msg: "List of books is empty" });
  }
};

export const removebookfromlibrary = async (
  req,
  res
) => {
  try {
    await Library.destroy({
      where: {
        bookId: req.headers.bookid,
        userId: req.headers.userid,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const bookreview = async (req, res) => {
  const {
    review,
    mark,
    status,
    favorite,
    bookId,
    userId,
  } = req.body;
  try {
    await Library.update(
      {
        review: review,
        mark: mark,
        status: status,
        favorite: favorite,
      },
      {
        where: {
          bookId: bookId,
          userId: userId,
        },
      }
    );
    res.json({
      msg: "Review added successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      msg: e,
    });
  }
};
