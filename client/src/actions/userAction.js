import jwt_decode from "jwt-decode";

import axios from "axios";

import {
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const login = (identifier, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    URL = process.env.REACT_APP_API_URL + `api/user/login`;
    const { data } = await axios.post(
      URL,
      {
        identifier: identifier,
        password: password,
      },
      config
    );
   console.log("data.token",data.token)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: jwt_decode(data.token),
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: { ...error },
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });

  dispatch({ type: USER_LIST_RESET });
};

export const register = (userData) => async (dispatch) => {
  URL = process.env.REACT_APP_API_URL + `api/user/registration`;
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(URL, userData, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    });
  }
};

export const updateUserInfo = (userData) => async (dispatch, getState) => {
  const { token } = JSON.parse(localStorage.getItem("userInfo"));
  const { id: userId } = jwt_decode(token);

  URL = process.env.REACT_APP_API_URL + `api/user/edit/${userId}`;
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(URL, userData, config);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error,
    });
  }
};

