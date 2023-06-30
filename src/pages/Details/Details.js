import { Button, Text, StyleSheet, TextInput, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import CurrencyInput from "react-native-currency-input";

export const Details = ({ handleBack, amount = 40 }) => {
  const [people, setPeople] = useState(0);
  const [listOfpeople, setListOfPeople] = useState([]);
  const [tips, setTips] = useState(0.0);

  const handleOnChangePeople = (e) => {
    setPeople(e);
    const arr = Array.from({ length: e }, (person, index) => {
      return {
        name: `Person ${index}`,
        value: amount / e,
        sliderValue: `${e / 100}`,
      };
    });
    setListOfPeople([...arr]);
  };

  const handleChangeAmount = (e, personIndex) => {
    const newList = [...listOfpeople];

    const remainingAmount = amount - e;
    newList.map((item, key) => {
      if (key !== personIndex) {
        item.value = remainingAmount / (people - 1);
      } else {
        item.value = e;
      }
    });
    setListOfPeople([...newList]);
  };

  const handleSlider = (e, personIndex) => {
    const newList = [...listOfpeople];

    const remainingAmount = amount - amount * (e / 100);
    newList.map((item, key) => {
      if (key !== personIndex) {
        item.value = remainingAmount / (people - 1);
      } else {
        item.value = amount * (e / 100);
      }
    });
    setListOfPeople([...newList]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <Button title="Change Amount" onPress={handleBack} />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Number of people"
          placeholderTextColor="#60605e"
          numeric
          value={people.toString()}
          onChangeText={(e) => handleOnChangePeople(e)}
          keyboardType={"numeric"}
        />
        <CurrencyInput
          value={tips}
          onChangeValue={setTips}
          prefix="€"
          delimiter="."
          separator=","
          precision={2}
        />
      </View>

      {listOfpeople.length > 0 &&
        listOfpeople.map((person, index) => (
          <View style={styles.sliderContainer} key={index}>
            <Text>{person.name}</Text>
            <Slider
              style={{ width: 250, height: 40 }}
              step={1}
              value={Number(person.sliderValue)}
              onValueChange={(e) => handleSlider(e, index)}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Amount"
              placeholderTextColor="#60605e"
              numeric
              value={person.value.toString()}
              onChangeText={(e) => handleChangeAmount(e, index)}
              keyboardType={"numeric"}
            />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "scroll",
  },
  textInputStyle: {
    width: 250,
    backgroundColor: "#dde8c9",
    padding: 16,
  },
  sliderContainer: {
    // display: "flex",
    // flexDirection: "row",
    // width: 250,
  },
  amountContainer: {
    display: "flex",
    flexDirection: "row",
    width: 200,
  },
});
