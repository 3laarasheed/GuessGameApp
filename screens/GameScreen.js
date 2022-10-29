// we will navigate based on a state value if it has a confirmed number or not form root app
// that will handel which screen to display
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/instructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  // we use here num as if doesn't app craches insted of gameover as min and max are equal alternative useMemo() hook
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  // know that the upper boundry will be excluded
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  // as [] is empty that will ensure that is the first time that page is rendered

  function nextGuessHandler(direction) {
    // for contradicting indication
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      // all of this to avoid infinite loop
      Alert.alert("Don't lie", "You Know That This Is Wrong", [
        { text: "Sorry!!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      // direction => lower , greater
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
      // +1 to avoid guess the same number again as min isn't excluded automaticly like max
    }
    console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
    // as we update state based on previous version we have to use function form
    // by passing a function to the state updating function
  }

  const guessRoundListLength = guessRounds.length;
  // recalculted everytime component is reevaluated

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText myStyle={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContaner}>
            <PrimaryButton onPressButton={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContaner}>
            <PrimaryButton
              onPressButton={nextGuessHandler.bind(this, "greater")}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} 
        <Text>{itemData.item}</Text>*/}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        ></FlatList>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContaner: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
    // we add this to make list scrollable in my area
  },
});
