import React from 'react';
import {StyleSheet, TextInput} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";

interface CustomInputProps {
    value: string
    onValueChange: (value: string) => void
    placeholder?: string

    secureEntry?: boolean

    lightColor?: string
    darkColor?: string
}

const CustomInput = ({value, onValueChange, placeholder, secureEntry, lightColor, darkColor}: CustomInputProps) => {
    const color = useThemeColor({light: lightColor, dark:darkColor}, 'text')
    const backgroundColor = useThemeColor({light: lightColor, dark:darkColor}, 'inputBackground')

    return (
        <TextInput
            value={value}
            onChangeText={onValueChange}
            placeholder={placeholder}
            placeholderTextColor={'gray'}

            secureTextEntry={secureEntry}

            style={[
                styles.input,
                {color, backgroundColor}
            ]}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8
    }
})

export default CustomInput;
