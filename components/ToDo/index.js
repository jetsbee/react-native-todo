import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const View = styled.View``;
const Text = styled.Text``;

// export default class ToDo extends Component {
//   propTypes = {};
//   render() {
//     const { toDo } = this.props;
//     return (
//       <View>
//         <Text>{toDo.text}</Text>
//       </View>
//     );
//   }
// }

export default ToDo = ({toDo}) => {
  return (
    <View>
      <Text>{toDo.text}</Text>
    </View>
  );
}

ToDo.propTypes = {
  toDo: PropTypes.string.isRequired
};
