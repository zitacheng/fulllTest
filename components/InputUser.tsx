import React, {useEffect, SetStateAction, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {UserProps} from '../types/AppTypes';

type InputProps = {
  setUsers: React.Dispatch<SetStateAction<UserProps[]>>;
  getUser: Function;
};

export const InputUser = (props: InputProps) => {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        props?.getUser(search);
      } else props?.setUsers([]);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <TextInput
      style={styles.input}
      onChangeText={val => setSearch(val)}
      placeholder="Search Input"
      autoCapitalize={'none'}
      autoCorrect={false}
      value={search}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#d5d5d5',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 24,
    marginTop: 24,
    fontSize: 20,
    padding: 10,
    borderRadius: 6,
  },
});
