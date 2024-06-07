import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import one from "../assets/images/1.png"

export default function DetailsScreen({ route }) {
  const { location } = route.params;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleDateString(); // Customize date format as needed
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Company Name: {location.name}</Text>
      <View>
      <Image style={styles.image} 
    //   source={location.photo} 
    source={one}
      />

      </View>
      <Text style={styles.text}>Comment: {location.commentaire}</Text>
      <Text style={styles.text}>Contact Name: {location.interlocuteurNom}</Text>
      <Text style={styles.text}>Address: {location.adresse}</Text>
      <Text style={styles.text}>Email: {location.interlocuteurEmail}</Text>
      <Text style={styles.text}>Phone: {location.interlocuteurPhone}</Text>
      <Text style={styles.text}>Date: {formatDate(location.laDate)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    backgroundColor: "plum"
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 200, // Set width and height as needed
    height: 200,
    marginBottom: 5,
    borderRadius: 100,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
    color: 'black',
  },
});
