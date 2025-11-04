import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';

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
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>Edit app/index.tsx to edit this screen111.</Text>
      <Text>hi</Text>
      <Link href="/about">Visit about</Link>
    </View>
  );
}
