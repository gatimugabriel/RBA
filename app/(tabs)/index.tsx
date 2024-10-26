import React from 'react';
import {useUser} from "@/hooks/useUser";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Redirect} from "expo-router";
import AdminDashboard from "@/components/dashboard/Admin";
import TeacherDashboard from "@/components/dashboard/Teacher";
import ParentDashboard from "@/components/dashboard/Parent";
import StudentDashboard from "@/components/dashboard/Student";
import {CommonStyles} from "@/constants/Styles";

export default function Dashboard() {
    const {user} = useUser()

    if (!user) {
        return <Redirect href={'/'}/>
    }

    switch (user?.role) {
        case 1:
            return AdminDashboard()
        case 2:
            return TeacherDashboard()
        case 3:
            return ParentDashboard()
        case 4:
            return StudentDashboard()
        default:
            return <ThemedView style={CommonStyles.container}><ThemedText>Your dashboard is being setup... </ThemedText></ThemedView>
    }
}
