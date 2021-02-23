import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const storeData = async (data) => {
    try {
      AsyncStorage.clear();
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
      console.log("nevydalo");
    }
  };

  const getData = async () => {
    return await AsyncStorage.getItem("@storage_Key")
      .then((req) => (req != null ? JSON.parse(req) : []))
      // .then((json) => console.log(json))
      .catch((error) => console.log("error!"));
  };

  useEffect(() => {
    getData().then((data) => setTaskItems(data));
  }, [setTaskItems]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    const tmp = [...taskItems, task];
    setTaskItems(tmp);
    setTask(null);
    storeData(tmp);
  };

  const handleDeleteTask = (index) => {
    let tmpItems = [...taskItems];
    tmpItems.splice(index, 1);
    setTaskItems(tmpItems);
    storeData(tmpItems);
  };

  const renderItem = (data) => {
    return <Task text={data.item} />;
  };

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDeleteTask(data.index)}
      >
        <AntDesign name="delete" size={25} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>

      <SwipeListView
        style={styles.scrollContainer}
        data={taskItems}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-60}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        disableRightSwipe
      />

      <KeyboardAvoidingView style={styles.InputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Task"
          editable
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addView}>
            <Text style={styles.addText}>ADD</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8dce3",
  },
  title: {
    marginTop: 60,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    marginBottom: 80,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#d8dce3",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  deleteBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 75,
    right: 0,
  },

  InputContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 40,
    position: "absolute",
    bottom: 15,
  },
  textInput: {
    backgroundColor: "white",
    flex: 1,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 50,
    elevation: 2,
  },
  addView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginRight: 15,
    width: 80,
    height: 40,
    borderRadius: 5,
    elevation: 2,
  },
  addText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
