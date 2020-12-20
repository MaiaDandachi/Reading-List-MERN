import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LIST_BOOKS_SUCCESS,
  USER_LIST_BOOKS_REQUEST,
  USER_LIST_BOOKS_FAIL,
  USER_LIST_BOOKS_RESET,
  USER_ADD_BOOK_REQUEST,
  USER_ADD_BOOK_FAIL,
  USER_ADD_BOOK_SUCCESS,
  USER_ADD_BOOK_RESET,
  USER_REMOVE_BOOK_REQUEST,
  USER_REMOVE_BOOK_SUCCESS,
  USER_REMOVE_BOOK_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case USER_LIST_BOOKS_REQUEST:
      return { loading: true };

    case USER_LIST_BOOKS_SUCCESS:
      return { loading: false, books: action.payload };

    case USER_LIST_BOOKS_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_BOOKS_RESET:
      return { books: [] };

    default:
      return state;
  }
};

export const userAddBookReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_BOOK_REQUEST:
      return { loading: true };

    case USER_ADD_BOOK_SUCCESS:
      return { loading: false, success: true };

    case USER_ADD_BOOK_FAIL:
      return { loading: false, error: action.payload };

    case USER_ADD_BOOK_RESET:
      return {};

    default:
      return state;
  }
};

export const userRemoveBookReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REMOVE_BOOK_REQUEST:
      return { loading: true };

    case USER_REMOVE_BOOK_SUCCESS:
      return { loading: false, success: true };

    case USER_REMOVE_BOOK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
