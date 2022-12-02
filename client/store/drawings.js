import axios from "axios";
import history from "../history";

// ACTION TYPES
const GET_DRAWING = "GET_DRAWING";
const CREATE_DRAWING = "CREATE_DRAWING";
const UPDATE_DRAWING = "UPDATE_DRAWING";
const DELETE_DRAWING = "DELETE_DRAWING";

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

export const _deleteDrawing = (drawing) => {
  return {
    type: DELETE_DRAWING,
    drawing,
  };
};

// THUNKS
export const getDrawing = (uuid) => {
  return async (dispatch) => {
    try {
      const { data: drawing } = await axios.get(`/api/drawings/${uuid}`);
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
      history.push(`/draw/${newDrawing.uuid}`);
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

export const deleteDrawing = (drawing) => {
  console.log("delete thunk drawing", drawing);
  return async (dispatch) => {
    try {
      const { data: deletedDrawing } = await axios.delete(
        `/api/drawings/${drawing.id}`,
        drawing
      );
      dispatch(_deleteDrawing(deletedDrawing));
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
    case DELETE_DRAWING:
      return state;
    default:
      return state;
  }
}
