import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import {
  Dimensions,
  Platform,
  Keyboard,
  AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import styled, { css } from 'styled-components/native';
import uuidv1 from 'uuid/v1';

const { height, width } = Dimensions.get('window');

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
  margin-top: 50px;
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

const NewToDoTextInput = styled.TextInput`
  padding: 20px;
  border-bottom-color: #bbb;
  border-bottom-width: 1px;
  font-size: 20px;
`;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

const KeyboardAvoidingView = styled.KeyboardAvoidingView``;

const ScrollView = styled.ScrollView``;

const TitleText = styled.Text`
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 30px;
  color: white;
  font-weight: 200;
`;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newToDo: '',
      loadedToDos: false
    };
  }

  componentDidMount() {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
    
    return (
      <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
        <ContainerView>
          <StatusBar barStyle={'light-content'} />
          <TitleText>React-Native To Do</TitleText>
          <CardView>
            <NewToDoTextInput
              value={newToDo}
              placeholderTextColor={'#999'}
              placeholder={'New To Do'}
              returnKeyType={'done'}
              // ?????
              blurOnSubmit={true}
              onChangeText={this._controllNewToDo}
              onSubmitEditing={this._addToDo}
              />
            <KeyboardAvoidingView>
              <ScrollView />
            </KeyboardAvoidingView>
          </CardView>
        </ContainerView>
      </TouchableWithoutFeedback>
    );
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  _controllNewToDo = (text) => {
    this.setState({
      newToDo: text
    });
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    let newState;
    this._dismissKeyboard();

    // prevState = {1:1,2:2}
    this.setState(prevState => {
      const newToDoObject = {
        id: uuidv1(),
        isCompleted: false,
        text: newToDo
      };
      newState = {
        ...prevState,
        toDos: [...prevState.toDos, newToDoObject],
        newToDo: ''
      };
      const saveState = AsyncStorage.setItem(
        'toDos',
        JSON.stringify(newState.toDos)
      );
      return { ...newState };
    });
  };

  _loadToDos = async () => {
    try {
      const toDos = (await AsyncStorage.getItem("toDos")) || JSON.stringify([]);
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedToDos: true,
        toDos: parsedToDos
      });
    } catch (err) {
      console.log(err);
    }
  };
}
