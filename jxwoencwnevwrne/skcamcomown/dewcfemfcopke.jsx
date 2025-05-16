import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from './wefdwefmoe';

const { height, width } = Dimensions.get('screen');

const RateResult = () => {
    const navigation = useNavigation();
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const loadData = async () => {
        try {
            const selected = await AsyncStorage.getItem("rateSelectedOptions");
            const rated = await AsyncStorage.getItem("optionsProsCons");

            const parsedSelected = selected ? JSON.parse(selected) : [];
            const parsedRatings = rated ? JSON.parse(rated) : [];

            const filteredRatings = parsedRatings.filter((r) =>
            parsedSelected.includes(r.option)
            );

            setRatings(filteredRatings);
        } catch (error) {
            console.error("Error loading data:", error);
        }
        };

        loadData();
    }, []);

    let globalIndex = 0;

    const getQuestionColor = (index) => {
        const colors = ['#fdb938', '#006cb7', '#f04e29', '#22a700'];
        return colors[index % 4];
    };

    console.log('ratings: ', ratings)

    return (
        <View style={styles.container}>

            <View style={styles.topPanel}>
                <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack('')}>
                    <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/back.png')} width={17} height={22} />
                </TouchableOpacity>
                <Text style={styles.title}>Compare options</Text>
            </View>

            <View style={styles.contentContainer}>
                {
                    ratings.length > 0 ? (
                        <ScrollView contentContainerStyle={{width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                ratings.map((item, index) => {
                                    const element = (
                                        <View key={index} style={[styles.option, { backgroundColor: getQuestionColor(globalIndex) }]}>
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                                <View
                                                    style={[
                                                    styles.mark,
                                                    item.totalPros > item.totalCons && { backgroundColor: '#22a700' },
                                                    item.totalPros < item.totalCons && { backgroundColor: '#be0b29' },
                                                    item.totalPros === item.totalCons && { backgroundColor: '#fdb938' },
                                                    ]}
                                                />
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={[styles.mark, { backgroundColor: '#22a700', marginRight: 10 }]}>
                                                        <Text style={{ fontSize: 8, fontWeight: '600', color: '#fff'}}>{item.totalPros} +</Text>
                                                    </View>
                                                    <View style={[styles.mark, { backgroundColor: '#be0b29' }]}>
                                                        <Text style={{ fontSize: 8, fontWeight: '600', color: '#fff'}}>{item.totalCons} -</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <Text style={styles.optionText}>{item.option}</Text>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('RateOptionScreen', { item, option: item.option })}
                                                >
                                                    <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/edit.png')} width={14} height={14} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    );

                                    globalIndex++;
                                    return element;
                                })
                            }
                            <View style={{height: 550}} />
                        </ScrollView>
                    ) : (
                        <View style={{width: '100%', alignItems: 'center', marginTop: height * 0.2}}>
                                <Image source={require('../alkmmdwmwem/nothing.png')} style={{ width: 80, height: 80, resizeMode: 'contain', marginBottom: 26 }} />
                                <Text style={styles.text}>There are no options to compare yet, choose them in questions now!</Text>
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

    text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#393e42',
        textAlign: 'center'
    },

    addBtn: {
        width: 66,
        height: 66,
        position: 'absolute',
        bottom: 120,
        right: 16,
        zIndex: 10
    },

    option: {
        width: '100%',
        padding: 16,
        borderRadius: 20,
        marginBottom: 16
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
        color: '#fff',
        fontSize: 14,
        fontWeight: '600'
    },

    mark: {
        minWidth: 20,
        height: 20,
        padding: 3,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default RateResult;