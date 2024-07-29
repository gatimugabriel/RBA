import {StyleSheet} from 'react-native';
import {Colors} from "@/constants/Colors";

export const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: 20,
    },

    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

        paddingVertical: 12,
        paddingHorizontal: 12,
        // borderWidth: 1,
        borderRadius: 8,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,

    },

    normalLink: {
        textDecorationLine: 'underline',
        color: Colors.otherColors.primary
    },

    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    successText: {
        color: 'green',
        marginBottom: 10,
    },
});
