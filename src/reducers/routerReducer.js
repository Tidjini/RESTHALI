import { ENTER_TO_MAIN } from '../actions/types';

const INITIAL_STATE = {
  start: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case ENTER_TO_MAIN:
      return { ...state, start: 'start' };
    default:
      return state;
  }
};
