import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {CommonStyles} from "@/constants/Styles";
import {useThemeColor} from "@/hooks/useThemeColor";

interface CustomButtonProps {
    title: string;
    onButtonPress: () => void;
    extendedStyles?: object

    lightColor?: string
    darkColor?: string
}

const CustomButton = ({title, onButtonPress, lightColor, darkColor, extendedStyles}: CustomButtonProps) => {
    const shadowColor = useThemeColor({ light: lightColor, dark: darkColor }, 'shadowColor');

    return (
        <TouchableOpacity onPress={onButtonPress} style={[{shadowColor }, CommonStyles.button, styles.button, extendedStyles]}>
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
