import { createHomeStyles } from "@/assets/images/styles/home.styles";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
 
  // const todos = useQuery(api.todos.getTodos)
  // console.log(todos);
  // const addTodo = useMutation(api.todos.addTodo);
  // const clearAllTodos = useMutation(api.todos.deleteAllTodos);

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Toggle the mode</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => addTodo({ text: 'test' })}>
        <Text>Add todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearAllTodos()}>
        <Text>Clear</Text>
      </TouchableOpacity> */}
      </SafeAreaView>
    </LinearGradient>
  );
}


