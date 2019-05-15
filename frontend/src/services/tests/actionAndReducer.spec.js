import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import {ADD_USER} from '../../store/actions/user';
import {DELETE_USER} from '../../store/actions/user';
import {addUser} from '../../store/actions/user';
import {deleteUser} from '../../store/actions/user';
import {ADD_USER_THINGS} from '../../store/actions/userThings';

import userReducer from '../../store/redusers/user';
import userThingsReducer from '../../store/redusers/userThings';

afterEach(cleanup);

it('Action Creator test 1', () => {
  const user = {firsName: 'Polina', lastName: 'Kozlova', id: 1};
  const expectedAction = {
    type: ADD_USER,
    user,
  }
  expect(addUser(user)).toEqual(expectedAction);
});

it('Action Creator test 2', () => {
  const expectedAction = {
    type: DELETE_USER,
  }
  expect(deleteUser()).toEqual(expectedAction);
});

it('Reducer test 1', () => {
  const user = {firsName: 'Polina', lastName: 'Kozlova', id: 1};
  expect(userReducer({}, {
    type: ADD_USER,
    user,
  })).toEqual(user);
});

it('Reducer test 2', () => {
  expect(userReducer({}, {
    type: DELETE_USER,
  })).toEqual({});
});

it('Reducer test 3', () => {
  const thing1 = {id: 1, name: 'spring dress1', description: 'light', category: 'dresses' };
  const thing2 = {id: 2, name: 'spring dress2', description: 'light', category: 'dresses' };
  const thing3 = {id: 3, name: 'spring dress3', description: 'light', category: 'dresses' };

  let userThings = new Map ();
  userThings.set(thing1.id, thing1);
  userThings.set(thing2.id, thing2);
  userThings.set(thing3.id, thing3);

  const defaultState = new Map ();

  expect(userThingsReducer(defaultState, {
    type: ADD_USER_THINGS,
    userThings,
  })).toEqual(userThings);
});

it('Reducer test 4', () => {
  const thing1 = {id: 1, name: 'spring dress1', description: 'light', category: 'dresses' };
  const thing2 = {id: 2, name: 'spring dress2', description: 'light', category: 'dresses' };
  const thing3 = {id: 3, name: 'spring dress3', description: 'light', category: 'dresses' };

  let userThings = new Map ();
  userThings.set(thing2.id, thing2);
  userThings.set(thing3.id, thing3);

  const defaultState = new Map ();
  defaultState.set(thing1.id, thing1);
  
  expect(userThingsReducer(defaultState, {
    type: ADD_USER_THINGS,
    userThings,
  })).toEqual(userThings);
});

