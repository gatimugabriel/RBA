import React, {useState} from "react";
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import {CommonStyles} from "@/constants/Styles";
import {ThemedText} from "@/components/ThemedText";
import CustomInput from "@/components/CustomInput";
import {Link, router} from "expo-router";
import {useUser} from "@/hooks/useUser";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {setUser} = useUser()

    const users = [
        {
            email: 'a',
            password: '1',
            role: 1,
            token: 'sghsdfjlsdfismbfsfsd'
        },
        {
            email: 'b',
            password: '2',
            role: 2,
            token: 'sghsdfjlsdfismbfsfsd'
        },
        {
            email: 'c',
            password: '3',
            role: 3,
            token: 'sghsdfjlsdfismbfsfsd'
        }

    ]

    const handleSubmit = () => {
        const user = users.filter(user => email.toLowerCase() === user.email)

        if (!user || password !== user[0]?.password) {
            setError('Invalid Credentials')
            return
        }

        // Set User to State
        setUser({
            email: user[0]?.email,
            role: user[0]?.role,
            token: user[0]?.token,
        })

        router.replace('(tabs)')
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

            <CustomButton title={`Login`} onButtonPress={() => handleSubmit()}/>

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