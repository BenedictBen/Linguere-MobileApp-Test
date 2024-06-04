// screens/MapViewScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { API_ADDRESS } from "../api/api";


export default function MapViewScreen({ route }) {
    const { userId, token, companyId } = route.params;
  const [geolocation, setGeolocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const response = await fetch(
          `${API_ADDRESS}v1/linguere/recrutement/react/geolocalisation/editeur/${userId}/entreprise/${companyId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = await response.json();
        const data = JSON.parse(responseData)

        if (response.ok) {
          setGeolocation(data);
          console.log(data)
        } else {
          console.error('Failed to fetch geolocation:', data.message);
          console.log(data)
        }
      } catch (error) {
        console.error('Error fetching geolocation:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGeolocation();
  }, [userId, companyId, token]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
   {geolocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: geolocation.latitude,
              longitude: geolocation.longitude,
            }}
            title={geolocation.adresse}
            description={geolocation.commentaire}
          />
          <View>
          <Text style={styles.title}>Geolocation Data</Text>
          <Text>ID: {geolocation.id}</Text>
          <Text>Editor ID: {geolocation.editeurId}</Text>
          <Text>Company ID: {geolocation.entrepriseId}</Text>
          <Image source={{ uri: geolocation.photo }} style={styles.photo} />
          <Text>Address: {geolocation.adresse}</Text>
          <Text>Date: {new Date(geolocation.laDate).toLocaleString()}</Text>
          <Text>Comment: {geolocation.commentaire}</Text>
          <Text>Interlocutor Name: {geolocation.interlocuteurNom}</Text>
          <Text>Interlocutor Email: {geolocation.interlocuteurEmail}</Text>
          <Text>Interlocutor Phone: {geolocation.interlocuteurPhone}</Text>
        </View>
        </MapView>
      ) : (
        <Text>No geolocation data available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photo: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
