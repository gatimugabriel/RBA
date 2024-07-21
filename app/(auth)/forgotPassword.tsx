import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { CommonStyles } from "@/constants/Styles";
import { ThemedText } from "@/components/ThemedText";
import CustomInput from "@/components/CustomInput";
import { Text } from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("passwords do not match");
      return;
    }

    setTimeout(() => {
      setSuccess("Password reset successfully");
    }, 1000);
  };

  return (
    <ThemedView style={[CommonStyles.container]}>
      <View style={{ alignItems: "center", padding: 20 }}>
        <ThemedText style={styles.titleText}>
          Reset Your Password
        </ThemedText>
      </View>

      <CustomInput
        value={email}
        onValueChange={setEmail}
        placeholder="Email"
      />

      <CustomInput
        value={newPassword}
        onValueChange={setNewPassword}
        placeholder="New Password"
      />

      <CustomInput
        value={confirmPassword}
        onValueChange={setConfirmPassword}
        placeholder="Confirm Password"
      />

      {error && <ThemedText style={{ color: 'red' }}>{error}</ThemedText>}
      {success && <ThemedText style={{ color: 'green' }}>{success}</ThemedText>}

      <CustomButton title={`Reset`} onButtonPress={() => handleSubmit()} />

    </ThemedView>
  )

};
const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PasswordReset;
