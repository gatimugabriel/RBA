import React, {useState} from "react";
import {ThemedView} from "@/components/ThemedView";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import {CommonStyles} from "@/constants/Styles";
import {ThemedText} from "@/components/ThemedText";
import CustomInput from "@/components/CustomInput";
import {Link, router} from "expo-router";
import {useUser} from "@/hooks/useUser";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("");
    const {setUser} = useUser()

    const handleSubmit = async () => {
        setError("");

        const inputData = {email, password}

        try {
            setIsLoading(true)
            const serverResponse = await fetch('http://192.168.100.17:3000/signin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData)
            })

            const response = await serverResponse.json()

            if (!serverResponse.ok) {
               return setError(response.message || 'Invalid credentials')
            }

            const data = response.data

           // Set User to State
            setUser({
                email: data.email,
                phoneNumber: data.phoneNumber,
                role: data.role,
                token: response.accessToken,
                fullName: data.fullName,

                ghUsername: data.ghUsername || 'johndoe'
            })

            router.replace('(tabs)')
        } catch (error: any) {
            setError(error.message || 'An error occurred during sign in');
        } finally {
            setIsLoading(false)
        }
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

            <View style={{width: "100%", alignItems: "flex-end"}}>
                <Link href={"/forgotPassword"} style={{color: "red"}}>
                    Forgot password?
                </Link>
            </View>

            {error && <ThemedText style={{color: 'red'}}>{error}</ThemedText>}

            {isLoading ? <ActivityIndicator/> : <CustomButton title={`Sign in`} onButtonPress={() => handleSubmit()}/>}

            <View style={{width: '100%', alignItems: 'flex-start'}}>
                <ThemedText>
                    You don't have an account? <Link href={'/signup'} style={CommonStyles.normalLink}>
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
