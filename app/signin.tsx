import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { CommonStyles } from "@/constants/Styles";
import { ThemedText } from "@/components/ThemedText";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    {
      email: 'toni@toni',
      password: '1',
      role: 1
    },
    {
      email: 'latiphar@m',
      password: '2',
      role: 2
    },
    {
      email: 'gg@g',
      password: '3',
      role: 3
    }

  ]

  const handleSubmit = () => {

    const user = users.filter(user => email === user.email)

    console.log('user', user);


    if (!user) {
      setError('Invalid Credentials')
      return
    }

    if (password !== user[0].password) {
      setError('Invalid Credentials')
      return
    }

    if (user[0].role === 1) {
      router.replace('/admin')
      return
    }

    if (user[0].role === 2) {
      router.replace('(tabs)')
      return
    }

    // router.replace('(tabs)')
    setError('So worse!')

  }

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
        <Link href={"/resetpassword"} style={{ color: "red" }}>
          Forgot password?
        </Link>
      </View>

      {error && <ThemedText style={{ color: 'red' }}>{error}</ThemedText>}

      <CustomButton title={`Login`} onButtonPress={() => handleSubmit()} />

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
