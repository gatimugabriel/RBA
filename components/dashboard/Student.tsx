import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { CommonStyles } from "@/constants/Styles";
import { Ionicons } from '@expo/vector-icons';

// Dummy data
const studentData = {
    name: "Jane Smith",
    grade: "10th Grade",
    upcomingClasses: [
        { id: 1, subject: "Mathematics", time: "10:00 AM", teacher: "Mr. Johnson" },
        { id: 2, subject: "History", time: "11:30 AM", teacher: "Ms. Williams" },
    ],
    assignments: [
        { id: 1, title: "Math Homework", subject: "Mathematics", dueDate: "2023-07-25" },
        { id: 2, title: "History Essay", subject: "History", dueDate: "2023-07-28" },
    ],
    recentGrades: [
        { id: 1, subject: "Science", grade: "A", date: "2023-07-15" },
        { id: 2, subject: "English", grade: "B+", date: "2023-07-18" },
    ],
};

const StudentDashboard = () => {
    return (
        <ScrollView style={styles.scrollView}>
            <ThemedView style={[CommonStyles.container, styles.container]}>
                <View style={styles.header}>
                    <ThemedText style={styles.headerText}>Welcome, {studentData.name}</ThemedText>
                    <ThemedText style={styles.subHeaderText}>{studentData.grade}</ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Today's Classes</ThemedText>
                    {studentData.upcomingClasses.map((classInfo) => (
                        <View key={classInfo.id} style={styles.classItem}>
                            <Ionicons name="time-outline" size={24} color="#2196F3" />
                            <View style={styles.classInfo}>
                                <ThemedText style={styles.classSubject}>{classInfo.subject}</ThemedText>
                                <ThemedText style={styles.classDetails}>
                                    {classInfo.time} - {classInfo.teacher}
                                </ThemedText>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Assignments Due</ThemedText>
                    {studentData.assignments.map((assignment) => (
                        <View key={assignment.id} style={styles.assignmentItem}>
                            <Ionicons name="document-text-outline" size={24} color="#FF9800" />
                            <View style={styles.assignmentInfo}>
                                <ThemedText style={styles.assignmentTitle}>{assignment.title}</ThemedText>
                                <ThemedText style={styles.assignmentDetails}>
                                    {assignment.subject} - Due: {assignment.dueDate}
                                </ThemedText>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Recent Grades</ThemedText>
                    {studentData.recentGrades.map((grade) => (
                        <View key={grade.id} style={styles.gradeItem}>
                            <Ionicons name="school-outline" size={24} color="#4CAF50" />
                            <View style={styles.gradeInfo}>
                                <ThemedText style={styles.gradeSubject}>{grade.subject}</ThemedText>
                                <ThemedText style={styles.gradeDetails}>
                                    Grade: {grade.grade} - Date: {grade.date}
                                </ThemedText>
                            </View>
                        </View>
                    ))}
                </View>
            </ThemedView>
        </ScrollView>
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
    gradeItem:{},
    gradeInfo:{},
    gradeSubject:{},
    gradeDetails:{},
});


export default StudentDashboard;
