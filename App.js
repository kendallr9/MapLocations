import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: Colors.primary700,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            contentStyle: {
              backgroundColor: Colors.background,
            },
            headerShadowVisible: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={{
              title: 'Care Locations',
            }}
          />

          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add Care Location',
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: 'Pick Location',
            }}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}