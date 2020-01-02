import { cleanup } from 'react-testing-library';
import { addUser, deleteUser } from '../../actions/user';
import userReducer from '../user';

afterEach(cleanup);

describe('Reduser user', () => {
  it('add user', () => {
    const user = { firsName: 'Polina', lastName: 'Kozlova', id: 1 };
    expect(
      userReducer(
        {},
        addUser(user),
      ),
    ).toEqual(user);
  });

  it('delete user', () => {
    expect(
      userReducer(
        { firsName: 'Polina', lastName: 'Kozlova', id: 1 },
        deleteUser(),
      ),
    ).toEqual({});
  });
});