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

const basicTextCSS = css`
  font-weight: 600;
  font-size: 20;
  margin-vertical: 20px;
  flex: 1;
`;

const BasicText = styled.Text`
  ${basicTextCSS}
`;

const CompletedTextCSS = css`
  color: #bbb;
  text-decoration-line: line-through;
`;

const CompletedText = styled(BasicText)`
  ${CompletedTextCSS}
`;

const UncompletedTextCSS = css`
  color: #353839;
`;

const UncompletedText = styled(BasicText)`
  ${UncompletedTextCSS}
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
  ${basicTextCSS}
  width: ${width / 1.5};
  margin-vertical: 15px;
  padding-bottom: 5px;
  ${
    props => props.completedStyle
    ? CompletedTextCSS
    : UncompletedTextCSS
  }
`;

export default class ToDo extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      isEditing: true
    };
  }

  render() {
    const { id, text, isCompleted, uncomplete, complete } = this.props;
    const { isEditing } = this.state;
    return (
      <ContainerView>
        <ColumnView>
          <TouchableOpacity onPressOut={() => (isCompleted ? uncomplete(id) : complete(id))}>
            { isCompleted ? <CompleteRadioView /> : <UncompleteRadioView /> }
          </TouchableOpacity>
          { isEditing ?
            <EditingTextInput
              multiline={true}
              onChangeText={(text)=>{console.log(text)}}
              onEndEditing={()=>{console.log('END EDITING!!')}}
              value={text}
              completedStyle={isCompleted}
            /> :
            isCompleted ? <CompletedText>{text}</CompletedText> : <UncompletedText>{text}</UncompletedText> }
        </ColumnView>
        <ActionsView>
          <TouchableOpacity>
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
      </ContainerView>
    );
  }
}
