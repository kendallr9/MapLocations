const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export function getMapPreview(lat, lng) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:H%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
}

export async function getAddress(lat, lng) {
  if (!GOOGLE_API_KEY) {
    throw new Error('Google Maps API key is missing.');
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch address. Status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Geocode response:', data);

  if (data.status !== 'OK') {
    throw new Error(
      data.error_message || `Geocoding failed with status: ${data.status}`
    );
  }

  if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
    throw new Error('No address found for this location.');
  }

  const formattedAddress = data.results[0]?.formatted_address;

  if (!formattedAddress) {
    throw new Error('Address format not available.');
  }

  return formattedAddress;
}
// export async function getAddress(lat, lng) {
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
//     const response = await fetch(url);

//     if (!response.ok) {
//         throw new Error('Failed to retrieve address!, Check location api');
//     }
//     const data = await response.json();
//     const address = data.results[0].formatted_address;
//     return address;
// }

//Provide an if check to gather the street name or city and zip code intead of an exactly address for residential areas.