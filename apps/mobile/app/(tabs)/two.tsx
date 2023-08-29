import { StyleSheet, View, Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text className=" text-xl capitalize font-bold">two</Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
