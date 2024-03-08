/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Header} from '../components/Header';
import { render, screen, userEvent } from '@testing-library/react-native';
import {expect, jest, test} from '@jest/globals';

test('check header title rendering', () => {
  render(<Header title="Hello world" />);

  expect(screen.getByRole('header', { name: 'Hello world' })).toBeOnTheScreen();
});