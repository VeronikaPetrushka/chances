import { useState, useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from './wefdwefmoe';

const { height } = Dimensions.get('screen');

const ReadQuestion = ({ item }) => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);
    const [compareOptions, setCompareOptions] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
            loadCompareOptions();
        }, [])
    );

    useEffect(() => {
        loadFavorites();
    }, [favorites]);

    useEffect(() => {
        loadCompareOptions();
    }, [compareOptions]);

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

    const loadCompareOptions = async () => {
        try {
            const stored = await AsyncStorage.getItem('compareOptions');
            if (stored) {
            const parsed = JSON.parse(stored);

            const validOptions = parsed.filter(q =>
                q.id !== item.id || (q.id === item.id && q.options?.some(op => item.options.includes(op)))
            );

            setCompareOptions(validOptions);
            }
        } catch (error) {
            console.error('Error loading options to compare:', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            const stored = await AsyncStorage.getItem('favorites');
            const existing = stored ? JSON.parse(stored) : [];

            const isFav = existing.some(f => f.id === item.id);
            let updatedFavorites;

            if (isFav) {
                updatedFavorites = existing.filter(f => f.id !== item.id);
            } else {
                updatedFavorites = [...existing, item];
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);

        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const isFavorite = favorites.some((f) => f.id === item.id);

    const toggleCompareOptions = async (option) => {
        try {
            const stored = await AsyncStorage.getItem('compareOptions');
            const existing = stored ? JSON.parse(stored) : [];

            const existingItem = existing.find((q) => q.id === item.id);

            let updatedCompareOptions;

            if (existingItem) {
            const updatedOptions = existingItem.options.includes(option)
                ? existingItem.options.filter((op) => op !== option)
                : [...existingItem.options, option];

            if (updatedOptions.length === 0) {
                updatedCompareOptions = existing.filter((q) => q.id !== item.id);
            } else {
                updatedCompareOptions = existing.map((q) =>
                q.id === item.id ? { ...q, options: updatedOptions } : q
                );
            }
            } else {
            updatedCompareOptions = [...existing, { ...item, options: [option] }];
            }

            await AsyncStorage.setItem('compareOptions', JSON.stringify(updatedCompareOptions));
            setCompareOptions(updatedCompareOptions);
        } catch (error) {
            console.error("Error toggling options to compare:", error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.topPanel}>
                <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack('')}>
                    <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/back.png')} width={17} height={22} />
                </TouchableOpacity>
                <Text style={styles.title}>Info</Text>
            </View>

            <View style={styles.contentContainer}>

                <Image source={{ uri: item.cover }} style={styles.cover} />

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
                    <Text style={styles.question}>{item.title}</Text>
                    <TouchableOpacity onPress={toggleFavorite}>
                        <Icon
                            image={isFavorite ? require('../alkmmdwmwem/odkcfdekmvpoe/favorite.png') : require('../alkmmdwmwem/odkcfdekmvpoe/not-favorite.png')}
                            width={24}
                            height={24}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Answer options:</Text>

                <ScrollView style={{width: '100%'}}>
                    {
                        item.options.map((option, index) => (
                            <View key={index} style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.optionBtn} onPress={() => toggleCompareOptions(option)}>
                                    {
                                        compareOptions.find(q => q.id === item.id)?.options?.includes(option)
                                         && <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/selected.png')} width={20} height={20} />
                                    }
                                </TouchableOpacity>
                                <Text style={styles.optionText}>{option}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('AddQuestionScreen', { item: item })}>
                <Image source={require('../alkmmdwmwem/edit-btn.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
            </TouchableOpacity>

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
        justifyContent: 'flex-start',
        marginBottom: 23,
    },

    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff'
    },

    editBtn: {
        width: 66,
        height: 66,
        position: 'absolute',
        bottom: 70,
        right: 16,
        zIndex: 10
    },

    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#393e42',
        textAlign: 'center'
    },

    cover: {
        width: '100%',
        height: 280,
        resizeMode: 'cover',
        borderRadius: 32,
        marginBottom: height * 0.035
    },

    question: {
        fontSize: 24,
        fontWeight: '800',
        color: '#393e42',
    },

    label: {
        color: '#393e42',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 24,
        alignSelf: 'flex-start'
    },

    optionBtn: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#393e42',
        borderRadius: 4,
        marginRight: 16
    },

    optionText: {
        color: '#393e42',
        fontSize: 14,
        fontWeight: '400'
    }

});

export default ReadQuestion;