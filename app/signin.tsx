import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { CommonStyles } from "@/constants/Styles";
import { ThemedText } from "@/components/ThemedText";
import CustomInput from "@/components/CustomInput";
import { Link } from "expo-router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ThemedView style={[CommonStyles.container]}>
      <ThemedText style={styles.titleText}>Welcome Back</ThemedText>
      <CustomInput
        value={email}
        onValueChange={setEmail}
        placeholder={`email`}
      />

      <CustomInput
        value={password}
        onValueChange={setPassword}
        placeholder={`password`}
        secureEntry
      />

      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <Link href={"/forgot"} style={{ color: "red" }}>
          Forgot password?
        </Link>
      </View>

      <CustomButton title={`Login`} onButtonPress={() => { }} />
      <View style={{ width: '100%', alignItems: 'flex-start' }}>
        <ThemedText>
          You don't have an account? <Link href={'/signup'} style={{ color: 'red' }}>
            Sign up here
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

export default Signin;
