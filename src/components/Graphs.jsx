import { useState, useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-chart-kit";
import Icon from './Icon';

const { height, width } = Dimensions.get('screen');

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  barPercentage: 1,
};

const Graphs = () => {
    const navigation = useNavigation();
    const [selectedOptions, setSelectedOptions] = useState([]);
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

            setSelectedOptions(parsedSelected);
            setRatings(filteredRatings);
        } catch (error) {
            console.error("Error loading data:", error);
        }
        };

        loadData();
    }, []);

    const generateData = (key) => {
        const labels = ratings.map((r) => r.option);
        const data = ratings.map((r) => r[key] || 0);

        return {
        labels,
        datasets: [{ data }]
        };
    };

    const totalBars = ratings.length || 1;
    const screenWidth = width - 32;
    const marginBetweenBars = 8;

    const slotWidth = screenWidth / totalBars;
    const barWidth = slotWidth - marginBetweenBars;
    const barPercentage = barWidth / slotWidth;

    return (
        <View style={styles.container}>

            <View style={styles.topPanel}>
                <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack('')}>
                    <Icon image={require('../assets/icons/back.png')} width={17} height={22} />
                </TouchableOpacity>
                <Text style={styles.title}>Compare options</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {["cost", "comfort", "time"].map((key, idx) => {
                    const title = key.charAt(0).toUpperCase() + key.slice(1);
                    const colors = ['#fdb938', '#006cb7', '#f04e29'];

                    const chartConfigCustom = {
                        ...chartConfig,
                        color: () => colors[idx],
                        labelColor: () => '#393e42',
                    };

                    return (
                        <View key={key} style={{ marginBottom: 32 }}>
                        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 10 }}>{title}</Text>
                        <BarChart
                            data={generateData(key)}
                            width={screenWidth}
                            barPercentage={barPercentage}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={chartConfigCustom}
                            verticalLabelRotation={0}
                            withInnerLines={false}
                            fromZero
                            showValuesOnTopOfBars
                            style={{borderRadius: 8}}
                        />
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