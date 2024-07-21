import {useUser} from "@/hooks/useUser";
import AdminDashboard from "@/components/dashboard/admin";
import UserDashboard from "@/components/dashboard/user";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {CommonStyles} from "@/constants/Styles";
import {Redirect} from "expo-router";

export default function Dashboard() {
    const {user} = useUser()
    if (!user){
        return <Redirect href={'/'} />
    }

    switch (user?.role) {
        case 1:
            return AdminDashboard()
        case 2:
            return UserDashboard()
        default:
            return <ThemedView style={CommonStyles.container}><ThemedText>Your dashboard is being setup... </ThemedText></ThemedView>
    }
}

