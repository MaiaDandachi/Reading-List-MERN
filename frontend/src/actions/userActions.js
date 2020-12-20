import axios from "axios";
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
  USER_REMOVE_BOOK_REQUEST,
  USER_REMOVE_BOOK_SUCCESS,
  USER_REMOVE_BOOK_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//-----------------------------------------------
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_BOOKS_RESET });
};

//-----------------------------------------------
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//-----------------------------------------------
export const listBooks = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_BOOKS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/books`, config);
    dispatch({
      type: USER_LIST_BOOKS_SUCCESS,
      payload: data.books,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_BOOKS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//-----------------------------------------------
export const addBooks = (title, author) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_BOOK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/users/books`,
      { title, author },
      config
    );
    dispatch({
      type: USER_ADD_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ADD_BOOK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//-----------------------------------------------
export const removeBooks = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REMOVE_BOOK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/books/${bookId}`, config);
    dispatch({
      type: USER_REMOVE_BOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REMOVE_BOOK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
