import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
    async function createPlaceHandler(place) {
        await insertPlace(place);
        navigation.navigate('AllPlaces');
      }
    
    // function createPlaceHandler(place) {
    //   navigation.navigate('AllPlaces', {
    //     place: place
    //   });
    // }
  
    return <PlaceForm onCreatePlace={createPlaceHandler} />;
  }
  
  export default AddPlace;
// The error was at the async function!!!

// function AddPlace({navigation}){
//     async function createPlaceHandler(place) {
//         await insertPlace(place);
//         navigation.navigate('AllPlaces', {
//             place: place
//         });

//     }
//     return (
//         <PlaceForm onCreatePlace={createPlaceHandler}/>
//     )

// }

// export default AddPlace;