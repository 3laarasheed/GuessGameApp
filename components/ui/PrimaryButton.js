import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({ children, onPressButton }) {
  // This is your custom components and custom props
  // we can simplify this by passing onPressButton custom prop to onpress pressable
  // function pressHandler() {
  //   onPressButton();
  // }

  return (
    <View style={Styles.buttonOuterContainer}>
      <Pressable
        // we wrap pressable inside a view to avoid ripple effect problem
        onPress={onPressButton}
        android_ripple={{ color: Colors.primary600 }}
        // style can take a function which will be called auto by RN whenever pressable pressed (event  )
        style={({ pressed }) =>
          pressed
            ? [Styles.pressed, Styles.buttonInnerContainer]
            : Styles.buttonInnerContainer
        }
        // pressed is the only property of pressdata so made destructuring and it is boolean
      >
        <Text style={Styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const Styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    // for ios effect
    opacity: 0.75,
  },
});
