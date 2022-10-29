import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
// this will be resposible for outputting the number that was guessed in game screen
function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}
export default NumberContainer;
// we need this extra view as a wrapper for text
// as border radius is supported by text on IOS
const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    // fontWeight: "bold",
    fontFamily: "open-sans-bold",
  },
});
