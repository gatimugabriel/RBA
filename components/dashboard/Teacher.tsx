import {StyleSheet} from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {CommonStyles} from '@/constants/Styles';

export default function TeacherDashboard() {
    return (
        <ThemedView style={[CommonStyles.container]}>
            <ThemedText>
                Teacher
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({});
