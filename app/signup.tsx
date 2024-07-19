import React, { useState } from 'react';
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { CommonStyles } from "@/constants/Styles";
import { ThemedText } from "@/components/ThemedText";
import CustomInput from "@/components/CustomInput";
import { Text } from 'react-native';
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <ThemedView style={[CommonStyles.container]}>

            <View style={{ alignItems: 'center', padding: 20, }}>

                <ThemedText style={styles.titleText}>
                    Signup to  <Text
                        style={{ color: Colors.otherColors.primary }}> RBA </Text>
                    School Management System
                </ThemedText>

            </View>
            <CustomInput
                value={name}
                onValueChange={setName}
                placeholder={`Full name`}
            />
            <CustomInput
                value={email}
                onValueChange={setEmail}
                placeholder={`email address`}
            />

            <CustomInput
                value={password}
                onValueChange={setPassword}
                placeholder={`set password`}
                secureEntry
            />
            <CustomInput
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                placeholder={`confirm password`}
                secureEntry
            />

            <CustomButton title={`Sign Up`} onButtonPress={() => {
            }} />

            <View style={{ width: '100%', alignItems: 'flex-start' }}>
                <ThemedText>
                    Already have an account? <Link href={'/signin'} style={{ color: 'red' }}>
                        Sign in here
                    </Link>
                </ThemedText>
            </View>

        </ThemedView >
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    }
})

export default Signup;