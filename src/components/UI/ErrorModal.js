import React from "react";
import { Modal, View, StyleSheet, Text, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { errorsActions } from "../../store/errors/errorsSlice";
import ButtonPrimary from "./ButtonPrimary";
import Card from "./Card";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";

const ErrorModal = () => {
  const dispatch = useDispatch();
  const { error, notification } = useSelector(state => state.errors);

  const handleClose = () => {
    dispatch(errorsActions.setError(null));
    dispatch(errorsActions.setNotification(null));
  };

  const handleCall = () => {
    Linking.openURL(`tel:0637554666`);
    handleClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!error || !!notification}
      onRequestClose={handleClose}>
      <View style={styles.modal}>
        <Card style={styles.modalCard}>
          <View
            style={{
              ...styles.iconContainer,
              backgroundColor: error ? colors.error.e500 : colors.warn.main,
            }}>
            <Ionicons
              name={error ? "close-circle-outline" : "call-outline"}
              color="#fff"
              size={60}
            />
          </View>
          <Text style={styles.textPrimary}>
            {error ? "Ooops!" : "Notification"}
          </Text>
          <Text style={styles.textSecondary}>{error ?? notification}</Text>
          <View style={styles.buttonsContainer}>
            <ButtonPrimary
              title="Close"
              onPress={handleClose}
              style={styles.btn}
            />
            {!!notification && (
              <ButtonPrimary
                title="Call"
                color={colors.secondary.main}
                onPress={handleCall}
                style={styles.btn}
              />
            )}
          </View>
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
    width: "40%",
    marginTop: 16,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ErrorModal;
