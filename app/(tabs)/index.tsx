import { createHomeStyles } from '@/assets/styles/home.styles';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadSpinner';
import TodoInput from '@/components/TodoInput';
import { Doc } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTodos } from '@/hooks/useTodos';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Todo = Doc<'todos'>;

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const {
  todos,
  editingId,
  editText,
  setEditText,
  handleToggleTodo,
  handleDeleteTodo,
  handleEditTodo,
  handleSaveEdit,
  handleCancelEdit,
} = useTodos();

  const isLoading = todos === undefined;
  if (isLoading) return <LoadingSpinner />;

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? 'transparent' : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>

          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />
              <View style={homeStyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.muted}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
              <Text
                style={[
                  homeStyles.todoText,
                  item.isCompleted && {
                    textDecorationLine: 'line-through',
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
              </Text>

              <View style={homeStyles.todoActions}>
                <TouchableOpacity
                  onPress={() => handleEditTodo(item)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={homeStyles.actionButton}
                  >
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteTodo(item._id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyles.actionButton}
                  >
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
