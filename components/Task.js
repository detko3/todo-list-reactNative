import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
      <View style={styles.rightCircle}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    flexDirection: "row",
    elevation: 2,
  },
  text: {
    flexWrap: "wrap",
    maxWidth: "90%",
  },
  rightCircle: {
    borderRadius: 50,
    borderWidth: 2,
    width: 15,
    height: 15,
  },
});

export default Task;
