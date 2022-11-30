import axios from "axios";

// ACTION TYPES
const SET_USER = "SET_USER";

// ACTION CREATORS
const setUser = (user) => ({ type: SET_USER, user });

// THUNK CREATORS
export const fetchUser = (userId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem("token");
    const { data: user } = await axios.get(`/api/users/${userId}`, {
      headers: { authorization: token },
    });
    console.log("USER in fetchUser", user);
    dispatch(setUser(user));
  } catch (error) {
    throw error;
  }
};

// REDUCER
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
