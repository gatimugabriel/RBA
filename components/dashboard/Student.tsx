import React, {useCallback, useEffect, useState} from 'react';
import {
    FlatList,
    ListRenderItem,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Colors} from '@/constants/Colors';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import CustomButton from '@/components/CustomButton';
import apiService from "@/services/api";

interface Class {
    _id: string;
    className: string;
    day: string;
    time: string;
    studentsCount: number;
    teacherID: any
}

export default function StudentDashboard() {
    const [refreshing, setRefreshing] = useState(false);
    const [availableClasses, setAvailableClasses] = useState<Class[]>([]);
    const [joinedClasses, setJoinedClasses] = useState<Class[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAvailableClasses = async () => {
        try {
            setIsLoading(true)
            const response = await apiService('/classes/available');
            return response.data.data;
        } catch (err: any) {
            alert(`Error occurred while loading your data: ${err.message || err.response.data.message}`);
            setRefreshing(false);
        } finally {
            setIsLoading(false)
        }
    };

    const fetchJoinedClasses = async () => {
        try {
            setIsLoading(true)
            const response = await apiService('/classes/joined');
            return response.data.data;
        } catch (err: any) {
            alert(`Error occurred while loading your data: ${err.message || err.response.data.message}`);
            setRefreshing(false);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchAvailableClasses().then(data => {
            setAvailableClasses(data || []);
        });

        fetchJoinedClasses().then(data => {
            setJoinedClasses(data || []);
        });
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        Promise.all([fetchAvailableClasses(), fetchJoinedClasses()]).then(([availableData, joinedData]) => {
            setRefreshing(false);
            setAvailableClasses(availableData || []);
            setJoinedClasses(joinedData || []);
        });
    }, []);

    const joinClass = async (classID: string) => {
        try {
            const response = await apiService.post('/classes/join', {classID});
            onRefresh();
            alert(response.data.message)
        } catch (err: any) {
            alert(`Error occurred while joining the class: ${err.message || err.response.data.message}`);
        }
    };

    const renderClassItem: ListRenderItem<Class> = ({item}) => (
        <TouchableOpacity style={styles.classItem}>
            <ThemedText style={[styles.className, {fontSize: 20, marginBottom: 10}]}>{item.className}</ThemedText>
            <ThemedText style={[styles.className, {color: 'gray'}]}>Tutor:
                Mr. {item.teacherID.fullName}</ThemedText>
            <ThemedView style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}}>
                <ThemedText style={[styles.className, {color: 'gray'}]}>Time: </ThemedText>
                <ThemedText style={{fontSize: 14}}>{item.day}, [ {item.time} ]</ThemedText>
            </ThemedView>
            {/*<ThemedText style={styles.studentsCount}>{item?.studentsCount || 0} students</ThemedText>*/}
            <CustomButton title="Join Class" onButtonPress={() => joinClass(item._id)}/>
        </TouchableOpacity>
    )

    const renderJoinedClassItem: ListRenderItem<Class> = ({item}) => (
        <TouchableOpacity style={styles.classItem}>
            <ThemedText style={styles.className}>{item.className}</ThemedText>
            <ThemedView style={{flexDirection: 'row', alignItems: 'center'}}>
                <ThemedText style={[styles.className, {color: 'gray'}]}>Time: </ThemedText>
                <ThemedText style={{fontSize: 14}}>{item.day}, [ {item.time} ]</ThemedText>
            </ThemedView>
            <ThemedText style={styles.studentsCount}>{item?.studentsCount || 0} students</ThemedText>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container]}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                    colors={[Colors.otherColors.primary]}/>
                }>

                {/* Student Classes*/}
                <FlatList
                    data={joinedClasses}
                    renderItem={renderJoinedClassItem}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={() => (
                        <ThemedView style={styles.header}>
                            <ThemedText style={styles.headerText}>My Classes</ThemedText>
                        </ThemedView>
                    )}
                    ListEmptyComponent={() => (
                        <ThemedView style={styles.emptyState}>
                            <ThemedText>You haven't joined any classes yet.</ThemedText>
                        </ThemedView>
                    )}
                    contentContainerStyle={styles.flatList}
                />

                {/*Available classes*/}
                <ThemedView style={styles.header}>
                    <ThemedText style={styles.headerText}>Classes you can join</ThemedText>
                </ThemedView>
                <FlatList
                    data={availableClasses}
                    renderItem={renderClassItem}
                    keyExtractor={item => item._id}

                    horizontal

                    ListEmptyComponent={() => (
                        <ThemedView style={styles.emptyState}>
                            <ThemedText>No available classes at the moment.</ThemedText>
                        </ThemedView>
                    )}
                    contentContainerStyle={styles.flatList}
                />


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 0,
    },
    scrollView: {
        flex: 1
    },
    flatList: {
        // backgroundColor: 'red',
        paddingVertical: 20,
        gap: 20
    },
    header: {
        padding: 10,
        backgroundColor: Colors.otherColors.tintColorLight,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    classItem: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray'
    },
    className: {
        height: 'auto',
        fontSize: 16,
        fontWeight: 'bold',
    },
    studentsCount: {
        fontSize: 14,
        color: 'green',
    },
    emptyState: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
