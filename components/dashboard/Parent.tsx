import {StyleSheet} from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {CommonStyles} from '@/constants/Styles';

export default function ParentDashboard() {
    return (
        <ThemedView style={[CommonStyles.container]}>
            <ThemedText>
                PARENT DASHBOARD
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({});
