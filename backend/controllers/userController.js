import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";

// @desc:    Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      books: user.books,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc:    Register a new user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    books: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      books: user.books,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc:    Get books of a user
// @route    GET /api/users/books
// @access   Private
const getUserBooks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      books: user.books,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc:    Add book of a user
// @route    POST /api/users/books
// @access   Private
const addUserBook = asyncHandler(async (req, res) => {
  const { title, author } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    const book = {
      title,
      author,
    };
    user.books.push(book);
    await user.save();

    res.status(201).json({ message: "Book Added" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc:    Delete book for a user
// @route    DELETE /api/users/books/:id
// @access   Private
const deleteUserBook = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.books = user.books.filter((book) => book._id != req.params.id);
    await user.save();

    res.status(201).json({ message: "Book Removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserBooks, addUserBook, deleteUserBook };
