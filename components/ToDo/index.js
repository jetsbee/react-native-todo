import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const ContainerView = styled.View`
  border-bottom-color: #bbb;
  border-bottom-width: 1px;
  width: ${width - 50}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const toDoTextCSS = css`
  font-weight: 600;
  font-size: 20;
  margin-vertical: 20px;
  flex: 1;
`;

const completedTextCSS = css`
  color: #bbb;
  text-decoration-line: line-through;
`;

const uncompletedTextCSS = css`
  color: #353839;
`;

const ToDoText = styled.Text`
  ${toDoTextCSS}
  ${props => {
    if(props.completedStyle === true){
      return completedTextCSS;
    } else if(props.completedStyle === false){
      return uncompletedTextCSS;
    } else {
      console.log(props.completedStyle);
      return null;
    }
  }}
`;

const TouchableOpacity = styled.TouchableOpacity``;

const RadioView = styled.View`
  width: 30px;
  height: 30px;
  border-width: 3px;
  border-radius: 15;
  margin-right: 30px;
`;

const CompleteRadioView = styled(RadioView)`
  border-color: #bbb;
`;

const UncompleteRadioView = styled(RadioView)`
  border-color: #F23657;
`;

const ColumnView = styled.View`
  width: ${width / 2}px;
  flex-direction: row;
  align-items: center;
`;

const ActionsView = styled.View`
  flex-direction: row;
`;

const ActionContainerView = styled.View`
  margin-horizontal: 5px;
`;

const ActionText = styled.Text`
  font-size: 15px;
`;

const EditingTextInput = styled.TextInput`
  ${toDoTextCSS}
  width: ${width / 1.5};
  margin-vertical: 15px;
  padding-bottom: 5px;
  ${
    props => props.completedStyle
    ? completedTextCSS
    : uncompletedTextCSS
  }
`;

export default class ToDo extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  render() {
    const { id, text, isCompleted, uncomplete, complete } = this.props;
    const { isEditing, toDo } = this.state;
    return (
      <ContainerView>
        <ColumnView>
          <TouchableOpacity onPressOut={() => (isCompleted ? uncomplete(id) : complete(id))}>
            { isCompleted ? <CompleteRadioView /> : <UncompleteRadioView /> }
          </TouchableOpacity>
          { isEditing ?
            <EditingTextInput
              multiline={true}
              onChangeText={this._controlText}
              onEndEditing={this._endEditing}
              value={toDo}
              completedStyle={isCompleted}
            /> :
            <ToDoText completedStyle={isCompleted}>
              {text}
            </ToDoText>
          }
        </ColumnView>
        { isEditing ? (
            <ActionsView>
              <TouchableOpacity onPressOut={this._endEditing}>
                <ActionContainerView>
                  <ActionText>✅</ActionText>
                </ActionContainerView>
              </TouchableOpacity>
            </ActionsView>
          ) : (
            <ActionsView>
              <TouchableOpacity onPressOut={this._startEditing}>
                <ActionContainerView>
                  <ActionText>✏️</ActionText>
                </ActionContainerView>
              </TouchableOpacity>
              <TouchableOpacity>
                <ActionContainerView>
                  <ActionText>❌</ActionText>
                </ActionContainerView>
              </TouchableOpacity>
            </ActionsView>
          )
        }
      </ContainerView>
    );
  }

  _startEditing = () => {
    const { text } = this.props;
    this.setState({
      isEditing: true,
      toDo: text
    });
  };

  _controlText = text => {
    this.setState({
      toDo: text
    });
  };

  _endEditing = () => {
    const { toDo } = this.state;
    const { updateToDo, id } = this.props;
    updateToDo(id, toDo);
    this.setState({
      isEditing: false
    });
  };
}
