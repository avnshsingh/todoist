import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  Switch,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getTodoItems,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem,
} from '../utils/helper';
import {ThemeColors, TodoItem} from '../utils/types';
import Loader from '../components/Loader';
import useToast from '../hooks/useToast';
import {z} from 'zod';
import {todoSchema} from '../utils/zodSchema';

const ITEMS_PER_PAGE = 11;

const Todos = () => {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const {successMessage, errorMessage} = useToast();

  const [newTodoItem, setNewTodoItem] = useState('');
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: async ({pageParam = 0}) => {
      const data = await getTodoItems(pageParam, ITEMS_PER_PAGE);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ITEMS_PER_PAGE ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  const addMutation = useMutation({
    mutationFn: addTodoItem,
    onSuccess: () => {
      refetch();
      setNewTodoItem('');
      successMessage('Todo added successfully');
    },
    onError: () => {
      errorMessage('Failed to add todo, Please try again');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodoItem,
    onSuccess: () => {
      refetch();
      setUpdateModalVisible(false);
      setSelectedTodo(null);
      successMessage('Task updated successfully');
    },
    onError: () => {
      errorMessage('Failed to update todo, Please try again');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodoItem,
    onSuccess: () => {
      refetch();
      successMessage('Task deleted successfully');
    },
    onError: () => {
      errorMessage('Failed to delete todo, Please try again');
    },
  });

  const handleAddTodo = () => {
    if (newTodoItem) {
      addMutation.mutate(newTodoItem);
    } else {
      errorMessage('Please provide a correct todo name');
    }
  };

  const handleUpdateTodo = () => {
    const parsed = todoSchema.safeParse(selectedTodo);
    if (parsed.success && selectedTodo) {
      updateMutation.mutate(selectedTodo);
    } else {
      errorMessage('Please provide a correct todo name');
    }
  };

  const handleDeleteTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

  // flatten the data
  const todoList = data?.pages.flatMap(page => page) ?? [];

  if (isLoading) {
    return <Loader message="Loading tasks" />;
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Something went wrong while loading tasks. Please try again later
        </Text>
      </View>
    );
  }

  if (addMutation.isPending) {
    return <Loader message="Adding task..." />;
  }

  if (updateMutation.isPending) {
    return <Loader message="Updating task..." />;
  }

  if (deleteMutation.isPending) {
    return <Loader message="Deleting task..." />;
  }
  const renderTodoItem = ({item}: {item: TodoItem}) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={() => {
          setSelectedTodo(item);
          setUpdateModalVisible(true);
        }}
        style={styles.todoTextContainer}>
        <Text style={[styles.todoText, item.done && styles.todoDone]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
        <Icon name="delete" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={colors.text === '#000000' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TODOs</Text>
      </View>
      <FlatList
        data={todoList}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <View>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Loading more tasks...</Text>
            </View>
          ) : null
        }
      />
      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add your todo item"
          value={newTodoItem}
          onChangeText={setNewTodoItem}
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Icon name="add" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUpdateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Todo</Text>
            <View style={styles.modalCompleted}>
              <Text style={styles.completedText}>Mark Completed</Text>
              <Switch
                trackColor={{true: colors.primary, false: colors.card}}
                onValueChange={isDone => {
                  setSelectedTodo(prev =>
                    prev ? {...prev, done: isDone} : null,
                  );
                }}
                value={selectedTodo?.done}
              />
            </View>
            <TextInput
              style={styles.modalInput}
              value={selectedTodo?.title}
              onChangeText={text =>
                setSelectedTodo(prev =>
                  prev ? {...prev, title: text, done: true} : null,
                )
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setUpdateModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.updateButton]}
                onPress={handleUpdateTodo}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      fontFamily: 'FiraCode-Regular',
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    todoTextContainer: {
      flex: 1,
    },
    todoText: {
      fontSize: 18,
      color: colors.text,
    },
    todoDone: {
      textDecorationLine: 'line-through',
      color: colors.text + '80',
    },
    addTodoContainer: {
      flexDirection: 'row',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 4,
      paddingHorizontal: 8,
      marginRight: 8,
      color: colors.text,
    },
    addButton: {
      backgroundColor: colors.primary,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      textAlign: 'center',
      paddingBottom: 10,
      color: colors.text,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 8,
      width: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.text,
    },
    modalInput: {
      color: colors.text,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      padding: 2,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 16,
    },
    modalButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
      marginLeft: 8,
    },
    cancelButton: {
      backgroundColor: colors.border,
    },
    updateButton: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: colors.background,
      fontWeight: 'bold',
    },
    modalCompleted: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    completedText: {
      marginRight: 8,
      color: colors.text,
    },
  });

export default Todos;
