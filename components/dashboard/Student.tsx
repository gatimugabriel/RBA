import {StyleSheet} from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {CommonStyles} from '@/constants/Styles';

export default function StudentDashboard() {
    return (
        <ThemedView style={[CommonStyles.container]}>
            <ThemedText>
                STUDENT DASHBOARD
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({});
