import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from './Icon';

const Nav = () => {
    const navigation = useNavigation();
    const [currentScreen, setCurrentScreen] = useState('QuestionsScreen');

    const handleNavigate = (screen) => {
        setCurrentScreen(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setCurrentScreen(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={[styles.btn, currentScreen === 'QuestionsScreen' && {backgroundColor: '#fdb938'}]} 
                onPress={() => handleNavigate('QuestionsScreen')}>
                <Icon
                    image={require('../assets/icons/menu/questions.png')}
                    active={currentScreen === 'QuestionsScreen'}
                    width={28}
                    height={28}
                />
                <Text style={[styles.btnText, currentScreen === 'QuestionsScreen' && {color: '#393e42'}]}>Questions</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.btn, currentScreen === 'CompareScreen' && {backgroundColor: '#fdb938'}]} 
                onPress={() => handleNavigate('CompareScreen')}>
                <Icon
                    image={require('../assets/icons/menu/compare.png')}
                    active={currentScreen === 'CompareScreen'}
                    width={28}
                    height={28}
                />
                <Text style={[styles.btnText, currentScreen === 'CompareScreen' && {color: '#393e42'}]}>Compare</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.btn, currentScreen === 'ProsConsScreen' && {backgroundColor: '#fdb938'}]} 
                onPress={() => handleNavigate('ProsConsScreen')}>
                <Icon
                    image={require('../assets/icons/menu/pros-cons.png')}
                    active={currentScreen === 'ProsConsScreen'}
                    width={28}
                    height={28}
                />
                <Text style={[styles.btnText, currentScreen === 'ProsConsScreen' && {color: '#393e42'}]}>Pros/Cons</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.btn, currentScreen === 'QuizScreen' && {backgroundColor: '#fdb938'}]} 
                onPress={() => handleNavigate('QuizScreen')}>
                <Icon
                    image={require('../assets/icons/menu/quiz.png')}
                    active={currentScreen === 'QuizScreen'}
                    width={28}
                    height={28}
                />
                <Text style={[styles.btnText, currentScreen === 'QuizScreen' && {color: '#393e42'}]}>Quiz</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#393e42',
        padding: 12,
        paddingBottom: 20
    },
    
    btn: {
        width: 73,
        height: 68,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 24
    },

    btnText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#fff',
        marginTop: 8
    }

});

export default Nav;
