import {useUser} from "@/hooks/useUser";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import {CommonStyles} from "@/constants/Styles";
import {Image, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {ThemedScrollView} from "@/components/ThemedScrollView";

export default function Profile() {
    const {user, setUser} = useUser()
    const {email, fullName} = {...user}

    const handleLogout = () => {
        alert("Logged out!")
        setUser(null);
        router.replace('/');
    };

    const getRoleName = (role: number) => {
        switch (role) {
            case 1:
                return "Admin";
            case 2:
                return "Teacher";
            case 3:
                return "Parent";
            case 4:
                return "Student";
            default:
                return "Unknown";
        }
    };

    return (
        <ThemedScrollView style={[styles.scrollView]}>
            <ThemedView style={[CommonStyles.container, styles.container]}>
                <ThemedView style={styles.header}>
                    <Image
                        source={{uri: `https://github.com/${user?.ghUsername}.png`}}
                        style={styles.profileImage}
                    />

                    <ThemedText style={styles.name}>{fullName || user?.fullName || "No Name"}</ThemedText>
                    <ThemedText style={styles.role}>{getRoleName(user?.role || 2)}</ThemedText>

                </ThemedView>

                {/*####### Info Section ####*/}
                <ThemedView style={styles.infoSection}>
                    <ThemedView style={styles.infoItem}>
                        <Ionicons name="mail" size={24} color="gray"/>
                        <ThemedText style={styles.infoText}>{email}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.infoItem}>
                        <Ionicons name="call-outline" size={24} color="gray"/>
                        <ThemedText style={styles.infoText}>+254{user?.phoneNumber}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.infoItem}>
                        <Ionicons name="location" size={24} color="gray"/>
                        <ThemedText style={styles.infoText}>Nairobi, Kenya</ThemedText>
                    </ThemedView>
                </ThemedView>

                {/*####### Buttons Section ####*/}
                <ThemedView style={styles.buttonSection}>
                    <CustomButton
                        title="Edit Profile"
                        onButtonPress={() => router.push('/update')}
                        extendedStyles={styles.editButton}
                    />
                    <CustomButton
                        title="Change Password"
                        onButtonPress={() => router.push('/changePassword')}
                        extendedStyles={styles.changePasswordButton}
                    />
                    <CustomButton
                        title="Logout"
                        onButtonPress={handleLogout}
                        extendedStyles={styles.logoutButton}
                    />
                </ThemedView>

                {/*####### Links Section ####*/}
                <ThemedView style={styles.linkSection}>
                    <ThemedText style={styles.linkHeader}>Quick Links</ThemedText>
                    <Link href={'/settings'} style={[CommonStyles.normalLink, styles.link]}>Settings</Link>
                    <Link href={'/privacy'} style={[CommonStyles.normalLink, styles.link]}>Privacy
                        Policy</Link>
                    <Link href={'/terms'} style={[CommonStyles.normalLink, styles.link]}>Terms
                        of Service</Link>
                    <Link href={'/help'} style={[CommonStyles.normalLink, styles.link]}>Help
                        & Support</Link>
                </ThemedView>

            </ThemedView>
        </ThemedScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        paddingVertical: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        padding: 20
    },

    profileImage: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: Colors.otherColors.primary,
        borderRadius: 75,
        marginBottom: 15,
        backgroundColor: Colors.dark.inputBackground
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    role: {
        fontSize: 16,
        color: 'gray',
    },
    infoSection: {
        marginBottom: 30,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10
    },
    infoText: {
        fontSize: 16,
    },
    buttonSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
        gap: 16
    },

    editButton: {
        backgroundColor: Colors.otherColors.accentLighter,
    },
    changePasswordButton: {
        backgroundColor: Colors.otherColors.tintColorLight,
    },
    logoutButton: {
        backgroundColor: '#F44336',
    },


    linkSection: {
        alignItems: 'flex-start',
        gap: 10
    },
    linkHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    link: {
        color: Colors.otherColors.tintColorLight,
        fontSize: 18
    },
});

