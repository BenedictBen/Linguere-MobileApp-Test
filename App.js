
import { StyleSheet, View } from "react-native"
import LoginScreen from "./screens/LoginScreen"
import CompanyListScreen from './screens/CompanyListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapViewScreen from "./screens/MapViewScreen"

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CompanyList" component={CompanyListScreen} />
        <Stack.Screen name="MapView" component={MapViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <LoginScreen/>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {  
  flex: 1,
  // backgroundColor: "plum", 
  // paddingTop: Platform.OS === 'android' ? 25 : 0
}
})