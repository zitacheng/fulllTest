import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  VirtualizedList
} from 'react-native';

import {Card} from './components/Card';

interface UserProps {
  login: string,
  id: number,
  avatar_url: string,
  checked: boolean
}

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
  const [search, setSearch] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [edit, setEdit] = useState(false);
  const [users, setUsers] = useState<UserProps[]>([]);


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

  const deleteUser = () => {
    if (users != undefined) {
      const newArr: UserProps[] = [...users];

      for (var i = newArr.length - 1; i >= 0; i--) {
        if (newArr[i].checked == true) { 
            newArr.splice(i, 1);
        }
      }
      setUsers(newArr);
      if (newArr.length <= 0 && selectAll == true)
        setSelectAll(false);
    }
  }

  const duplicateUser = () => {
    if (users != undefined) {
      let newArr: UserProps[] = [...users];
      let list = [];

      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i].checked == true) { 
            list.push({login: newArr[i].login + ' duplicate', id: newArr[i].id, avatar_url: newArr[i].avatar_url, checked: true});
        }
      }
      if (list.length > 0) {
        newArr = newArr.concat(list);
        setUsers(newArr);
      }
    }
  }

  const setAllCheck = () => {
    if (users != undefined) {
      for (const element of users) {
        element.checked = !selectAll;
      }
    }
    setSelectAll(!selectAll);
  }

  const countSelected = () => {
    return (users?.filter(x => x.checked  == true).length)
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
        // if (response.status == 200)
        //   return response; 
        // else
        //   throw response.status;
          return response; 


      })
      .then(response => response.json())
      .then(json => {
        // console.log("jsonnFWWFFWEEFEFW ", json)
        // console.log("ITEM ", json.status)
        // console.log("ITEM ", json.items);
        setUsers(json?.items);
        if (json.items?.length == 0 && search)
          Alert.alert('Not found', 'No user has this username.');
      })
      .catch(error => {
        Alert.alert('Error on the request', 'You have exceed the rate limit, please try later');
        console.error(error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        getUser(search);
      }
      else
        setUsers([]);
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const getItem = (_data: unknown, index: number) : UserProps => {
      return (users[index])
  }

  const getItemCount = (_data: unknown) => users.length;


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Github Search</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(val) => {setSearch(val);}}
        placeholder='Search Input'
        autoCapitalize={'none'}
        auto-correct={false}
        value={search}
      />
      <TouchableOpacity onPress={() => {setEdit(!edit)}} style={styles.smBtn}>
        <Text>{edit == true ? 'Cancel' : 'Edit'}</Text>
      </TouchableOpacity>
      {
        edit == true &&
        <View style={styles.menu}>
          <TouchableOpacity style={(selectAll == true || (users && countSelected() == users?.length && users?.length > 0)) ? styles.checked : styles.uncheck} onPress={() => {
            setAllCheck();
          }}> 
          {
          (selectAll == true ||  (users != undefined && countSelected() == users?.length && users?.length > 0)) &&
              <View style={styles.line}  />
          }
          </TouchableOpacity>
          <Text style={styles.txt}>{countSelected()} Elements selected</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => {duplicateUser()}}>
            <Image
                style={styles.menuImg}
                source={require('./assets/copy.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => {deleteUser()}}>
            <Image
                style={styles.menuImg}
                source={require('./assets/delete.png')}
            />
          </TouchableOpacity>
        </View>
      }
      <VirtualizedList
        initialNumToRender={2}
        renderItem={({item}) =>  <Card user={item} edit={edit} setUserChecked={setUserChecked} />}
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
  header: {
    height: 64,
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#929292',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    fontWeight: '500'
  },
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
  scroll: {
    padding: 16,
    flex: 1,
  },
  menu: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  uncheck: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5,
    width: 20,
    height: 20,
    position: 'relative'
  },
  checked: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5,
    width: 20,
    height: 20,
    backgroundColor: '#00a1ff',
    position: 'relative'
  },
  menuItem: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  menuImg: {
    width: '100%',
    height: '100%',
  },
  txt: {
    marginRight: 'auto',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500'
  },
  line: {
    position: 'absolute',
    height: 3,
    width: 16,
    backgroundColor: 'black',
    top: 6,
    left: 0,
  },
  smBtn: {
    backgroundColor: '#04a1fe',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 18,
    marginLeft: 16,
    marginBottom: 5,
  }
});

export default App;
