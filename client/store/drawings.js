import axios from "axios";
import history from "../history";

// ACTION TYPES
const CREATE_DRAWING = "CREATE_DRAWING";

// ACTION CREATORS
export const _createDrawing = (drawing) => {
  return {
    type: CREATE_DRAWING,
    drawing,
  };
};

// THUNKS
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

// REDUCER
export default function drawingsReducer(state = [], action) {
  switch (action.type) {
    case CREATE_DRAWING:
      return action.drawing;
    default:
      return state;
  }
}
