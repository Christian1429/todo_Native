// useTodos.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';

export type Todo = Doc<'todos'>;

export function useTodos() {
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const [editingId, setEditingId] = useState<Id<'todos'> | null>(null);
  const [editText, setEditText] = useState('');

  const handleToggleTodo = async (id: Id<'todos'>) => {
    try {
      await toggleTodo({ id });
    } catch {
      Alert.alert('Error', 'Failed to toggle todo');
    }
  };

  const handleDeleteTodo = async (id: Id<'todos'>) => {
    Alert.alert('Delete Todo', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await updateTodo({ id: editingId, text: editText.trim() });
      setEditingId(null);
      setEditText('');
    } catch {
      Alert.alert('Error', 'Failed to update todo');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return {
    todos,
    editingId,
    editText,
    setEditText,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleSaveEdit,
    handleCancelEdit,
  };
}
