import { authActions } from "./authSlice";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { errorsActions } from "../errors/errorsSlice";

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
    let errorMessage;

    if (isLogin) {
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/user-disabled":
          errorMessage =
            "The user corresponding to the given email has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "There is no user corresponding to the given email.";
          break;
        case "auth/wrong-password":
          errorMessage =
            "The password is invalid for the given email, or the account corresponding to the email does not have a password set.";
          break;

        default:
          errorMessage = error.message;
      }
    } else {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "There already exists an account with the given email address.";
          break;
        case "auth/invalid-email":
          errorMessage = "Email address is not valid.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is not strong enough.";
          break;

        default:
          errorMessage = error.message;
      }
    }

    dispatch(errorsActions.setError(errorMessage));
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
    dispatch(errorsActions.setError(error.message));
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
    dispatch(errorsActions.setError(error.message));
  }

  dispatch(authActions.toggleIsGettingAuthData());
};

export const signOut = () => async dispatch => {
  await auth().signOut();

  dispatch(authActions.setToken(null));
};
