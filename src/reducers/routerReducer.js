import { ENTER_TO_MAIN, ENTER_TO_DETAILS } from "../actions/types";

const INITIAL_STATE = {
  start: "",
  details: ""
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case ENTER_TO_MAIN:
      return { ...state, start: "start" };
    case ENTER_TO_DETAILS:
      return { ...state, details: "details" };
    default:
      return state;
  }
};
