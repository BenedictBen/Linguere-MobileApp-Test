import {StyleSheet, View, Text} from "react-native"
import MapView,{Callout, Marker} from "react-native-maps";
import geolocations from "../assets/data.json"
import Icon from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';


export default function MapScreen(){

    const navigation = useNavigation();

    const CustomMarker = () => {
        return(
          <View>
            <Icon name="location" size={50} color='#E74c3c' />
          </View>
        )
      }

      const onMarkerPress = (location) => {
        navigation.navigate('Details', { location });
    };

    return(
        <View style={styles.container}>
        <MapView 
        style={styles.map}
        showsUserLocation={true}
          initialRegion={{
            latitude: 51.309865,
            longitude: -0.002099,
            latitudeDelta: 4,
            longitudeDelta: 4,
          }}
          zoomEnabled={true}>
            {geolocations.map(location => (
                <Marker
                key={location.id}
                coordinate={{ latitude:location.latitude,
                    longitude: location.longitude, 
                }}
                title={location.adresse}
                >
                    <CustomMarker />
                    <Callout onPress={() => onMarkerPress(location)}>
                            <View style={styles.callout}>
                                <Text style={styles.name}>{location.name}</Text>
                            </View>
                        </Callout>
                </Marker>
            ))}
            
        </MapView>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100vh",
        flex: 1,
    },
    callout: {
        width: 100,
        padding: 5,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    modalImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#E74c3c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})