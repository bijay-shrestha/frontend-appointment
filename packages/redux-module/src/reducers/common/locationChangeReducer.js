import { LOCATION_CHANGE } from 'react-router-redux';

export const clearStateValues = (state = {}, action) => {
  switch(action.type) {
    case LOCATION_CHANGE: {
      return {};
    }
    default:
      return state;
  }
}