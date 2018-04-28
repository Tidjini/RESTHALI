import { Actions } from 'react-native-router-flux';
import { ENTER_TO_MAIN } from './types';

export const enterToMain = () => {
  return dispatch => {
    dispatch({ type: ENTER_TO_MAIN });
    Actions.main();
  };
};
