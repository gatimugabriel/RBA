import {useUser} from "@/hooks/useUser";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import {router} from "expo-router";
import {CommonStyles} from "@/constants/Styles";

export default function Profile() {
    const {user, setUser} = useUser()
    const {email, fullName} = {...user}

    const handleLogout = () => {
        setUser(null);
        router.replace('/');
    };

    return (
        <ThemedView style={[CommonStyles.container]}>
            <ThemedText>
                My Profile
            </ThemedText>

            <ThemedText>{fullName}</ThemedText>
            <ThemedText>{email}</ThemedText>

            <CustomButton title={`Update`} onButtonPress={() => router.push('/update')}/>
            <CustomButton title={`Logout`} onButtonPress={() => handleLogout()} extendedStyles={{backgroundColor: 'gray'}}/>
        </ThemedView>
    )
}

