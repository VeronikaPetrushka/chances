import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions, TextInput, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from './wefdwefmoe';

const { height } = Dimensions.get('screen');

const AddQuestion = ({ item }) => {
    const navigation = useNavigation();
    const [cover, setCover] = useState(item?.cover || null);
    const [title, setTitle] = useState(item?.title || null);
    const [options, setOptions] = useState(item?.options || []);

    const uploadCover = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
            if (!result.didCancel && result.assets?.length > 0) {
                setCover(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error selecting image:", error);
        }
    };

    const addOption = () => {
        setOptions(prev => [...prev, '']);
    };

    const removeOption = (index) => {
        setOptions(prev => prev.filter((_, i) => i !== index));
    };

    const saveQuestion = async () => {
        if (!title || !cover || options.length === 0) {
            Alert.alert("Missing Info", "Please fill out all fields before saving.");
            return;
        }

        const nonEmptyOptions = options.filter(opt => opt.trim() !== '');
        if (nonEmptyOptions.length === 0) {
            Alert.alert("Missing Option", "At least one option must be filled out.");
            return;
        }

        const newQuestion = {
            id: item?.id || Date.now(),
            title,
            cover,
            options: nonEmptyOptions
        };

        try {
            const stored = await AsyncStorage.getItem('questions');
            const existing = stored ? JSON.parse(stored) : [];

            let updated;
            if (item?.id) {
                updated = existing.map(q => q.id === item.id ? newQuestion : q);
            } else {
                updated = [...existing, newQuestion];
            }

            await AsyncStorage.setItem('questions', JSON.stringify(updated));

            navigation.navigate('QuestionsScreen');
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.topPanel}>
                <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack('')}>
                    <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/back.png')} width={17} height={22} />
                </TouchableOpacity>
                <Text style={styles.title}>{item ? 'Edit question' : 'New question'}</Text>
            </View>

            <View style={styles.contentContainer}>

                <Text style={styles.label}>Cover</Text>
                <TouchableOpacity style={styles.coverBtn} onPress={uploadCover}>
                    {
                        cover ? (
                            <Image source={{uri: cover}} style={{width: '100%', height: '100%', resizeMode: 'cover'}} />
                        ) : (
                            <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/add.png')} width={36} height={36} />
                        )
                    }
                </TouchableOpacity>

                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter your question"
                    placeholderTextColor='#b8b8b8'
                />

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 16}}>
                    <Text style={styles.label}>Add option</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={addOption}>
                        <Image source={require('../alkmmdwmwem/add-btn-small.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width: '100%', height: 200}}>
                    {options.map((opt, index) => (
                        <View key={index} style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 12 }}>
                            <TextInput
                                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                                value={opt}
                                onChangeText={(text) => {
                                    const updated = [...options];
                                    updated[index] = text;
                                    setOptions(updated);
                                }}
                                placeholder={`Option ${index + 1}`}
                                placeholderTextColor="#b8b8b8"
                            />
                            <TouchableOpacity onPress={() => removeOption(index)} style={{ marginLeft: 16 }}>
                                <Icon image={require('../alkmmdwmwem/odkcfdekmvpoe/delete.png')} width={16} height={16} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View style={{height: 100}} />
                </ScrollView>
            </View>

            <TouchableOpacity
                style={[styles.saveBtn, (!cover || !title) && { opacity: 0.5 }]}
                onPress={saveQuestion}
                disabled={!cover || !title}
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
        paddingBottom: 0
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

    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#393e42',
        marginBottom: 8
    },

    addBtn: {
        width: 38,
        height: 38,
        zIndex: 10
    },

    coverBtn: {
        width: '100%',
        height: 202,
        borderRadius: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#999',
        overflow: 'hidden',
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center'
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

export default AddQuestion;