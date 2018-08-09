// Under <footer>
/*
<script src="https://www.gstatic.com/firebasejs/5.3.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.3.1/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.3.1/firebase-firestore.js"></script>
*/

// // Initialize Firebase
// var config = {
//   apiKey: "[Web API Key]",
//   authDomain: "amelia-32034.firebaseapp.com",
//   databaseURL: "https://amelia-32034.firebaseio.com",
//   projectId: "amelia-32034",
//   storageBucket: "amelia-32034.appspot.com",
//   messagingSenderId: "[Sender ID]"
// };
// firebase.initializeApp(config);

// // Initialize Cloud Firestore through Firebase
// const db = firebase.firestore();
// const settings = { timestampsInSnapshots: true};
// db.settings(settings);

// db.collection("events").get().then(function (querySnapshot) {
//   querySnapshot.forEach(function (doc) {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// });

// // Add a new document in collection "events"
// db.collection("events").doc().set({
//     name: "Jazz Fest"
// })
// .then(function() {
//     console.log("Document successfully written!");
// })
// .catch(function(error) {
//     console.error("Error writing document: ", error);
// });
