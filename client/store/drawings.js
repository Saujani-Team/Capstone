import axios from "axios";
import history from "../history";

// ACTION TYPES
const GET_DRAWING = "GET_DRAWING";
const CREATE_DRAWING = "CREATE_DRAWING";
const UPDATE_DRAWING = "UPDATE_DRAWING";

// ACTION CREATORS
export const _getDrawing = (drawing) => {
  return {
    type: GET_DRAWING,
    drawing,
  };
};

export const _createDrawing = (drawing) => {
  return {
    type: CREATE_DRAWING,
    drawing,
  };
};

export const _updateDrawing = (drawing) => {
  return {
    type: UPDATE_DRAWING,
    drawing,
  };
};

// THUNKS
export const getDrawing = (id) => {
  return async (dispatch) => {
    try {
      const { data: drawing } = await axios.get(`/api/drawings/${id}`);
      dispatch(_getDrawing(drawing));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createDrawing = () => {
  return async (dispatch) => {
    try {
      const { data: newDrawing } = await axios.post(`/api/drawings`);
      dispatch(_createDrawing(newDrawing));
      history.push(`/draw/${newDrawing.id}`);
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateDrawing = (drawing) => {
  return async (dispatch) => {
    try {
      const { data: updatedDrawing } = await axios.put(
        `/api/drawings/${drawing.id}`,
        drawing
      );
      dispatch(_updateDrawing(updatedDrawing));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
export default function drawingsReducer(state = [], action) {
  switch (action.type) {
    case GET_DRAWING:
      return action.drawing;
    case CREATE_DRAWING:
      return action.drawing;
    case UPDATE_DRAWING:
      return action.drawing;
    default:
      return state;
  }
}
