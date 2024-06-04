import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { API_ADDRESS } from "../api/api";


export default function CompanyListScreen({ route, navigation }) {
  const { token, userId } = route.params;
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          `${API_ADDRESS}v1/linguere/recrutement/react/entreprise`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();  // Parse the response as JSON
        console.log(data);

        if (response.ok) {
          setCompanies(data._embedded.entrepriseDTOModelList);
        } else {
          console.error('Failed to fetch companies:', data.message);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [token]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
    style={styles.itemContainer}
    onPress={() => navigation.navigate('MapView', { userId: userId, token: token, companyId: item.id })}
    >
      <Image source={item.logo} style={styles.logo} />
      <View>
        <Text style={styles.name}>{item.nom}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <FlatList
      data={companies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 14,
    color: "gray",
  },
});
