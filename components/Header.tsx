import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type HeaderProps = {
    title: string
  }

export const Header = (props: HeaderProps) => {

  return (
    <View style={styles.header}>
        <Text style={styles.title}>{props?.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
