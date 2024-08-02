import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@/hooks/useUser";
import { ThemedView } from "@/components/ThemedView";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const { user } = useUser()
    const firstName = user?.fullName.split(' ')[0]
    // const firstName = 'gabu'

    return (
        <Tabs
            screenOptions={{
                // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarActiveTintColor: Colors.otherColors.primary,
                headerShown: false,
            }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                    headerShown: true,
                    // headerStyle: {backgroundColor: Colors.otherColors.primary},
                    headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].inputBackground, },
                    headerRight: () => (
                        <>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: '5%'
                            }}>
                                <ThemedText style={[styles.headerRightText]}>{firstName}</ThemedText>
                                {/*<ThemedView style={[styles.dp]}></ThemedView>*/}
                            </View>
                        </>
                    ),
                }}
            />

            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="(profile)"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                    ),
                }}
            />


        </Tabs>

    );
}

const styles = StyleSheet.create({

    headerRightText: {
        width: "auto",
        // color:Colors.otherColors.accent,
        // fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
        borderRadius: 10
    },
    dp: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 75
    }

})
