import React, {useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet, Text, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import {CommonStyles} from "@/constants/Styles";
import {ThemedText} from "@/components/ThemedText";
import CustomInput from "@/components/CustomInput";
import {Link, router} from "expo-router";
import {Colors} from "@/constants/Colors";
import {useUser} from "@/hooks/useUser";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {setUser} = useUser()

    const handleSubmit = () => {
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("passwords do not match");
            return;
        }

        // save user
        setUser({
            email: email,
            role: 2,
            token: password,
            fullName: name,

            ghUsername: 'github'
        })

        router.replace('(tabs)')
    };

    return (
        <ThemedView style={[CommonStyles.container]}>

            <View style={{alignItems: 'center', padding: 20,}}>

                <ThemedText style={styles.titleText}>
                    Signup to <Text
                    style={{color: Colors.otherColors.primary}}> RBA </Text>
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

            {error && <ThemedText style={{color: 'red'}}>{error}</ThemedText>}
            {success && <ThemedText style={{color: 'green'}}>{success}</ThemedText>}

            <CustomButton title={`Sign Up`} onButtonPress={() => {
                handleSubmit()
            }}/>

            <View style={{width: '100%', alignItems: 'flex-start'}}>
                <ThemedText>
                    Already have an account? <Link href={'/signin'} style={CommonStyles.normalLink}>
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
        fontWeight: 'bold',
        marginBottom: 20,
    }
})

export default Signup;
