import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Home } from "./src/pages/Home/Home";
import { Details } from "./src/pages/Details/Details";

export default function App() {
  const [value, setValue] = useState(0.0);
  const [appliedClicked, setAppliedClicked] = useState(false);

  const handlePress = () => {
    setAppliedClicked(true);
  };

  const handleBack = () => {
    setAppliedClicked(false);
  };

  return (
    <View style={styles.container}>
      {!appliedClicked ? (
        <Home value={value} setValue={setValue} handlePress={handlePress} />
      ) : (
        <Details amount={value} handleBack={handleBack} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
