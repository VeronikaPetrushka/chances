import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, TextInput, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from './wefdwefmoe';

const { height } = Dimensions.get('screen');

const RateOption = ({ item, option }) => {
    const navigation = useNavigation();
    const [pros, setPros] = useState([]);
    const [cons, setCons] = useState([]);

    useEffect(() => {
        const loadExistingRating = async () => {
            try {
                const stored = await AsyncStorage.getItem('optionsProsCons');
                const existing = stored ? JSON.parse(stored) : [];
                const matched = existing.find(r => r.option === option);

                if (matched) {
                    setPros(matched.pros);
                    setCons(matched.cons);
                }
            } catch (error) {
                Alert.alert("Error loading existing rating");
            }
        };

        loadExistingRating();
    }, []);

    const saveProsCons = async () => {
        try {
            const stored = await AsyncStorage.getItem('optionsProsCons');
            const existing = stored ? JSON.parse(stored) : [];

            const existingIndex = existing.findIndex(r => r.option === option);

            if (existingIndex !== -1) {
                existing[existingIndex] = {
                    ...existing[existingIndex],
                    pros,
                    cons,
                    totalPros: pros.length,
                    totalCons: cons.length
                };
            } else {
                existing.push({
                    id: Date.now(),
                    option,
                    pros,
                    cons,
                    totalPros: pros.length,
                    totalCons: cons.length
                });
            }

            await AsyncStorage.setItem('optionsProsCons', JSON.stringify(existing));

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
                <Text style={styles.title}>Rate</Text>
            </View>

            <View style={styles.contentContainer}>

                {
                    item.cover && (
                        <Image source={{ uri: item.cover }} style={styles.cover} />
                    )
                }

                <Text style={styles.question}>{option}</Text>

                <ScrollView style={{width: '100%'}}>
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 16}}>
                        <Text style={styles.label}>Pros</Text>
                        <TouchableOpacity style={styles.addBtn} onPress={() => setPros(prev => [...prev, ''])}>
                            <Image source={require('../alkmmdwmwem/odkcfdekmvpoe/plus.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                        </TouchableOpacity>
                    </View>

                    {pros.map((opt, index) => (
                        <View key={index} style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 12 }}>
                            <Text style={[styles.label, {marginBottom: 0, marginRight: 16}]}>{index + 1}</Text>
                            <TextInput
                                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                                value={opt}
                                onChangeText={(text) => {
                                    const updated = [...pros];
                                    updated[index] = text;
                                    setPros(updated);
                                }}
                                placeholder={`Option ${index + 1}`}
                                placeholderTextColor="#b8b8b8"
                            />
                            <TouchableOpacity onPress={() => setPros(prev => prev.filter((_, i) => i !== index))} style={{ marginLeft: 16 }}>
                                <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/delete.png')} width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                    ))}

                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 16, marginTop: 30}}>
                        <Text style={styles.label}>Cons</Text>
                        <TouchableOpacity style={styles.addBtn} onPress={() => setCons(prev => [...prev, ''])}>
                            <Image source={require('../alkmmdwmwem/odkcfdekmvpoe/plus.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                        </TouchableOpacity>
                    </View>

                    {cons.map((opt, index) => (
                        <View key={index} style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 12 }}>
                            <Text style={[styles.label, {marginBottom: 0, marginRight: 16}]}>{index + 1}</Text>
                            <TextInput
                                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                                value={opt}
                                onChangeText={(text) => {
                                    const updated = [...cons];
                                    updated[index] = text;
                                    setCons(updated);
                                }}
                                placeholder={`Option ${index + 1}`}
                                placeholderTextColor="#b8b8b8"
                            />
                            <TouchableOpacity onPress={() => setCons(prev => prev.filter((_, i) => i !== index))} style={{ marginLeft: 16 }}>
                                <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/delete.png')} width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                    ))}

                    <View style={{height: 550}} />
                </ScrollView>

            </View>

            <TouchableOpacity
                style={styles.saveBtn}
                onPress={saveProsCons}
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
        height: 180,
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
        fontWeight: '500',
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
    },

    addBtn: {
        width: 29,
        height: 29,
        zIndex: 10
    },

    input: {
        width: '100%',
        padding: 16, 
        borderRadius: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#999',
        marginBottom: 24,
    },

});

export default RateOption;