import { authActions } from "./authSlice";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

export const authorize = (email, password, isLogin) => async dispatch => {
  dispatch(authActions.toggleIsGettingAuthData());

  try {
    // const authMethod = isLogin
    //   ? auth().signInWithEmailAndPassword
    //   : auth().createUserWithEmailAndPassword;

    // console.log(authMethod);
    // const authResponse = await authMethod(email, password);

    const authResponse = isLogin
      ? await auth().signInWithEmailAndPassword(email, password)
      : await auth().createUserWithEmailAndPassword(email, password);

    const idToken = await authResponse.user.getIdToken();

    dispatch(authActions.setToken(idToken));
  } catch (error) {
    if (isLogin) {
      switch (error.code) {
        case "auth/invalid-email":
          console.log("the email address is not valid.");
          break;
        case "auth/user-disabled":
          console.log(
            "The user corresponding to the given email has been disabled.",
          );
          break;
        case "auth/user-not-found":
          console.log("There is no user corresponding to the given email.");
          break;
        case "auth/wrong-password":
          console.log(
            "The password is invalid for the given email, or the account corresponding to the email does not have a password set.",
          );
          break;

        default:
          console.log("Unexpected error");
      }
    } else {
      switch (error.code) {
        case "auth/email-already-in-use":
          console.log(
            "There already exists an account with the given email address.",
          );
          break;
        case "auth/invalid-email":
          console.log("Email address is not valid.");
          break;
        case "auth/operation-not-allowed":
          console.log("Email/password accounts are not enabled.");
          break;
        case "auth/weak-password":
          console.log("Password is not strong enough.");
          break;

        default:
          console.log("Unexpected error");
      }
    }

    console.error(error);
  }

  dispatch(authActions.toggleIsGettingAuthData());
};

export const signInWithGoogle = () => async dispatch => {
  dispatch(authActions.toggleIsGettingAuthData());

  try {
    await GoogleSignin.signOut();

    const { idToken } = await GoogleSignin.signIn();

    dispatch(authActions.setToken(idToken));
    console.log(idToken);

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    await auth().signInWithCredential(googleCredential);

    console.log("Signed in with Google!");
  } catch (error) {
    console.error("authWithGoogle - ", error);
  }

  dispatch(authActions.toggleIsGettingAuthData());
};

export const signInWithFacebook = () => async dispatch => {
  dispatch(authActions.toggleIsGettingAuthData());

  try {
    LoginManager.logOut();

    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (result.isCancelled) {
      throw new Error("Login process was cancelled.");
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error("Something went wrong obtaining access token.");
    }
    console.log(data.accessToken);
    dispatch(authActions.setToken(data.accessToken));

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    await auth().signInWithCredential(facebookCredential);
    console.log("Signed in with Facebook");
  } catch (error) {
    console.error(error);
  }

  dispatch(authActions.toggleIsGettingAuthData());
};

export const signOut = () => async dispatch => {
  await auth().signOut();

  dispatch(authActions.setToken(null));
};
