import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';

interface UserProps {
    login: string,
    id: number,
    avatar_url: string,
    checked: boolean,
  }
interface CardProps {
    user: UserProps,
    setUserChecked: Function
  }

export const Card = (props: CardProps) => {
  return (
    <View style={styles.card}>
        <View style={styles.cardHead}>
            <Image
            style={styles.imgBg}
            source={{
                uri: props?.user?.avatar_url,
            }}
            />
            <Text style={styles.headTxt}>{props?.user?.id}</Text>
            <Text style={styles.headTxt}>{props?.user?.login}</Text>
        </View>
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={props?.user?.checked == true ? styles.check : styles.uncheck} onPress={() => {
                props?.setUserChecked(props.user);
            }}>
            {
            props?.user?.checked == true &&
                <Image
                    style={styles.checkImg}
                    source={require('../assets/check.png')}
                />
            }
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
        position: 'relative'
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
    },
        check: {
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        position: 'absolute',
        top: 20,
        left: 20,
        width: 20,
        height: 20,
        backgroundColor: '#00a1ff'
    },
    uncheck: {
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        position: 'absolute',
        top: 20,
        left: 20,
        width: 20,
        height: 20,
    },
    checkImg: {
        width: 18,
        height: 18,
    }
});
