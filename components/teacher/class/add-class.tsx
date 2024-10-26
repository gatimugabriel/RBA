import React, {useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import CustomButton from '@/components/CustomButton';
import {Colors} from "@/constants/Colors";
import CustomInput from "@/components/CustomInput";
import apiService from "@/services/api";

interface CreateClassModalProps {
    visible: boolean;
    onClose: () => void;
    onClassCreated: () => void;
}

const CreateClassModal = ({visible, onClose, onClassCreated}: CreateClassModalProps) => {
    const [className, setClassName] = useState('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateClass = async () => {
        if (!className || !day || !time) {
            alert('Please fill all fields')
            return
        }

        setLoading(true);
        try {

            await apiService.post('/create-class', {
                className,
                day,
                time
            });

            setLoading(false);


            setClassName('');
            setDay('');
            setTime('');

            onClassCreated();
            onClose();

        } catch (err: any) {
            setLoading(false);
            alert(`Error occurred while creating class: ${err.response.data.message || err.message}`);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"

            transparent
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <ThemedView style={styles.modalContainer}>
                    <ThemedText style={styles.modalTitle}>Create Class</ThemedText>

                    <View style={styles.inputContainer}>
                        <CustomInput value={className} onValueChange={setClassName} placeholder={`Class Name`}/>
                        <CustomInput value={day} onValueChange={setDay} placeholder={`Day of the week`}/>
                        <CustomInput value={time} onValueChange={setTime} placeholder={`Class Time`}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        {loading ? <ActivityIndicator/> :
                            <>
                                <CustomButton
                                    title="Create"
                                    onButtonPress={handleCreateClass}
                                    extendedStyles={styles.createButton}
                                />

                                <CustomButton
                                    title="Cancel"
                                    onButtonPress={onClose}
                                    extendedStyles={styles.cancelButton}
                                />
                            </>
                        }
                    </View>
                </ThemedView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },

    modalContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.otherColors.tintColorLight,
    },
    inputContainer: {
        width: '100%',
        gap: 12,
        marginTop: 12,
        marginBottom: 50
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    createButton: {
        flex: 1,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'red',
    },
});

export default CreateClassModal;
