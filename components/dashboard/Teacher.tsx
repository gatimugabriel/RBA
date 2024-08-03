import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItem, RefreshControl, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {CommonStyles} from "@/constants/Styles";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import CreateClassModal from "@/components/teacher/class/add-class";
import apiService from "@/services/api";

interface Class {
    _id: string;
    className: string;
    day: string
    time: string;
    studentsCount: number;
}

export default function TeacherDashboard() {
    const [refreshing, setRefreshing] = useState(false);
    const [classes, setClasses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchClasses = async () => {
        try {
            const response = await apiService('/classes');
            return response.data.data;

        } catch (err: any) {
            alert(`Error occurred while loading your data: ${err.message || err.response.data.message}`);
            setRefreshing(false)
        }
    };

    useEffect(() => {
        fetchClasses().then(data => {
            setClasses(data || []);
        });
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchClasses().then(data => {
            setRefreshing(false);
            setClasses(data || []);
        });
    }, []);

    // Refresh the classes list after creating a new class
    const handleClassCreated = () => {
        onRefresh();
    };

    const renderClassItem: ListRenderItem<Class> = ({item}) => (
        <TouchableOpacity style={styles.classItem}>
            <ThemedText style={styles.className}>{item.className}</ThemedText>

            <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
                <ThemedText style={[styles.className, {color: 'gray'}]}>Time : </ThemedText>
                <ThemedText style={{fontSize: 14}}>{item.day}, [ {item.time} ] </ThemedText>
            </ThemedView>

            <ThemedText style={styles.studentsCount}>{item?.studentsCount || 0} students</ThemedText>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[CommonStyles.container, styles.container]}>
            <FlatList
                data={classes}
                renderItem={renderClassItem}
                keyExtractor={item => item._id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[Colors.otherColors.primary]}
                    />
                }

                ListHeaderComponent={() => (
                    <ThemedView style={styles.header}>
                        <ThemedText style={styles.headerText}>My Classes</ThemedText>
                        <CustomButton
                            title={`Create Class`}
                            extendedStyles={styles.createClassButton}
                            onButtonPress={() => setModalVisible(true)}
                        />
                    </ThemedView>
                )}

                ListEmptyComponent={() => (
                    <ThemedView style={styles.emptyState}>
                        <ThemedText>You are yet to create a class. Create your first class and manage your
                            students!</ThemedText>
                    </ThemedView>
                )}
                contentContainerStyle={styles.flatList}
            />

            <CreateClassModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onClassCreated={handleClassCreated}
            />


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        padding: 10,
        paddingTop: 20,
        // backgroundColor: 'red',
    },
    flatList: {
        // flex: 1,
        paddingHorizontal: 20
        // backgroundColor: 'blue',
    },

    classesContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        backgroundColor: Colors.otherColors.tintColorLight,
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    createClassButton: {
        width: 'auto',
        backgroundColor: Colors.otherColors.primary,
    },

    classItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderRadius: 5,
        // borderColor: Colors.otherColors.primary
        borderBottomColor: Colors.otherColors.primary,
    },

    className: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    studentsCount: {
        fontSize: 14,
        color: 'green',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

