import * as types from '../actions/types';

const initialState = {
  name: '',
  phone: '',
  shift: '',
  error: '',
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.EMPLOYEE_FORM_UPDATE:
      return {...state, [action.payload.prop]: action.payload.value};
    case types.EMPLOYEE_REQ_STARTED:
      return {...state, error: '', loading: true};
    case types.EMPLOYEE_REQ_SUCCESS:
      return {...state, ...initialState};
    case types.EMPLOYEE_REQ_FAILED:
      return {...state, error: action.payload, loading: false};
    default:
      return state
  }
}
