import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

//  const database = SQLite.openDatabase('places.db');
// //  const database = SQLite.openDatabase('contacts.db');

// export function init() { 
//     const promise = new Promise((resolve, reject) => {
//         database.transaction((tx) => {
//             tx.executeSql(
//                 `CREATE TABLE IF NOT EXISTS places (
//                   id INTEGER PRIMARY KEY NOT NULL,
//                   title TEXT NOT NULL,
//                   imageUri TEXT NOT NULL,
//                   address TEXT NOT NULL,
//                   lat REAL NOT NULL,
//                   lng REAL NOT NULL
//                 )`,
//             [],
//             () => {resolve();
//             },
//             (_, error) => {reject(error)}); 
            
//         });
//     });
//     return promise;
// }
const database = SQLite.openDatabase('places.db');

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
/*{this is the table that will generate upon opening the app, this table is populated by the give data. 
        The arrays are blank, the arrow functions are arguments, one is for success and the other is for errors.}*/
        //Most errors are likely to occur if there is a syntax error.
        export function insertPlace(place) {
            const promise = new Promise((resolve, reject) => {
              database.transaction((tx) => {
                tx.executeSql(
                  `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
                  [
                    place.title,
                    place.imageUri,
                    place.address,
                    place.location.lat,
                    place.location.lng,
                  ],
                  (_, result) => {
                    resolve(result);
                  },
                  (_, error) => {
                    reject(error);
                  }
                );
              });
            });
          
            return promise;
          }

export function fetchPlaces() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT * FROM places`, 
            [],
            (_, result) => {
              const places = [];
                // console.log(result);

                for (const dp of result.rows._array) {
                  places.push(
                    new Place(dp.title, dp.imageUri, {
                      address: dp.address,
                      lat: dp.lat,
                      lng: dp.lng,
                    }, 
                    dp.id)
                  )
                }
                resolve(places);
            }, 
            (_, error)=> {
                reject(error);
            });
        })
    })
    return promise;
}

export function fetchPlacesDetails(id) { 
  const promise = new Promise ((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM places WHERE id = ?', [id], 
      (_, result) => {
        // console.log(result);
        const dbPlace = result.rows._array[0];
        const place = new Place(
          dbPlace.title,
          dbPlace.imageUri,
          { lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address }, 
          dbPlace.id
        );
        resolve(place);
      },
      (_, error) => {
        reject(error)
      });
    });
  });

  return promise;

}