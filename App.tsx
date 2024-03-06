import React, {useState} from 'react';
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

interface userProps {
  login: string,
  id: number,
  avatar_url: string
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
  const [users, setUsers] = useState<[userProps]>();

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
        if (response.status == 200)
          return response; 
        else
          throw response.status;

      })
      .then(response => response.json())
      .then(json => {
        // console.log("jsonnFWWFFWEEFEFW ", json)
        // console.log("ITEM ", json.status)
        // console.log("ITEM ", json.items)
         setUsers(json?.items)
      })
      .catch(error => {
        Alert.alert('Error on the request', 'You have exceed the rate limit, please try later');
        console.error(error);
      });
  };

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
        onChangeText={(val) => {setSearch(val);getUser(val)}}
        placeholder='Search Input'
        value={search}
      />
      <ScrollView style={styles.scroll} contentInsetAdjustmentBehavior="automatic">
        {
          users?.map((user: userProps) => {
            return (
              <View style={styles.card}>
                <View style={styles.cardHead}>
                  {/* <View style={styles.imgBg} /> */}
                  <Image
                    style={styles.imgBg}
                    source={{
                      uri: user.avatar_url,
                    }}
                  />
                  <Text style={styles.headTxt}>{user.id}</Text>
                  <Text style={styles.headTxt}>{user.login}</Text>
                </View>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnTxt}>View Profile</Text>
                </TouchableOpacity>
              </View>
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
  card: {
    width: '100%',
    height: 300,
    backgroundColor: '#d5d5d5',
    borderRadius: 30,
    shadowColor: '#888888',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    marginBottom: 16,
    flexDirection: 'column',
  },
  scroll: {
    padding: 16,
  },
  cardHead: {
    alignItems: 'center',
    paddingTop: 16,
  },
  btn: {
    backgroundColor: '#04a1fe',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
    padding: 16,
    width: '70%',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 10,
  },
  imgBg: {
    backgroundColor: '#0dc9b7',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  btnTxt: {
    fontSize: 16
  },
  headTxt: {
    fontSize: 16,
    fontWeight: '600'
  }
});

export default App;
