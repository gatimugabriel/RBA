import React, {useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import {CommonStyles} from "@/constants/Styles";
import {ThemedText} from "@/components/ThemedText";
import CustomInput from "@/components/CustomInput";
import {Link, router} from "expo-router";
import {Colors} from "@/constants/Colors";
import {useUser} from "@/hooks/useUser";
import {Ionicons} from '@expo/vector-icons';
import {ThemedScrollView} from "@/components/ThemedScrollView";

const roles = [
    {id: 2, name: 'Teacher', icon: 'book-outline'},
    {id: 3, name: 'Parent', icon: 'people-outline'},
    {id: 4, name: 'Student', icon: 'school-outline'},
];

const Signup = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<number | null>(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {setUser} = useUser();

    const handleSubmit = () => {
        setError("");
        setSuccess("");

        if (!name || !email || !password || !confirmPassword || !selectedRole) {
            setError("Please fill all fields")
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!selectedRole) {
            setError("Please select a role");
            return;
        }
        // save user
        setUser({
            fullName: name,
            phoneNumber: phoneNumber,
            email: email,
            role: selectedRole,
            token: 'dummy-token-edcjk.dfsdfsdf.sdhaksdjias',
        });
        router.replace('(tabs)');
    };

    return (
        <ThemedScrollView style={[styles.scrollView]}>
            <ThemedView style={[CommonStyles.container, styles.container]}>

                <ThemedView style={styles.headerContainer}>
                    <ThemedText style={styles.titleText}>
                        Join <Text style={{color: Colors.otherColors.primary}}>RBA</Text>
                    </ThemedText>
                    <ThemedText style={styles.subtitleText}>
                        School Management System
                    </ThemedText>
                </ThemedView>

                <CustomInput
                    value={name}
                    onValueChange={setName}
                    placeholder="Full name"
                />

                <CustomInput
                    value={phoneNumber}
                    onValueChange={setPhoneNumber}
                    keyboardEntryType={"phone-pad"}
                    placeholder="Phone Number"
                />

                <CustomInput
                    value={email}
                    onValueChange={setEmail}
                    keyboardEntryType={"email-address"}
                    placeholder="Email address"
                />
                <CustomInput
                    value={password}
                    onValueChange={setPassword}
                    placeholder="Set password"
                    secureEntry
                />
                <CustomInput
                    value={confirmPassword}
                    onValueChange={setConfirmPassword}
                    placeholder="Confirm password"
                    secureEntry
                />

                <ThemedView style={styles.roleContainer}>
                    <ThemedText style={styles.roleTitle}>Select your role:</ThemedText>

                    <View style={styles.roleButtonContainer}>
                        {roles.map((role) => (
                            <TouchableOpacity
                                key={role.id}
                                style={[
                                    styles.roleButton,
                                    selectedRole === role.id && styles.selectedRoleButton
                                ]}
                                onPress={() => setSelectedRole(role.id)}
                            >
                                <Ionicons
                                    name={role.icon as any}
                                    size={24}
                                    color={selectedRole === role.id ? 'white' : Colors.otherColors.primary}
                                />
                                <ThemedText style={[
                                    styles.roleButtonText,
                                    selectedRole === role.id && styles.selectedRoleButtonText
                                ]}>
                                    {role.name}
                                </ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ThemedView>

                {error && <ThemedText style={CommonStyles.errorText}>{error}</ThemedText>}
                {success && <ThemedText style={CommonStyles.successText}>{success}</ThemedText>}

                <CustomButton title="Sign Up" onButtonPress={handleSubmit}/>

                <ThemedView style={styles.signInLinkContainer}>
                    <ThemedText>
                        Already have an account? <Link href="/signin" style={CommonStyles.normalLink}>
                        Sign in here
                    </Link>
                    </ThemedText>
                </ThemedView>

            </ThemedView>
        </ThemedScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        paddingTop: 50,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,
    },

    titleText: {
        paddingTop: 20,
        fontSize: 32,
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: 18,
        color: 'gray',
    },

    roleContainer: {
        marginVertical: 10,
        padding: 10,
    },
    roleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    roleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    roleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.otherColors.primary,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    selectedRoleButton: {
        backgroundColor: Colors.otherColors.accent,
        borderColor: Colors.otherColors.accent
    },
    roleButtonText: {
        marginTop: 5,
        color: Colors.otherColors.primary,
    },

    selectedRoleButtonText: {
        color: 'white',
    },

    signInLinkContainer: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 20,
    },
});

export default Signup;
