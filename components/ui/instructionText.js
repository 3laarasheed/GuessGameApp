import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

function InstructionText({ children, myStyle }) {
  return <Text style={[styles.instructionText, myStyle]}>{children}</Text>;
}
//overwrite from right to left

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: "open-sans",
  },
});
