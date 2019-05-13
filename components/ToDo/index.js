import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
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

const BasicText = styled.Text`
  font-weight: 600;
  font-size: 20;
  margin-vertical: 20px;
  flex: 1;
`;

const CompletedText = styled(BasicText)`
  color: #bbb;
  text-decoration-line: line-through;
`;

const UncompletedText = styled(BasicText)`
  color: #353839;
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

export default class ToDo extends Component {
  static propTypes = {};
  render() {
    const { id, text, isCompleted, uncomplete, complete } = this.props;
    return (
      <ContainerView>
        <ColumnView>
          <TouchableOpacity onPressOut={() => (isCompleted ? uncomplete(id) : complete(id))}>
            { isCompleted ? <CompleteRadioView /> : <UncompleteRadioView /> }
          </TouchableOpacity>
          { isCompleted ? <CompletedText>{text}</CompletedText> : <UncompletedText>{text}</UncompletedText> }
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
