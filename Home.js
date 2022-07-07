import React from 'react';
import {useState} from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icons from './Icons.js';
import Bar  from './Bar.js';
const Home = (props) => {
  const [userName, setUsername] = useState(props.userName);
  console.log(props.userName)
  return (
    <View>
      <Bar userName={props.userName} />
      <Icons />
    </View>
  );
};

export default Home;
