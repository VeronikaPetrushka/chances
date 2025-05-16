import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from './wefdwefmoe';

const { height } = Dimensions.get('screen');

const RateQuestion = ({ item, option }) => {
    const navigation = useNavigation();
    const [cost, setCost] = useState(0);
    const [comfort, setComfort] = useState(0);
    const [time, setTime] = useState(0);

    const total = cost + comfort + time;

    useEffect(() => {
        const loadExistingRating = async () => {
            try {
            const stored = await AsyncStorage.getItem('optionRatings');
            const existing = stored ? JSON.parse(stored) : [];
            const matched = existing.find(r => r.option === option);

            if (matched) {
                setCost(matched.cost);
                setComfort(matched.comfort);
                setTime(matched.time);
            }
            } catch (error) {
            console.error("Error loading existing rating:", error);
            }
        };

        loadExistingRating();
    }, []);

    const saveRating = async () => {
        try {
            const stored = await AsyncStorage.getItem('optionRatings');
            const existing = stored ? JSON.parse(stored) : [];

            const existingIndex = existing.findIndex(r => r.option === option);

            if (existingIndex !== -1) {
                existing[existingIndex] = {
                    ...existing[existingIndex],
                    cost,
                    comfort,
                    time,
                    total,
                };
            } else {
                existing.push({
                    id: Date.now(),
                    option,
                    cost,
                    comfort,
                    time,
                    total,
                });
            }

            await AsyncStorage.setItem('optionRatings', JSON.stringify(existing));

            navigation.goBack('');
        } catch (error) {
            console.error("Error saving rating:", error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.topPanel}>
                <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack('')}>
                    <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/back.png')} width={17} height={22} />
                </TouchableOpacity>
                <Text style={styles.title}>Rate this option</Text>
            </View>

            <View style={styles.contentContainer}>

                <Image source={{ uri: item.cover }} style={styles.cover} />

                <Text style={styles.question}>{option}</Text>

                <View style={[styles.row, {width: '100%', justifyContent: 'space-between', marginBottom: 24}]}>
                    <Text style={styles.label}>Cost</Text>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => setCost((prev) => prev + 1)}>
                            <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/plus.png')} width={29} height={29} />
                        </TouchableOpacity>
                        <Text style={styles.count}>{cost}</Text>
                        <TouchableOpacity
                            style={[cost < 1 && { opacity: 0.5 }]}
                            onPress={() => setCost((prev) => prev - 1)}
                            disabled={cost < 1}
                        >
                            <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/minus.png')} width={29} height={29} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.row, {width: '100%', justifyContent: 'space-between', marginBottom: 24}]}>
                    <Text style={styles.label}>Comfort</Text>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => setComfort((prev) => prev + 1)}>
                            <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/plus.png')} width={29} height={29} />
                        </TouchableOpacity>
                        <Text style={styles.count}>{comfort}</Text>
                        <TouchableOpacity
                            style={[comfort < 1 && { opacity: 0.5 }]}
                            onPress={() => setComfort((prev) => prev - 1)}
                            disabled={comfort < 1}
                        >
                            <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/minus.png')} width={29} height={29} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.row, {width: '100%', justifyContent: 'space-between', marginBottom: 24}]}>
                    <Text style={styles.label}>Time</Text>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => setTime((prev) => prev + 1)}>
                            <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/plus.png')} width={29} height={29} />
                        </TouchableOpacity>
                        <Text style={styles.count}>{time}</Text>
                        <TouchableOpacity
                            style={[time < 1 && { opacity: 0.5 }]}
                            onPress={() => setTime((prev) => prev - 1)}
                            disabled={time < 1}
                        >
                            <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/minus.png')} width={29} height={29} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.row, {width: '100%', justifyContent: 'space-between'}]}>
                    <Text style={styles.result}>Total points</Text>
                    <Text style={styles.result}>{total}</Text>
                </View>

            </View>

            <TouchableOpacity
                style={styles.saveBtn}
                onPress={saveRating}
            >
                <Text style={styles.saveBtnText}>Save</Text>
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
        alignSelf: 'flex-start',
        marginBottom: 24
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    label: {
        color: '#393e42',
        fontSize: 14,
        fontWeight: '400',
    },

    count: {
        fontSize: 24,
        fontWeight: '400',
        color: '#393e42',
        marginHorizontal: 8
    },

    result: {
        color: '#393e42',
        fontSize: 20,
        fontWeight: '600',
    },

    saveBtn: {
        width: '90%',
        padding: 20,
        backgroundColor: '#f04e29',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        zIndex: 10
    },

    saveBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    }

});

export default RateQuestion;