import React, {SetStateAction} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

interface UserProps {
  login: string;
  id: number;
  avatar_url: string;
  checked: boolean;
}

type MenuProps = {
  edit: boolean;
  setEdit: React.Dispatch<SetStateAction<boolean>>;
  selectAll: boolean;
  setSelectAll: React.Dispatch<SetStateAction<boolean>>;
  users: UserProps[];
  setUsers: React.Dispatch<SetStateAction<UserProps[]>>;
};

export const Menu = (props: MenuProps) => {

  //Delete selected users
  const deleteUser = () => {
    if (props?.users != undefined) {
      const newArr: UserProps[] = [...props?.users];

      for (var i = newArr.length - 1; i >= 0; i--) {
        if (newArr[i].checked == true) {
          newArr.splice(i, 1);
        }
      }
      props?.setUsers(newArr);
      if (newArr.length <= 0 && props?.selectAll == true)
        props?.setSelectAll(false);
    }
  };

  //duplicate selected users
  const duplicateUser = () => {
    if (props?.users != undefined) {
      let newArr: UserProps[] = [...props?.users];
      let list = [];

      for (var i = 0; i < newArr.length; i++) {
        //Copy the user and create a random ID
        if (newArr[i].checked == true) {
          list.push({
            login: newArr[i].login + ' duplicate',
            id: Math.floor(Math.random() * 100000) + 1,
            avatar_url: newArr[i].avatar_url,
            checked: true,
          });
        }
      }
      if (list.length > 0) {
        newArr = newArr.concat(list);
        props?.setUsers(newArr);
      }
    }
  };

  //Select all the users
  const setAllCheck = () => {
    if (props?.users != undefined) {
      for (const element of props?.users) {
        element.checked = !props?.selectAll;
      }
    }
    props?.setSelectAll(!props?.selectAll);
  };

  //Count total users
  const countSelected = () => {
    return props?.users?.filter(x => x.checked == true).length;
  };

  return (
    <>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="editBtn"
        onPress={() => {
          props?.setEdit(!props?.edit);
        }}
        style={styles.smBtn}>
        <Text>{props?.edit == true ? 'Cancel' : 'Edit'}</Text>
      </TouchableOpacity>
      {props?.edit == true && (
        <View
          style={styles.menu}
          accessibilityRole="menu"
          accessibilityLabel="editMenu"
          accessible>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="selectAllButton"
            style={
              props?.selectAll == true ||
              (props?.users &&
                countSelected() == props?.users?.length &&
                props?.users?.length > 0)
                ? styles.checked
                : styles.uncheck
            }
            onPress={() => {
              setAllCheck();
            }}>
            {(props?.selectAll == true ||
              (props?.users != undefined &&
                countSelected() == props?.users?.length &&
                props?.users?.length > 0)) && <View style={styles.line} />}
          </TouchableOpacity>
          <Text style={styles.txt}>{countSelected()} Elements selected</Text>
          <TouchableOpacity
            style={styles.menuItem}
            accessibilityRole="button"
            accessibilityLabel="duplicateButton"
            onPress={() => {
              duplicateUser();
            }}>
            <Image
              style={styles.menuImg}
              source={require('../assets/copy.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            accessibilityRole="button"
            accessibilityLabel="deleteButton"
            onPress={() => {
              deleteUser();
            }}>
            <Image
              style={styles.menuImg}
              source={require('../assets/delete.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
    position: 'relative',
  },
  checked: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5,
    width: 20,
    height: 20,
    backgroundColor: '#00a1ff',
    position: 'relative',
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
    fontWeight: '500',
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
  },
});
