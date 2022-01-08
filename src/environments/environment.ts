// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  apiURL: 'http://localhost:3800',
  //apiURL:   'http://147.83.7.156:8080',
  firebaseConfig: {
    apiKey: "AIzaSyAYaZ4ZKSLwxXk6gDp9p0K0y2pFa2o_lXs",
    authDomain: "myteams-23f64.firebaseapp.com",
    projectId: "myteams-23f64",
    storageBucket: "myteams-23f64.appspot.com",
    messagingSenderId: "749805498563",
    appId: "1:749805498563:web:af4cd6e6693db81950f276",
    measurementId: "G-8C05QPK08Q"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
