import * as types from '../actions/types';

const initialState = {
  employees: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.EMPLOYEES_FETCH_REQ_STARTED:
      return {...state, loading: true};
    case types.EMPLOYEES_FETCH_SUCCESS:
      return {...state, employees: action.payload, loading: false};
    default:
      return state
  }
}
