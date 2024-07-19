import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CommonStyles } from '@/constants/Styles';

export default function UserDashboard() {
  return (
    <ThemedView style={[CommonStyles.container]}>
        <ThemedText>
            USER
        </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
 
});
