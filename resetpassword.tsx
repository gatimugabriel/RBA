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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword === currentPassword) {
      setError("New password cannot be the same as the current password");
      return;
    }

    // password reset

    setTimeout(() => {
      setSuccess("Password reset successfully");
    }, 1000);
  };

  return (
    <ThemedView style={[CommonStyles.container]}>
      <View style={{ alignItems: "center", padding: 20 }}>
        <ThemedText style={styles.titleText}>
          Signup to{" "}
          <Text style={{ color: Colors.otherColors.primary }}> RBA </Text>
          School Management System
        </ThemedText>
      </View>
      <div className="password-reset">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Reset Password</button>
        </form>
      </div>
      <CustomButton title={`Sign Up`} onButtonPress={() => {}} />

      <View style={{ width: "100%", alignItems: "flex-start" }}>
        <ThemedText>
          Already have an account?{" "}
          <Link href={"/signin"} style={{ color: "red" }}>
            Sign in here
          </Link>
        </ThemedText>
      </View>
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PasswordReset;
