import { Image, StyleSheet, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CommonStyles } from '@/constants/Styles';

export default function AdminDashboard() {
  return (
    <ThemedView style={[CommonStyles.container]}>
        <ThemedText>
            ADMIN
        </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
 
});
