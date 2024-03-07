import React, {useEffect, SetStateAction} from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface UserProps {
    login: string,
    id: number,
    avatar_url: string,
    checked: boolean,
  }
  
interface InputProps {
    setUsers: React.Dispatch<SetStateAction<UserProps[]>>,
    getUser: Function,
    search: string
    setSearch: React.Dispatch<SetStateAction<string>>
  }

export const InputUser = (props: InputProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props?.search) {
        props?.getUser(props?.search);
      }
      else
        props?.setUsers([]);
    }, 500)

    return () => clearTimeout(timer)
  }, [props?.search])

  return (
    <TextInput
      style={styles.input}
      onChangeText={(val) => props?.setSearch(val)}
      placeholder='Search Input'
      autoCapitalize={'none'}
      autoCorrect={false}
      value={props?.search}
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
