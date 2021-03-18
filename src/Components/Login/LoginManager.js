import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';

export const initializeLoginFramework=() => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app(); // if already initialized, use that one
      }
}

export const handleGoogleSignIn=()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(googleProvider)
    .then(result=>{
    const {displayName,email,photoURL}=result.user;
    const signedInUser={
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL,
      success: true
    }
    return signedInUser;
  })
  .catch(err=>{
    console.log(err);
    console.log(err.message);
  })
  }

 export const handleFbSignIn=()=>{
    const facebookProvider= new firebase.auth.FacebookAuthProvider();    
    return firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((result) => {
    var user = result.user;
    user.success=true;
    return user;
   
  })
  .catch((error) => {
    console.log(error)
  });
  }

  export const handleSignOut=()=>{
      
    return firebase.auth().signOut().then(() => {
      const signedOutUser={
        isSignedIn:false,
        name:'',
        email:'',
        photo:'',
        error:'',
        success:false
      }
     return signedOutUser;
    }).catch((error) => {
      console.log(error)
    });
  }

  export const createUserWithEmailAndPassword=(name,email,password) => {
     return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((res) => {
      const newUserInfo=res.user;
      newUserInfo.error="";
      newUserInfo.success=true;
      updateUser(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword=(email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo=res.user;
      newUserInfo.error="";
      newUserInfo.success=true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  }

  export const updateUser=(name)=>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log("User name updated successfully")
    }).catch(function(error) {
      console.log(error);
    });
  }