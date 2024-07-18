import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {CommonStyles} from "@/constants/Styles";

interface CustomButtonProps {
    title: string;
    onButtonPress: () => void;
    extendedStyles?: object
}

const CustomButton = ({title, onButtonPress, extendedStyles}: CustomButtonProps) => {
    return (
        <TouchableOpacity onPress={onButtonPress} style={[CommonStyles.button, styles.button, extendedStyles]}>
            <ThemedText style={{textAlign: 'center'}}>
                {title}
            </ThemedText>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    button: {
        marginHorizontal: 10,
        backgroundColor: 'orange'
    }
})


export default CustomButton;
