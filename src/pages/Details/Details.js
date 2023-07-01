import {
  Button,
  Text,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import CurrencyInput from "react-native-currency-input";

export const Details = ({ handleBack, amount }) => {
  const [people, setPeople] = useState(0);
  const [listOfpeople, setListOfPeople] = useState([]);
  const [tips, setTips] = useState(0.0);

  const handleOnChangePeople = (e) => {
    let numberOfPeople = e <= 10 ? e : 10;
    setPeople(numberOfPeople);
    const arr = Array.from({ length: numberOfPeople }, (person, index) => {
      return {
        name: `Person ${index}`,
        toPay: Number((amount + tips) / numberOfPeople).toFixed(2),
        // value: amount / numberOfPeople,
        // sliderValue: `${numberOfPeople / 100}`,
      };
    });
    setListOfPeople([...arr]);
  };

  // const handleChangeAmount = (e, personIndex) => {
  //   const newList = [...listOfpeople];

  //   const remainingAmount = amount - e;
  //   newList.map((item, key) => {
  //     if (key !== personIndex) {
  //       item.value = remainingAmount / (people - 1);
  //     } else {
  //       item.value = e;
  //     }
  //   });
  //   setListOfPeople([...newList]);
  // };

  // const handleSlider = (e, personIndex) => {
  //   const newList = [...listOfpeople];

  //   const remainingAmount = amount - amount * (e / 100);
  //   newList.map((item, key) => {
  //     if (key !== personIndex) {
  //       item.value = remainingAmount / (people - 1);
  //     } else {
  //       item.value = amount * (e / 100);
  //     }
  //   });
  //   setListOfPeople([...newList]);
  // };

  const handleTipsSlider = (e) => {
    let newTips = (amount * e) / 100;
    setTips(newTips);
    const newList = [...listOfpeople];
    newList.map((item) => {
      item.toPay = Number((amount + newTips) / people).toFixed(2);
    });
    setListOfPeople([...newList]);
  }

  const handleSend = () => {
    ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.amountContainer}>
        <Text style={styles.textStyle}>Amount</Text>
        <Text style={styles.totalAmountStyle}>${amount}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text
          style={styles.textStyle}
          title="Please specify number of contributors"
        >
          Number of contributors
        </Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Number of people"
          placeholderTextColor="#60605e"
          numeric
          value={people.toString()}
          onChangeText={(e) => handleOnChangePeople(e)}
          keyboardType={"numeric"}
        />
      </View>

      {listOfpeople.length > 0 && (
        <ScrollView style={styles.scrollViewStyle}>
          <Text style={styles.textStyle}>
            Please specify the amount of contributions
          </Text>
          {listOfpeople.map((person, index) => (
            <View style={styles.peopleContainer} key={index}>
              <Text style={styles.textStyle}>{person.name}</Text>
              <Text style={styles.totalAmountStyle}>{person.toPay}</Text>
              {/* <Slider
                style={{ width: 150, height: 40 }}
                step={1}
                value={Number(person.sliderValue)}
                onValueChange={(e) => handleSlider(e, index)}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
              /> */}
              {/* <TextInput
                style={styles.textInputStyle}
                placeholder="Amount"
                placeholderTextColor="#60605e"
                numeric
                value={person.value.toString()}
                onChangeText={(e) => handleChangeAmount(e, index)}
                keyboardType={"numeric"}
              /> */}
            </View>
          ))}
        </ScrollView>
      )}
      <View style={styles.amountContainer}>
        <View style={styles.sliderContainer}>
          <Text style={styles.textStyle} title="Tips">
            Tips?
          </Text>
          <Slider
            style={{ width: 100, height: 40 }}
            step={1}
            value={Number(amount !== 0 ? (tips / amount) * 100 : 0).toFixed(2)}
            onValueChange={(e) => handleTipsSlider(e)}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#808080"
            maximumTrackTintColor="#808080"
          />
          <Text style={styles.textStyle} title="Tips">
            {amount !== 0 ? Number((tips / amount) * 100) : 0} %
          </Text>
          <CurrencyInput
            value={tips}
            placeholder="Tips"
            onChangeValue={setTips}
            prefix="€"
            style={styles.tipsContainer}
            delimiter="."
            separator=","
            precision={2}
          />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.textStyle}>Total Amount</Text>
          <Text style={styles.totalAmountStyle}>${Number(amount + tips).toFixed(2)}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.buttonContainer}
            title="Back"
            onPress={handleBack}
            color="#808080"
          />
          <Button
            style={styles.buttonContainer}
            title="Send"
            onPress={handleSend}
            disabled={people < 1}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 60,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textInputStyle: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    backgroundColor: "#dde8c9",
    padding: 10,
  },
  textStyle: {
    marginTop: 10,
    marginBottom: 10,
    flex: 2,
    fontSize: 12,
    fontWeight: 700,
    color: "#000",
  },
  totalAmountStyle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 700,
    color: "#000",
  },
  peopleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  amountContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  tipsContainer: {
    flex: 1,
  },
  footerContainer: {
    maxHeight: 120,
    width: 300,
  },
  scrollViewStyle: {
    flex: 1,
  },
  buttonsContainer: {
    display: "flex",
  },
});
