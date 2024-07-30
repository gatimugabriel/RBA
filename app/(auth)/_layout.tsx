import {Redirect, router, Stack} from "expo-router";
import {useUser} from "@/hooks/useUser";

export default function AuthLayout() {
    const {user} = useUser()

    // Auto Login if user exists
    if (user) {
        // return router.replace('(tabs)')
        return <Redirect href={'(tabs)'}/>
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="signin" options={{headerShown: false}}/>
            <Stack.Screen name="signup" options={{headerShown: false}}/>
            <Stack.Screen name="forgotPassword" options={{headerShown: true}}/>
        </Stack>
    )
}
