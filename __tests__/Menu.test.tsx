/**
 * @format
 */

import 'react-native';
import {Menu} from '../components/Menu';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import {expect, jest, test} from '@jest/globals';

test('renders Menu', () => {
  const setEditMock = jest.fn();
  const setSelectAllMock = jest.fn();
  const setUsersMock = jest.fn();
  render(<Menu edit={false} setEdit={setEditMock} selectAll={false} setSelectAll={setSelectAllMock} users={[]} setUsers={setUsersMock} />);
});

test('check edit mode button from false', async () => {
  const setEditMock = jest.fn();
  const setSelectAllMock = jest.fn();
  const setUsersMock = jest.fn();

  render(<Menu edit={false} setEdit={setEditMock} selectAll={false} setSelectAll={setSelectAllMock} users={[]} setUsers={setUsersMock} />);

  expect(screen.queryByRole('menu', {name: 'editMenu'})).toBeNull()
  fireEvent.press(screen.getByRole('button', {name: 'editBtn'}));
  await waitFor(() => expect(setEditMock).toHaveBeenCalledWith(true))
  // await waitFor(() => expect(setEditMock).toHaveBeenCalledWith(false))
});

test('check edit mode button from true', async () => {
  const setEditMock = jest.fn();
  const setSelectAllMock = jest.fn();
  const setUsersMock = jest.fn();

  render(<Menu edit={true} setEdit={setEditMock} selectAll={false} setSelectAll={setSelectAllMock} users={[]} setUsers={setUsersMock} />);

  expect(screen.queryByRole('menu', {name: 'editMenu'})).toBeVisible()
  fireEvent.press(screen.getByRole('button', {name: 'editBtn'}));
  await waitFor(() => expect(setEditMock).toHaveBeenCalledWith(false))
  // await waitFor(() => expect(setEditMock).toHaveBeenCalledWith(false))
});

test('check delete user', async () => {
  const setEditMock = jest.fn();
  const setSelectAllMock = jest.fn();
  const setUsersMock = jest.fn();

  render(<Menu edit={true} setEdit={setEditMock} selectAll={false} setSelectAll={setSelectAllMock} users={[{login: '', id: 1, avatar_url: '', checked: false}, {login: '', id: 2, avatar_url: '', checked: true}]} setUsers={setUsersMock} />);

  expect(screen.queryByRole('menu', {name: 'editMenu'})).toBeVisible()
  fireEvent.press(screen.getByRole('button', {name: 'deleteButton'}));
  await waitFor(() => expect(setUsersMock).toHaveBeenCalledWith([{"avatar_url": "", "checked": false, "id": 1, "login": ""}]))
});

test('check select all user', async () => {
  const setEditMock = jest.fn();
  const setSelectAllMock = jest.fn();
  const setUsersMock = jest.fn();

  render(<Menu edit={true} setEdit={setEditMock} selectAll={false} setSelectAll={setSelectAllMock} users={[{login: '', id: 1, avatar_url: '', checked: false}, {login: '', id: 2, avatar_url: '', checked: true}, {login: '', id: 3, avatar_url: '', checked: false}]} setUsers={setUsersMock} />);

  expect(screen.queryByRole('menu', {name: 'editMenu'})).toBeVisible();
  fireEvent.press(screen.getByRole('button', {name: 'selectAllButton'}));
  await waitFor(() => expect(setSelectAllMock).toHaveBeenCalledWith(true));
});

test('check duplicate users', async () => {
  const setEditMock = jest.fn();
  const setSelectAllMock = jest.fn();
  const setUsersMock = jest.fn();

  render(<Menu edit={true} setEdit={setEditMock} selectAll={false} setSelectAll={setSelectAllMock} users={[{login: '', id: 1, avatar_url: '', checked: true}, {login: '', id: 2, avatar_url: '', checked: true}, {login: '', id: 3, avatar_url: '', checked: false}]} setUsers={setUsersMock} />);

  expect(screen.queryByRole('menu', {name: 'editMenu'})).toBeVisible();
  fireEvent.press(screen.getByRole('button', {name: 'duplicateButton'}));
  await waitFor(() => expect(setUsersMock).toHaveBeenCalled());
  // @ts-ignore
  expect(setUsersMock.mock.calls[0][0].length).toBe(5)
});