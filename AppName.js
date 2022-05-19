import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

function AppName() {
    return (
      <View style={styles.appName}>
        <Text style={styles.text}>STEDI Balance</Text>
      </View>
    );
  }

export default AppName

const styles = StyleSheet.create({
  appName: {
    paddingLeft:20,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 30
  }
})