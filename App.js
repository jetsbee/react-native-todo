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
import ToDo from './components/ToDo';

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
  font-size: 25px;
`;

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

const KeyboardAvoidingView = styled.KeyboardAvoidingView``;

const ScrollView = styled.ScrollView.attrs(
  (p) => ({
    contentContainerStyle: css`
      flex: 1;
      align-items: center;
    `
  })
)``;

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
      loadedToDos: false,
      toDos: {}
    };
  }

  componentDidMount() {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }

    return (
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
            autoCorrect={false}
            />
          <ScrollView>
            {Object.values(toDos).sort((a,b) => a.createdAt < b.createdAt).map(toDo => (
              <ToDo
                key={toDo.id}
                {...toDo}
                uncomplete={this._uncompleteToDo}
                complete={this._completeToDo}
                updateToDo={this._updateToDo}
                deleteToDo={this._deleteToDo}
              />
            ))}
          </ScrollView>
        </CardView>
      </ContainerView>
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

  _saveState = newToDos => {
    const saveState = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };

  _addToDo = () => {
    const { newToDo } = this.state;

    if (newToDo !== '') {
      this.setState = ({
        newToDo: ''
      });

      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: { id: ID, isCompleted: false, text: newToDo, createdAt: Date.now() }
        };
        const newState = {
          ...prevState,
          toDos: { ...prevState.toDos, ...newToDoObject },
        };
        this._saveState(newState.toDos);
        return { ...newState };
      });
    }
  };

  _loadToDos = async () => {
    try {
      const toDos = (await AsyncStorage.getItem('toDos')) || JSON.stringify({});
      // **flush data
      // await AsyncStorage.removeItem('toDos');
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedToDos: true,
        toDos: parsedToDos
      });
    } catch (err) {
      console.log(err);
    }
  };

  _uncompleteToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      this._saveState(newState.toDos);
      return { ...newState };
    });
  };

  _completeToDo = (id) => {
    this.setState(prevState =>{
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      this._saveState(newState.toDos);
      return { ...newState };
    });
  };

  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text
          }
        }
      };
      this._saveState(newState.toDos);
      return { ...newState };
    });
  };

  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveState(newState.toDos);
      return { ...newState };
    });
  };
}
