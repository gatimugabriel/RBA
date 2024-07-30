import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CommonStyles } from "@/constants/Styles";
import { Ionicons } from '@expo/vector-icons';
import { ThemedScrollView } from "@/components/ThemedScrollView";

// Dummy data
const data = {
    name: "Teacher Doe",
    subjects: ["Mathematics", "Physics"],
    upcomingClasses: [
        { id: 1, subject: "Mathematics", class: "10A", time: "10:00 AM" },
        { id: 2, subject: "Physics", class: "11B", time: "2:00 PM" },
    ],
    recentAssignments: [
        { id: 1, title: "Algebra Quiz", class: "10A", dueDate: "2023-07-25" },
        { id: 2, title: "Physics Lab Report", class: "11B", dueDate: "2023-07-28" },
    ],
};

type UpcomingClasses = {
    id: number;
    subject: string;
    class: string;
    time: string
}

type RecentAssignment = {
    id: number;
    title: string;
    class: string;
    dueDate: string
}

type TeacherData = {
    name: string;
    subjects: [string],
    upcomingClasses: [UpcomingClasses] | null
    recentAssignments: [RecentAssignment] | null
}

type TeacherDataProps = {
    TeacherData: TeacherData | null
}



export default function TeacherDashboard() {
    const [data2, setData2] = useState<TeacherDataProps | null>(null)
    const teacherData = data

    useEffect(() => {
        // @ts-ignore
        return setData2(data);
    }, []);


    return (
        <>
            <ThemedScrollView style={styles.scrollView}>
                <ThemedView style={[CommonStyles.container, styles.container]}>
                    <View style={styles.header}>
                        <ThemedText style={styles.headerText}>Welcome, {teacherData?.name}</ThemedText>
                        <ThemedText style={styles.subHeaderText}>TEACHER</ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Your Subjects</ThemedText>
                        {teacherData?.subjects?.map((subject, index) => (
                            <View key={index} style={styles.subjectItem}>
                                <Ionicons name="book-outline" size={24} color="#4CAF50" />
                                <ThemedText style={styles.subjectText}>{subject}</ThemedText>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Upcoming Classes</ThemedText>
                        {teacherData?.upcomingClasses?.map((classInfo) => (
                            <View key={classInfo?.id} style={styles.classItem}>
                                <Ionicons name="time-outline" size={24} color="#2196F3" />
                                <View style={styles.classInfo}>
                                    <ThemedText style={styles.classSubject}>{classInfo?.subject}</ThemedText>
                                    <ThemedText style={styles.classDetails}>
                                        {classInfo?.class} - {classInfo?.time}
                                    </ThemedText>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Recent Assignments</ThemedText>
                        {teacherData?.recentAssignments?.map((assignment) => (
                            <View key={assignment?.id} style={styles.assignmentItem}>
                                <Ionicons name="document-text-outline" size={24} color="#FF9800" />
                                <View style={styles.assignmentInfo}>
                                    <ThemedText style={styles.assignmentTitle}>{assignment?.title}</ThemedText>
                                    <ThemedText style={styles.assignmentDetails}>
                                        {assignment?.class} - Due: {assignment?.dueDate}
                                    </ThemedText>
                                </View>
                            </View>
                        ))}
                    </View>
                </ThemedView>
            </ThemedScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        paddingVertical: 30,
        // backgroundColor:'red'
    },
    header: {
        marginBottom: 30,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subHeaderText: {
        fontSize: 18,
        color: 'gray',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subjectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    subjectText: {
        fontSize: 16,
        marginLeft: 10,
    },
    classItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    classInfo: {
        marginLeft: 10,
    },
    classSubject: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    classDetails: {
        fontSize: 14,
        color: 'gray',
    },
    assignmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    assignmentInfo: {
        marginLeft: 10,
    },
    assignmentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    assignmentDetails: {
        fontSize: 14,
        color: 'gray',
    },
});

