import { Actions } from "react-native-router-flux";
import { ENTER_TO_MAIN, ENTER_TO_DETAILS } from "./types";

export const enterToMain = () => {
  return dispatch => {
    dispatch({ type: ENTER_TO_MAIN });
    Actions.main();
  };
};

export const enterToDetails = () => {
  return dispatch => {
    dispatch({ type: ENTER_TO_DETAILS });
    Actions.details();
  };
};
