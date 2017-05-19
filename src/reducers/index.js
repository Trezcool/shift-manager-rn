import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer'
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeesReducer from './EmployeesReducer';
import NavReducer from './NavReducer';

export default combineReducers({
  nav: NavReducer,
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeesReducer,
})
