import { useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from './wefdwefmoe';

const { height, width } = Dimensions.get('screen');

const ProsCons = () => {
    const navigation = useNavigation();
    const [compareOptions, setCompareOptions] = useState([]);
    const [compareSelectedOptions, setCompareSelectedOptions] = useState([]);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(compareOptions || []);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadCompareOptions();
            loadCompareSelectedOptions();
        }, [])
    );

    const loadCompareSelectedOptions = async () => {
        try {
            const stored = await AsyncStorage.getItem('rateSelectedOptions');
            if (stored) {
            setCompareSelectedOptions(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading selected options:', error);
        }
    };

    console.log('compareOptions: ', compareOptions)
    console.log('rateSelectedOptions: ', compareSelectedOptions)

    const loadCompareOptions = async () => {
        try {
            const stored = await AsyncStorage.getItem('compareOptions');
            if (stored) {
            const parsed = JSON.parse(stored);

                setCompareOptions(parsed);
                setFilteredOptions(parsed);
            }
        } catch (error) {
            console.error('Error loading options to compare:', error);
        }
    };

    let globalIndex = 0;

    const getQuestionColor = (index) => {
        const colors = ['#fdb938', '#006cb7', '#f04e29', '#22a700'];
        return colors[index % 4];
    };

    const toggleSelectedCompareOptions = async (option) => {
        try {
            const stored = await AsyncStorage.getItem('rateSelectedOptions');
            const existing = stored ? JSON.parse(stored) : [];

            const isSelected = existing.includes(option);
            const updated = isSelected
            ? existing.filter((op) => op !== option)
            : [...existing, option];

            await AsyncStorage.setItem('rateSelectedOptions', JSON.stringify(updated));
            setCompareSelectedOptions(updated);
        } catch (error) {
            console.error("Error toggling selected option:", error);
        }
    };

    const handleFilter = () => {
        if (selectedFilters.length === 0) {
            setFilteredOptions(compareOptions);
        } else {
            const filtered = compareOptions.filter(opt => selectedFilters.some(f => f.id === opt.id));
            setFilteredOptions(filtered);
        }
        setFilterVisible(false);
    };


    return (
        <View style={styles.container}>

            <View style={styles.topPanel}>
                <Text style={styles.title}>Compare options</Text>
            </View>

            <View style={styles.contentContainer}>
                {
                    filteredOptions.length > 0 ? (
                        <ScrollView contentContainerStyle={{width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                filteredOptions.map((item, index) => (
                                    <View key={index} style={{ width: '100%' }}>
                                    {
                                        item.options.map((option) => {
                                        const color = getQuestionColor(globalIndex);
                                        const element = (
                                            <View key={`${item.id}-${option}`} style={[styles.option, { backgroundColor: color }]}>
                                                <TouchableOpacity style={styles.optionBtn} onPress={() => toggleSelectedCompareOptions(option)}>
                                                    {
                                                    compareSelectedOptions.includes(option)
                                                    && <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/selected.png')} width={20} height={20} />
                                                    }
                                                </TouchableOpacity>
                                                <Text style={styles.optionText}>{option}</Text>
                                                <TouchableOpacity
                                                    style={{ position: 'absolute', top: 20, right: 20 }}
                                                    onPress={() => navigation.navigate('RateOptionScreen', {item: item, option: option})}
                                                >
                                                    <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/edit.png')} width={14} height={14} />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                        globalIndex++;
                                        return element;
                                        })
                                    }
                                    </View>
                                ))
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

            <TouchableOpacity style={styles.addBtn} onPress={() => setFilterVisible(true)}>
                <Image source={require('../alkmmdwmwem/filter-btn.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
            </TouchableOpacity>

            {
                filterVisible && (
                    <View style={styles.filterContainer}>
                        <View style={{ width: 100, height: 2, backgroundColor: '#fff', position: 'absolute', top: 8, alignSelf: 'center', borderRadius: 5}} />
                        <Text style={styles.filterTitle}>Filters</Text>
                        <Text style={styles.filterSubTitle}>Questions</Text>
                        <ScrollView style={{width: '100%'}}>
                            {
                                compareOptions.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.filterBtn, selectedFilters.some(f => f.id === option.id) && { backgroundColor: '#f9cf22' }]}
                                        onPress={() => {
                                            const exists = selectedFilters.find(f => f.id === option.id);
                                            if (exists) {
                                                setSelectedFilters(prev => prev.filter(f => f.id !== option.id));
                                            } else {
                                                setSelectedFilters(prev => [...prev, option]);
                                            }
                                            }}
                                    >
                                        <Text style={styles.filterBtnText}>{option.title}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                        <TouchableOpacity style={styles.applyFilterBtn} onPress={handleFilter}>
                            <Text style={styles.applyFilterBtnText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            {
                compareSelectedOptions.length > 1 && (
                    <TouchableOpacity
                        style={styles.compareBtn}
                        onPress={() => navigation.navigate('RateResultScreen')}
                    >
                        <Text style={styles.compareBtnText}>Compare</Text>
                    </TouchableOpacity>
                )
            }

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
        flexDirection: 'row',
        alignItems: 'center',
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

    applyFilterBtn: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f04e29',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        marginTop: height * 0.05
    },

    applyFilterBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    },

    filterContainer: {
        width: width,
        maxHeight: '60%',
        padding: 16,
        paddingVertical: 40,
        backgroundColor: '#393e42',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        zIndex: 12
    },

    filterTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 16
    },

    filterSubTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 8
    },

    filterBtn: {
        paddingVertical: 8,
        paddingHorizontal: 22,
        borderRadius: 100,
        backgroundColor: '#fff',
        marginBottom: 5
    },

    filterBtnText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#393e42',
        lineHeight: 20
    },

    compareBtn: {
        width: '70%',
        padding: 20,
        backgroundColor: '#f04e29',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 125,
        left: 16,
        alignSelf: 'center',
        zIndex: 10
    },

    compareBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    }

});

export default ProsCons;