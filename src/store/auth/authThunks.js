import { authActions } from "./authSlice";
import auth from "@react-native-firebase/auth";

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
