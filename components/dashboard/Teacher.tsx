import React, {useCallback, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {CommonStyles} from "@/constants/Styles";
import {Colors} from "@/constants/Colors";

const TeacherDashboard = () => {
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        alert('refreshed')
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        fetchData().then(() => {
            setRefreshing(false)
        })
    }, []);

    return (
        <SafeAreaView style={[CommonStyles.container, styles.container]}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                    colors={[Colors.otherColors.primary]}/>
                }>




            </ScrollView>
        </SafeAreaView>
    );


};

export default TeacherDashboard

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

