import React, {useEffect, useRef, useState} from 'react';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Dimensions, FlatList, Image, StyleSheet, Text, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import {Colors} from "@/constants/Colors";
import {Redirect, router} from "expo-router";
import {useUser} from "@/hooks/useUser";

const {width, height} = Dimensions.get('window');

const carouselData = [
    {
        id: '1',
        image: 'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg',
        title: 'Interactive Classes',
        description: 'Engage in dynamic, interactive learning experiences.'
    },
    {
        id: '2',
        image: 'https://img.freepik.com/free-vector/webinar-concept-illustration_114360-4764.jpg',
        title: 'Expert Instructors',
        description: 'Learn from industry professionals and seasoned educators.'
    },
    {
        id: '3',
        image: 'https://img.freepik.com/free-vector/time-management-concept-illustration_114360-1013.jpg',
        title: 'Flexible Schedule',
        description: 'Study at your own pace, anytime and anywhere.'
    }
];

const WelcomeScreen = () => {
    const {user} = useUser();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        startAutoScroll();
        return () => clearInterval(timerRef.current);
    }, [currentIndex]);

    const startAutoScroll = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
        }, 3000);
    };

    useEffect(() => {
        if (flatListRef.current) {
            // @ts-ignore
            flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
        }
    }, [currentIndex]);

    const handleMomentumScrollEnd = (event) => {
        const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(newIndex);
        startAutoScroll();
    };

    if (user) {
        return <Redirect href={'/(tabs)'}/>;
    }

    const renderCarouselItem = ({item}) => (
        <View style={styles.carouselItem}>
            <Image source={{uri: item.image}} style={styles.image} resizeMode="contain"/>
            <ThemedView style={styles.textContainer}>
                <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
            </ThemedView>
        </View>
    );

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <ThemedText style={styles.titleText}>
                    Welcome to <Text style={{color: Colors.otherColors.primary}}>RBA</Text>
                </ThemedText>
                <ThemedText style={styles.subtitleText}>
                    Empowering Education through Technology
                </ThemedText>
            </ThemedView>

            <ThemedView>
                <FlatList
                    ref={flatListRef}
                    data={carouselData}
                    renderItem={renderCarouselItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                />

                <ThemedView style={styles.paginationDots}>
                    {carouselData.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                {backgroundColor: index === currentIndex ? Colors.otherColors.primary : 'gray'}
                            ]}
                        />
                    ))}
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.actionButtons}>
                <CustomButton
                    title={`Login`}
                    onButtonPress={() => router.push('(auth)/signin')}
                    extendedStyles={styles.signinButton}
                />
                <CustomButton
                    title={`Sign Up`}
                    onButtonPress={() => router.push("(auth)/signup")}
                    extendedStyles={styles.signupButton}
                />
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: height * 0.02,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 10,
        paddingVertical: 10,
        paddingTop: 40
    },
    subtitleText: {
        fontWeight: '400',
        fontSize: 20,
        color: 'gray',
        textAlign: 'center',
    },
    carouselItem: {
        width: width - 40,
        alignItems: 'center',
    },
    image: {
        width: width * 0.8,
        height: width * 0.6,
        marginBottom: 20,
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    itemTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.otherColors.primary,
    },
    itemDescription: {
        fontSize: 16,
        textAlign: 'center',
    },
    paginationDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    signinButton: {
        flex: 1,
        backgroundColor: Colors.otherColors.accent
    },
    signupButton: {
        flex: 1
    }
});

export default WelcomeScreen;
