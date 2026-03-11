import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      setIsLoading(true);
      try {
        const places = await fetchPlaces();
        setLoadedPlaces(places);
      } catch (error) {
        console.log("Error loading places:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.infoText}>Loading your saved places...</Text>
      </View>
    );
  }

  if (!loadedPlaces || loadedPlaces.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>No places added yet</Text>
        <Text style={styles.infoText}>
          Start by adding your first favorite location.
        </Text>
      </View>
    );
  }

  return <PlacesList places={loadedPlaces} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  infoText: {
    fontSize: 15,
    textAlign: "center",
    color: "#6b7280",
  },
});

export default AllPlaces;
