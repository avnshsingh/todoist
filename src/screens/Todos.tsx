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
import auth from '@react-native-firebase/auth';
import useNavigation from '../hooks/useNavigation';
import Toast from 'react-native-toast-message';
import useToast from '../hooks/useToast';
import {Theme, useTheme} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {ThemeColors, TodoItem} from '../utils/types';

type Props = {};

const Todos = (props: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {navigate} = useNavigation();

  const {colors} = useTheme();
  const styles = createStyles(colors);

  const {data} = useQuery({
    queryKey: ['todos'],
    queryFn: async () => getTodoItems(0, 10),
  });

  console.log('data', data);

  const [todoItems, setTodoItems] = React.useState<TodoItem[]>([]);
  const [newTodoItem, setNewTodoItem] = React.useState('');

  useEffect(() => {
    getTodoItems(0, 10).then(items => setTodoItems(items));
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: colors.background}}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>TODOs</Text>
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
            style={[
              styles.sectionDescription,
              {
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 20,
                backgroundColor: colors.card,
                marginBottom: 20,
              },
            ]}
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

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: colors.text,
    },
    highlight: {
      fontWeight: '700',
      color: colors.primary,
    },
    todoItem: {
      fontSize: 18,
      fontWeight: '400',
      borderBottomWidth: 1,
      padding: 8,
      borderBottomColor: 'gray',
      color: colors.text,
    },
  });
