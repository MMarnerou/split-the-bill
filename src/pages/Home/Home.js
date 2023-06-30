import CurrencyInput from "react-native-currency-input";
import { Button } from "react-native";

export const Home = ({ setValue, handlePress, value}) => {
  return (
    <>
      <CurrencyInput
        value={value}
        onChangeValue={setValue}
        prefix="€"
        delimiter="."
        separator=","
        precision={2}
      />
      <Button title="Continue" onPress={handlePress} />
    </>
  );
};
