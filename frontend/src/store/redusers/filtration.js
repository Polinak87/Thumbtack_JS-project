import { ADD_FILTRATIONTYPE } from '../actions/filtration';
import { DELETE_FILTRATIONTYPE } from '../actions/filtration';
import { DELETE_USER } from '../actions/user';

const filtration = (state = { filtrationType: 'all' }, action) => {
  switch (action.type) {
    case ADD_FILTRATIONTYPE:
      return (
        {
          ...action.filtrationType,
        });
    case DELETE_FILTRATIONTYPE:
      return { filtrationType: 'all' };
    case DELETE_USER:
      return {};
    default:
      return state
  }
}

export default filtration;