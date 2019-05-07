import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

export default class App extends React.Component {
  render() {
    return (
      <ContainerView>
        <Text>Open up App.js to start working on your app!</Text>
      </ContainerView>
    );
  }
}

const ContainerView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;

