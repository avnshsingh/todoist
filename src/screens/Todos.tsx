import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addTodoItem, getTodoItems} from '../utils/helper';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {};

type TodoItem = {
  id: string;
  title: string;
  done: boolean;
};
const Todos = (props: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [todoItems, setTodoItems] = React.useState<TodoItem[]>([]);
  const [newTodoItem, setNewTodoItem] = React.useState('');
  useEffect(() => {
    getTodoItems(0, 10).then(items => setTodoItems(items));
  }, []);
  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>TODO</Text>
          <Icon name="camera" size={30} color="#4F8EF7" />
        </View>
        <View style={styles.sectionContainer}>
          {todoItems.map((item: any) => (
            <View key={item.id} style={styles.todoItem}>
              <Text style={styles.sectionDescription}>{item.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <TextInput
            style={styles.sectionDescription}
            placeholder="Add your todo item"
            onChange={e => setNewTodoItem(e.nativeEvent.text)}
          />
          <Button
            title="Add"
            onPress={() => {
              addTodoItem(newTodoItem).then(() => {
                getTodoItems(0, 10).then(items => {
                  setTodoItems(items);
                });
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  todoItem: {
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    padding: 8,
    borderBottomColor: 'gray',
  },
});
