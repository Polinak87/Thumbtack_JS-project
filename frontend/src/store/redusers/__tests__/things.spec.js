import { cleanup } from 'react-testing-library';
import userThingsReducer from '../things';
import { addUserThings } from '../../actions/things';

afterEach(cleanup);

describe('Reduser things', () => {
  it('Set userThings in empty state', () => {
    const thing1 = { id: 1, name: 'spring dress1', description: 'light', category: 'dresses' };
    const thing2 = { id: 2, name: 'spring dress2', description: 'light', category: 'dresses' };
    const thing3 = { id: 3, name: 'spring dress3', description: 'light', category: 'dresses' };

    let userThings = new Map();
    userThings.set(thing1.id, thing1);
    userThings.set(thing2.id, thing2);
    userThings.set(thing3.id, thing3);

    const defaultState = new Map();

    expect(
      userThingsReducer(defaultState, addUserThings(userThings)).userThings,
    ).toEqual(userThings);
  });

  it('Set userThings in not empty state', () => {
    const thing1 = { id: 1, name: 'spring dress1', description: 'light', category: 'dresses' };
    const thing2 = { id: 2, name: 'spring dress2', description: 'light', category: 'dresses' };
    const thing3 = { id: 3, name: 'spring dress3', description: 'light', category: 'dresses' };

    const defaultState = new Map();
    defaultState.set(thing1.id, thing1);

    let userThings = new Map();
    userThings.set(thing2.id, thing2);
    userThings.set(thing3.id, thing3);

    expect(
        userThingsReducer(defaultState, addUserThings(userThings)).userThings,
    ).toEqual(userThings);
  });
});
