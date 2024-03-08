import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Alert,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';

import {Card} from './components/Card';
import {InputUser} from './components/InputUser';
import {Header} from './components/Header';
import {Menu} from './components/Menu';
import { UserProps } from './types/AppTypes';

// interface CustomResponseHeaders extends Headers {
//   map: {
//     'x-ratelimit-reset'?: string;
//     'x-ratelimit-remaining'?: string;
//     'x-ratelimit-used'?: string;
//   }
// }

// interface CustomResponse extends Response {
//   headers: CustomResponseHeaders;
// }

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [users, setUsers] = useState<UserProps[]>([]);

  //check the checkbox on card
  const setUserChecked = (user: UserProps) => {
    let idx = users?.findIndex((el) => el.id === user.id);
    
      if (idx != undefined  && idx >= 0 && users) {
        const newArr: UserProps[] = [...users];
        //Uncheck Select All
        if (user.checked == true && selectAll == true) 
        {
          setSelectAll(false);
        }
        if (newArr) {
          newArr[idx].checked = !user.checked;
          setUsers(newArr);
        }
    }
  }

  const getUser = (user: string) => {
    console.log("user ", user)
      fetch('https://api.github.com/search/users?q=' + user)
      .then((response) => {
        console.log("response", response.status)
        // console.log("response", response)
        // console.log("MAP", response.headers.map['x-ratelimit-reset'])
        // console.log("MAP", response.headers.map['x-ratelimit-remaining'])
        // console.log("MAP", response.headers.map['x-ratelimit-used'])
        if (response.status == 200)
          return response; 
        else
          throw response.status;
          // return response; 
      })
      .then(response => response.json())
      .then(json => {
        setUsers(json?.items);
        
        if (json.items?.length == 0)
          Alert.alert('Not found', 'No user has this username.');
      })
      .catch(error => {
        Alert.alert('Error on the request', 'You have exceed the rate limit, please try later');
        console.error(error);
      });
  };

  const getItem = (_data: unknown, index: number): UserProps => {
    return users[index];
  };

  const getItemCount = (_data: unknown) => users.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header title={'Github Search'} />
      <InputUser setUsers={setUsers} getUser={getUser} />
      <Menu
        edit={edit}
        setEdit={setEdit}
        users={users}
        setUsers={setUsers}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
      />
      <VirtualizedList
        initialNumToRender={2}
        renderItem={({item}) => (
          <Card user={item} edit={edit} setUserChecked={setUserChecked} />
        )}
        keyExtractor={item => item.id.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    flex: 1,
  },
});

export default App;
