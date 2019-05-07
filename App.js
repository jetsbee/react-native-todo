import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import {
  Dimensions,
  Platform,
  Keyboard } from 'react-native';
import styled, { css } from 'styled-components/native';

const { height, width } = Dimensions.get("window");

const ContainerView = styled.View`
  flex: 1;
  background-color: #F23657;
  align-items: center;
  justify-content: center;
`;

const StatusBar = styled.StatusBar``;

const CardView = styled.View`
  flex: 1;
  width: ${width - 50};
  background-color: white;
  margin-top: 50;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
  ${Platform.select({
    ios: css`
      box-shadow: 0px -1px 5px rgba(50,50,50,0.5);
    `,
    android: {
      elevation: 3
    }
  })}
`;

const NewTodoTextInput = styled.TextInput`
  padding: 20px;
  border-bottom-color: #bbb;
  border-bottom-width: 1px;
  font-size: 20px;
`;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

export default class App extends Component {
  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
        <ContainerView>
          <StatusBar barStyle="light-content" />
          <CardView>
            <NewTodoTextInput />
          </CardView>
        </ContainerView>
      </TouchableWithoutFeedback>
    );
  }
}
