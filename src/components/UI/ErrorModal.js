import React from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { errorsActions } from "../../store/errors/errorsSlice";
import ButtonPrimary from "./ButtonPrimary";
import Card from "./Card";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";

const ErrorModal = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.errors.error);

  const handleClose = () => {
    dispatch(errorsActions.setError(null));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!error}
      onRequestClose={handleClose}>
      <View style={styles.modal}>
        <Card style={styles.modalCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="close-circle-outline" color="#fff" size={60} />
          </View>
          <Text style={styles.textPrimary}>Ooops!</Text>
          <Text style={styles.textSecondary}>{error}</Text>
          <ButtonPrimary
            title="Close"
            onPress={handleClose}
            style={styles.btn}
          />
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000003d",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalCard: {
    width: "80%",
    alignItems: "center",
    padding: 0,
    paddingBottom: 16,
    overflow: "hidden",
  },
  iconContainer: {
    width: "100%",
    backgroundColor: colors.error.e500,
    alignItems: "center",
    paddingVertical: 12,
  },
  textPrimary: {
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 12,
    textAlign: "center",
  },
  textSecondary: {
    marginHorizontal: 16,
    textAlign: "center",
  },
  btn: {
    width: "50%",
    marginTop: 16,
  },
});

export default ErrorModal;
