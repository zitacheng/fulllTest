import * as React from 'react';
import { render, screen, userEvent, fireEvent, waitFor } from '@testing-library/react-native';
import {expect, jest, test} from '@jest/globals';
import {UserProps} from '../types/AppTypes'
import App from '../App';

jest.useFakeTimers();

/**
 * A good place to start is having a tests that your component renders correctly.
 */

test('check snapshot', () => {
  const tree = render(<App />).toJSON();
  expect(tree).toMatchSnapshot();
})

test('renders all elements correctly', () => {
  render(<App />);

  expect(screen.getByRole('header', { name: 'Github Search' })).toBeOnTheScreen();
  expect(screen.getByPlaceholderText("Search Input")).toBeOnTheScreen();
});

test('testing input with 1 result', async () => {
  render(<App />);

  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ items: [{id: 1, avatar_url: '', login: '', checked: false}] }),
    })
  );

  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zita');
  await waitFor(() => expect(screen.queryAllByRole('none', {name: 'userCard'}).length).toBe(1))
});

test('testing input with 10 result', async () => {
  render(<App />);

  const items : any = []
  for (let i = 0; i < 10; i++) {
    items.push({id: i, avatar_url: '', login: '', checked: false})
  }

  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ items: items }),
    })
  );

  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zita');
  await waitFor(() => expect(screen.queryAllByRole('none', {name: 'userCard'}).length).toBe(2))
});

test('testing input with 1 result', async () => {
  render(<App />);

  const items : UserProps[] = []
  for (let i = 0; i < 1; i++) {
    items.push({id: i, avatar_url: '', login: '', checked: false})
  }

  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ items: items }),
    })
  );

  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zita');
  await waitFor(() => expect(screen.queryAllByRole('none', {name: 'userCard'}).length).toBe(1))
});

test('test pressing edit and checked button', async () => {
  render(<App />);

  const items : UserProps[] = []
  for (let i = 0; i < 5; i++) {
    items.push({id: i, avatar_url: '', login: '', checked: false})
  }

  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ items: items }),
    })
  );

  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zita');
  await waitFor(() => expect(screen.queryAllByRole('none', {name: 'userCard'}).length).toBe(2))

  expect(screen.queryAllByRole('image', {name: 'checkedImg'}).length).toBe(0)

  fireEvent.press(screen.getByRole('button', {name: 'editBtn'}));
  fireEvent.press(screen.getByRole('button', {name: 'selectAllButton'}));

  await waitFor(() => expect(screen.queryAllByRole('image', {name: 'checkedImg'}).length).toBe(2))
});


test('test deleting users', async () => {
  render(<App />);

  const items : UserProps[] = []
  for (let i = 0; i < 5; i++) {
    items.push({id: i, avatar_url: '', login: '', checked: false})
  }

  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ items: items }),
    })
  );

  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zita');
  await waitFor(() => expect(screen.queryAllByRole('none', {name: 'userCard'}).length).toBe(2))

  fireEvent.press(screen.getByRole('button', {name: 'editBtn'}));
  fireEvent.press(screen.getByRole('button', {name: 'selectAllButton'}));
  fireEvent.press(screen.getByRole('button', {name: 'deleteButton'}));

  await waitFor(() => expect(screen.queryAllByRole('none', {name: 'userCard'}).length).toBe(0))
  });
