import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from './wefdwefmoe';

const { height, width } = Dimensions.get('screen');

const Graphs = () => {
    const navigation = useNavigation();
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const loadData = async () => {
        try {
            const selected = await AsyncStorage.getItem("compareSelectedOptions");
            const rated = await AsyncStorage.getItem("optionRatings");

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

    return (
        <View style={styles.container}>

            <View style={styles.topPanel}>
                <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack('')}>
                    <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/back.png')} width={17} height={22} />
                </TouchableOpacity>
                <Text style={styles.title}>Compare options</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {["cost", "comfort", "time"].map((key, idx) => {
                    const title = key.charAt(0).toUpperCase() + key.slice(1);
                    const colors = ['#fdb938', '#006cb7', '#f04e29'];

                    return (
                        <View key={key} style={{ marginBottom: 32, width: width - 32 }}>
                            <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 10 }}>{title}</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                                {
                                ratings.map((r, i) => {
                                    const value = r[key] || 0;
                                    const barHeight = Math.min(200, value * 20);

                                    return (
                                    <View key={i} style={{ alignItems: 'center', justifyContent: 'flex-end', height: 230, marginRight: 16 }}>
                                        <View style={{
                                            width: 50,
                                            height: barHeight,
                                            backgroundColor: colors[idx],
                                            borderTopLeftRadius: 6,
                                            borderTopRightRadius: 6,
                                            justifyContent: 'flex-end',
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ color: '#fff', fontSize: 12, padding: 2 }}>{value}</Text>
                                        </View>
                                        <Text style={{ marginTop: 6, fontSize: 12, textAlign: 'center' }}>{r.option}</Text>
                                    </View>
                                    );
                                })
                                }
                            </ScrollView>
                        </View>
                    );
                })}
            </ScrollView>

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

});

export default Graphs;