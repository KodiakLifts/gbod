import firebase from "react-native-firebase";

const db = firebase.firestore();

db.enablePersistence().catch(error => {
  if (error.code == "failed-precondition") {
    ("Only one instance can be open at a time. Failed to persist.");
  } else if (error.code == "unimplemented") {
    ("Device does not support enabling persistence.");
  }
});

export default db;
