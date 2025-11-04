import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  content: {
    fontSize: 20,
  },
});

export default function Index() {
  const { toggleDarkMode } = useTheme();

  const todos = useQuery(api.todos.getTodos)
  console.log(todos);

  const addTodo = useMutation(api.todos.addTodo);

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text>hi</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle the mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({ text: "test" })}>
        <Text>Add todo</Text>
      </TouchableOpacity>
    </View>
  );
}



