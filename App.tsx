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
  TouchableOpacity
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
  const [users, setUsers] = useState<[UserProps] | undefined>();


  const setUserChecked = (user: UserProps) => {
    console.log("useruser", user)
    let idx = users?.findIndex((el) => el.id === user.id);
    console.log("idx", idx)

      if (idx != undefined  && idx >= 0 && users) {
        const newArr: [UserProps] = [...users];
        if (newArr) {
          newArr[idx].checked = !user.checked;
          setUsers(newArr);
        }
    }
  }
  //402 rate limi api
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
        setUsers(undefined);
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  return (
    <SafeAreaView>
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
      <ScrollView style={styles.scroll} contentInsetAdjustmentBehavior="automatic">
        {
          users?.map((user: UserProps) => {
            return (
             <Card user={user} setUserChecked={setUserChecked} />
            )
         })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
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
  },
});

export default App;
