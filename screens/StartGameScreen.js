// here we should pick the number that will be guessed
// and where the game should start

import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/instructionText";

function StartGameScreen({ onpickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    // here check the current state validation range [1,99]
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99", [
        { text: "Okey", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
      // this return statement cancel confirmation function execution when it goes to if
    }
    onpickNumber(chosenNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter A Number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContaner}>
            <PrimaryButton onPressButton={resetInputHandler}>
              Reset
            </PrimaryButton>
          </View>
          <View style={styles.buttonContaner}>
            <PrimaryButton onPressButton={confirmInputHandler}>
              Confirm
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}
export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    marginVertical: 8,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.accent500,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContaner: {
    flex: 1,
  },
});
