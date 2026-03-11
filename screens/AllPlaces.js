import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

function AllPlaces({route}) {
    const [loadedPlaces, setLoadedPlaces] = useState([]); //currently useState array is empty until "places" are added from AddPlace//

    const isFocused = useIsFocused(); //useIsFocused is a boolean 


    useEffect(() => {
        async function loadPlaces() {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }
        if (isFocused ) {
            loadPlaces();
            // setLoadedPlaces(currentPlaces => [...currentPlaces, route.params.place]);
        }
    }, [isFocused]);
    //  useEffect(() => {
    //     if (isFocused && route.params) {
    //         setLoadedPlaces(currentPlaces => [...currentPlaces, route.params.place]);
    //     }
    // }, [isFocused, route]); 
    return (
        <PlacesList places={loadedPlaces}/>
    )

}

export default AllPlaces;
