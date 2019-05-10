import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

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
  margin-horizontal: 20px;
`;

const CompletedText = styled(BasicText)`
  color: #bbb;
  text-decoration-line: line-through;
`;

const UncompletedText = styled(Text)`
  color: #353839;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const RadioView = styled.View`
  width: 30px;
  height: 30px;
  border-width: 3px;
  border-radius: 15;
  margin-left: 30px;
`;

const CompleteRadioView = styled(RadioView)`
  border-color: #bbb;
`;

const UncompleteRadioView = styled(RadioView)`
  border-color: #F23657;
`;

export default class ToDo extends Component {
  static propTypes = {};
  render() {
    const { id, text, isCompleted, uncomplete, complete } = this.props;
    return (
      <ContainerView>
        {/* { isCompleted ? <CompletedText>{text}</CompletedText> : <UncompletedText>{text}</UncompletedText> } */}
        <Text
          style={[
            styles.text,
            isCompleted ? styles.completedText : styles.uncompletedText
          ]}
        >
          {text}
        </Text>
        <TouchableOpacity onPressOut={() => (isCompleted ? uncomplete(id) : complete(id))}>
        {/* { isCompleted ? <CompleteRadioView /> : <UncompleteRadioView /> } */}
          <View
            style={[
              styles.radio,
              isCompleted ? styles.radioComplete : styles.radioUncomplete
            ]}
          />
        </TouchableOpacity>
      </ContainerView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: width - 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 20
  },
  uncompletedText: { color: "#353839" },
  completedText: { color: "#bbb", textDecorationLine: "line-through" },
  radio: {
    width: 30,
    height: 30,
    borderWidth: 3,
    borderRadius: 15,
    marginLeft: 30
  },
  radioComplete: {
    borderColor: "#bbb"
  },
  radioUncomplete: {
    borderColor: "#F23657"
  }
});