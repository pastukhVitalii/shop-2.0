import {authReducer, AuthStateType, setAppStatusAC, setIsLoggedInAC} from './auth-reducer';

let startState: AuthStateType;

beforeEach(() => {
  startState = {
    isLoggedIn: false,
    status: 'loading',
    user: {
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
    },
  };
});

test('user should be login/logout', () => {
  const endState = authReducer(startState, setIsLoggedInAC({ isLoggedIn: true}));

  expect(endState.isLoggedIn).toBeTruthy();
});
test('correct status should be set', () => {
  const endState = authReducer(startState, setAppStatusAC({ status: "succeeded"}));

  expect(endState.status).toBe('succeeded')
});