import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [userInput, setUserInput] = useState('');
  useEffect(() => {
    const getTodos = async () => {
      if (JSON.parse(await AsyncStorage.getItem('todos')) === null) {
        setTodos([]);
      } else {
        setTodos(JSON.parse(await AsyncStorage.getItem('todos')));
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    if (userInput[0] !== undefined) {
      setTodos([...todos, {name: userInput, checked: false}]);
    }
    setUserInput('');
  };

  const saveTodos = async () => {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  };

  const deleteTodo = eachTodo => {
    setTodos(todos.filter(todo => todo.name !== eachTodo.name));
  };

  const markComplete = eachTodo => {
    const markedTodos = todos.map(each => {
      if (each.name === eachTodo.name) {
        return {...each, checked: !each.checked};
      }
      return each;
    });
    setTodos(markedTodos);
  };

  return (
    <SafeAreaView style={styles.todosbgcontainer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.todosheading}>Todos</Text>
            <Text style={styles.createtaskheading}>Create Task</Text>
            <TextInput
              placeholder="What needs to be done?"
              style={styles.todouserinput}
              onChangeText={text => setUserInput(text)}
              value={userInput}
            />
            <TouchableOpacity style={styles.button} onPress={addTodo}>
              <Text style={styles.buttontext}>Add</Text>
            </TouchableOpacity>
            <Text style={styles.todoitemsheading}>My Task</Text>
            <ScrollView style={styles.todoitemscontainer}>
              {todos.map((todo, index) => {
                return (
                  <View style={styles.todoitemcontainer} key={index}>
                    {todo.checked ? (
                      <Text
                        style={styles.checkbox1}
                        onPress={() => markComplete(todo)}>
                        &#9989;
                      </Text>
                    ) : (
                      <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => markComplete(todo)}
                      />
                    )}

                    <View style={styles.labelcontainer}>
                      {todo.checked ? (
                        <Text style={[styles.completed, styles.labeltext]}>
                          {todo.name}
                        </Text>
                      ) : (
                        <Text style={styles.labeltext}>{todo.name}</Text>
                      )}
                      <Icon
                        name="delete"
                        size={15}
                        color="red"
                        style={styles.icon}
                        onPress={() => deleteTodo(todo)}
                      />
                    </View>
                  </View>
                );
              })}
              <TouchableOpacity style={styles.button} onPress={saveTodos}>
                <Text style={styles.buttontext}>Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  todosbgcontainer: {
    backgroundColor: '#f9fbfe',
    height: '100%',
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 6,
  },
  checkbox1: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,

    marginTop: 6,
    paddingLeft: Platform.OS === 'ios' ? 2 : 4,
    paddingTop: 2,
  },
  container: {
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  todouserinput: {
    backgroundColor: 'white',
    width: '100',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4e7eb',
    borderRadius: 10,
    marginTop: 10,
    padding: 15,
  },

  todosheading: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 46,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 20,
  },

  createtaskheading: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: '700',
  },

  createtaskheadingsubpart: {
    fontFamily: 'Roboto',
    fontSize: 32,
    fontWeight: '500',
  },

  todoitemsheading: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: '700',
  },

  todoitemsheadingsubpart: {
    fontFamily: 'Roboto',
    fontSize: 32,
    fontWeight: '500',
  },

  todoitemscontainer: {
    margin: 0,
    padding: 0,
  },

  todoitemcontainer: {
    marginTop: 15,
    flexDirection: 'row',
  },

  button: {
    color: 'white',
    backgroundColor: '#4c63b6',
    fontFamily: 'Roboto',
    fontSize: 18,
    borderWidth: 0,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 50,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    width: 70,
  },
  buttontext: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: '500',
  },

  labelcontainer: {
    backgroundColor: '#e6f6ff',
    width: '90%',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderColor: '#096f92',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
  },

  checkboxinput: {
    width: 20,
    height: 20,
    marginTop: 12,
    marginRight: 12,
  },

  checkboxlabel: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    width: '82%',
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },

  deleteiconcontainer: {
    textAlign: 'right',
    width: 18,
    height: 18,
  },

  deleteicon: {
    padding: 15,
  },
  labeltext: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    width: '82%',
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
  icon: {
    marginRight: 20,
    marginTop: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
});
export default App;
