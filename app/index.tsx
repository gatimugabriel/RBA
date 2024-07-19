import React from 'react';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CommonStyles } from "@/constants/Styles";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";

const WelcomeScreen = () => {

    return (
        <ThemedView style={[CommonStyles.container, styles.container]}>

            {/* Header*/}
            <View style={{ alignItems: 'center', padding: 20, }}>

                <ThemedText style={styles.titleText}>
                    Welcome to <Text
                        style={{ color: Colors.otherColors.primary }}> RBA </Text>
                    School Management System
                </ThemedText>

                <ThemedText style={styles.subtitleText}>Empowering Education through Technology</ThemedText>
            </View>


            {/* Action Buttons*/}
            <View style={styles.actionButtons}>

                <CustomButton
                    title={`Login`}
                    onButtonPress={() => router.push('/signin')}

                    extendedStyles={styles.signinButton}
                />

                <CustomButton
                    title={`Sign Up`}
                    onButtonPress={() => router.push('/signup')}
                    extendedStyles={styles.signupButton}
                />

            </View>

        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 100,
        justifyContent: "space-between",
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 6,
    },
    titleText: {
        fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginBottom: 20
    },
    subtitleText: {
        fontWeight: 'semibold', fontSize: 20, textAlign: 'center', marginBottom: 20
    },

    signinButton: {
        flex: 1,
        backgroundColor: Colors.otherColors.accent
    },
    signupButton: {
        flex: 1
    }
})

export default WelcomeScreen;
