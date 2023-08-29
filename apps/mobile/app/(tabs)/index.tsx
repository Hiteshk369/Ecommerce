import { StyleSheet, Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab one</Text>
      <Text className=" bg-sky-600 text-slate-100  px-10 rounded-lg font-medium text-base capitalize py-2">
        Hitesh Thop!
      </Text>
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
