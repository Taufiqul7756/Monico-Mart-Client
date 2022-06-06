import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  getAuth,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const initializeLoginForm = () => {
  const app = initializeApp(firebaseConfig);
};

// export const initializeLoginForm =()=>{
//     if(initializeApp.apps.length === 0){
//       const app = initializeApp(firebaseConfig);
//     }
// }

export const handleGoogleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  console.log("sign in clicked");
  const auth = getAuth();
  return signInWithPopup(auth, googleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      return signedInUser;

      // console.log(displayName, email, photoURL);

      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
    })

    .catch((error) => {
      console.log(error);
      console.log(error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const handleFbSignIn = () => {
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, fbProvider)
    .then((result) => {
      var token = result.credential.accessToken;
      const user = result.user;
      return user;
      //user.success= true;

      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
      // console.log("Fb user after sign in ", user);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
};

export const handleSignOut = () => {
  const auth = getAuth();
  return signOut(auth)
    .then((res) => {
      const signedOutUser = {
        isSignedOut: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch((error) => {});
};

export const SignupHandler = (name, email, password) => {
  console.log({ name }, { email }, { password });
  const auth = getAuth();
  console.log(auth, { name }, { email }, { password });
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log(res);
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      console.log(newUserInfo);
      return newUserInfo;

      // const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error);
      const newUserInfo = {};
      newUserInfo.error = error.message;

      // newUserInfo.error = error.code;
      newUserInfo.success = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInHandler = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
      //const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;

      // newUserInfo.error = error.code;
      newUserInfo.success = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: name,
  })
    .then(() => {
      console.log("user Name Updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
