import { useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from './wefdwefmoe';

const { height } = Dimensions.get('screen');

const FavoriteQuestions = () => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem('favorites');
            if (stored) {
            setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const getQuestionColor = (index) => {
        const colors = ['#fdb938', '#006cb7', '#f04e29'];
        return colors[index % 3];
    };

    return (
        <View style={styles.container}>

            <View style={styles.topPanel}>
                <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack('')}>
                    <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/back.png')} width={17} height={22} />
                </TouchableOpacity>
                <Text style={styles.title}>Favorites</Text>
            </View>

            <View style={styles.contentContainer}>
                {
                    favorites.length > 0 ? (
                        <ScrollView contentContainerStyle={{width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                favorites.map((q, index) => (
                                    <View key={index} style={[styles.qCard, {backgroundColor: getQuestionColor(index)}]}>
                                        <Image source={{ uri: q.cover }} style={styles.qImage} />
                                        <Text style={styles.qQuestion} numberOfLines={2} ellipsizeMode="tail">{q.title}</Text>
                                        <TouchableOpacity style={styles.qBtn} onPress={() => navigation.navigate('ReadQuestionScreen', { item: q })}>
                                            <Text style={styles.qBtnText}>Read more</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                            <View style={{height: 500}} />
                        </ScrollView>
                    ) : (
                        <View style={{width: '100%', alignItems: 'center', marginTop: height * 0.2}}>
                                <Image source={require('../alkmmdwmwem/nothing.png')} style={{ width: 80, height: 80, resizeMode: 'contain', marginBottom: 26 }} />
                                <Text style={styles.text}>There are no favorite questions here yet, add your first one now!</Text>
                        </View>
                    )
                }
            </View>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

    contentContainer: {
        width: '100%',
        flexGrow: 1,
        padding: 16,
        alignItems: 'center'
    },

    topPanel: {
        width: '100%',
        height: 115,
        padding: 16,
        paddingTop: height * 0.07,
        backgroundColor: '#393e42',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 23,
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff'
    },

    topBtn: {
        alignItems: 'center'
    },

    topBtnText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#fff',
        marginTop: 5
    },

    addBtn: {
        width: 66,
        height: 66,
        position: 'absolute',
        bottom: 120,
        right: 16,
        zIndex: 10
    },

    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#393e42',
        textAlign: 'center'
    },

    qCard: {
        width: '48%',
        height: 237,
        borderRadius: 16,
        marginBottom: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    qImage: {
        width: '100%',
        height: 103,
        resizeMode: 'cover',
        borderRadius: 16,
        marginBottom: 16
    },

    qQuestion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'left',
        alignSelf: 'flex-start'
    },

    qBtn: {
        width: '100%',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#393e42'
    },

    qBtnText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#fff',
    }

});

export default FavoriteQuestions;