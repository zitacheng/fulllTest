/**
 * @format
 */

import 'react-native';
import React from 'react';
import {InputUser} from '../components/InputUser';
import { render, screen, userEvent, fireEvent, waitFor } from '@testing-library/react-native';
import {expect, jest, test} from '@jest/globals';

test('test calling getuser only once on user input', async () => {
  const getUserMock = jest.fn();
  const setUsersMock = jest.fn();

  render(<InputUser getUser={getUserMock} setUsers={setUsersMock} />);

  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zi');
  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zit');
  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zita');
  await waitFor(() => expect(getUserMock).not.toHaveBeenCalledWith('zi'))
  await waitFor(() => expect(getUserMock).not.toHaveBeenCalledWith('zit'))
  await waitFor(() => expect(getUserMock).toHaveBeenCalledWith('zita'))
});

test('test calling getuser with pause in input', async () => {
  const getUserMock = jest.fn();
  const setUsersMock = jest.fn();

  render(<InputUser getUser={getUserMock} setUsers={setUsersMock} />);

  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zi');
  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zit');
  await new Promise((r) => setTimeout(r, 1000));
  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zita');
  await waitFor(() => expect(getUserMock).not.toHaveBeenCalledWith('zi'))
  await waitFor(() => expect(getUserMock).toHaveBeenCalledWith('zit'))
  await waitFor(() => expect(getUserMock).toHaveBeenCalledWith('zita'))
});


test('test clearing users when no more input', async () => {
  const getUserMock = jest.fn();
  const setUsersMock = jest.fn();

  render(<InputUser getUser={getUserMock} setUsers={setUsersMock} />);

  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', 'zita');
  fireEvent(screen.getByPlaceholderText('Search Input'), 'onChangeText', '');
  await waitFor(() => expect(setUsersMock).toHaveBeenCalledWith([]))
});

