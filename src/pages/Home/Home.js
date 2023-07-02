import CurrencyInput from "react-native-currency-input";
import { Button, View, StyleSheet } from "react-native";

export const Home = ({ setValue, handlePress, value }) => {
  return (
    <View style={styles.container}>
      <CurrencyInput
        value={value}
        onChangeValue={setValue}
        style={styles.inputContainer}
        prefix="€"
        delimiter="."
        separator=","
        precision={2}
      />
      <Button title="Continue" onPress={handlePress} disabled={!(value > 0)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "3px",
  },
  inputContainer: {
    padding: "3px",
  },
});
