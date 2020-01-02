import { cleanup } from 'react-testing-library';
import { ADD_USER } from '../user';
import { DELETE_USER } from '../user';
import { addUser } from '../user';
import { deleteUser } from '../user';

afterEach(cleanup);

describe('Action user', () => {

  it('add user', () => {
    const user = { firsName: 'Polina', lastName: 'Kozlova', id: 1 };
    const expectedAction = {
      type: ADD_USER,
      user,
    };
    expect(addUser(user)).toEqual(expectedAction);
  });

  it('delete user', () => {
    const expectedAction = {
      type: DELETE_USER,
    };
    expect(deleteUser()).toEqual(expectedAction);
  });
});
