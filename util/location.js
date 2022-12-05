const GOOGLE_API_KEY = 'AIzaSyBXNgDUzXXl33Wejn5sRgVakZaHywWREXA';

export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:yellow%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
}

//using back tics like so above allows for dynamic content//
//Additional Makers: -74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284//r

// export default getMapPreview;

export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch address!');
    }
  
    const data = await response.json();
    const address = data.results[0].formatted_address;
    return address;
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