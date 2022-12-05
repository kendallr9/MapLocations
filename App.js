import { StatusBar } from 'expo-status-bar';
import { NaviagtionContainer, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';


const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(() => { //then function serves as an await function, this function waits to retrieve the call upon database, until then use the App Loading screen.
      setDbInitialized(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  if (!dbInitialized) {
    return <AppLoading/>
  }
  return (
    <>
    <StatusBar style='dark'/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.primary100,
        contentStyle: { backgroundColor: Colors.primary100 },
      }}>
        <Stack.Screen name="AllPlaces" 
        component={AllPlaces} 
        options={({navigation}) => ({
          title: 'Your Favorite Places',
          headerRight: ({tintColor}) => (
        <IconButton 
        icon="add" 
        size={24} 
        color={tintColor} 
        onPress={() => navigation.navigate('AddPlace')}/>
        )
        })}/>
        <Stack.Screen 
        name="AddPlace" 
        component={AddPlace}
        options={{
          title: 'Add a New Place',
        }}/>
        <Stack.Screen name="Map" component={Map}/>
        <Stack.Screen name="PlaceDetails" 
        component={PlaceDetails}
        options={{
          title: 'Loading Place...',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
   </>
  );
}
