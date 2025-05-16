import React, { useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decisionQuizData, decisionQuizResults } from "../DecisionConstantsPath/decisionQuizData";
import { useFocusEffect } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const DecisionQuiz = () => {
    const [decisionQuizStarted, setDecisionQuizStarted] = useState(false);
    const [currentDecisionIndexPath, setCurrentDecisionIndexPath] = useState(0);
    const [decisionsRecord, setDecisionsRecord] = useState([]);
    const [decisionsPathOver, setDecisionsPathOver] = useState(false);
    const [lastDecisionResult, setLastDecisionResult] = useState(null);
    const [commonDecisionResult, setCommonDecisionResult] = useState({pathTitle: null, decision: null});

    useFocusEffect(
        useCallback(() => {
            loadDecisionResult();
        }, [])
    );

    const loadDecisionResult = async () => {
        try {
            const stored = await AsyncStorage.getItem('LAST_DECISION_RESULT');
            if (stored) {
                const parsed = JSON.parse(stored);
                setLastDecisionResult(parsed);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load decision result');
        }
    };

    const nextDecisionPath = (decision) => {
        const updatedRecord = [...decisionsRecord, decision];
        setDecisionsRecord(updatedRecord);
        calculateDecisionResult(updatedRecord);

        if (currentDecisionIndexPath + 1 <= decisionQuizData.length) {
            setTimeout(() => setCurrentDecisionIndexPath((prev) => prev + 1), 500)
        } else {
            setDecisionQuizStarted(false);
            setDecisionsPathOver(true);
        }
    };

    const calculateDecisionResult = async (records) => {
        const counts = (records || decisionsRecord).reduce((acc, item) => {
            const letter = item.pathLetter;
            acc[letter] = (acc[letter] || 0) + 1;
            return acc;
        }, {});

        let maxLetter = null;
        let maxCount = 0;
        
        for (const [letter, count] of Object.entries(counts)) {
            if (count > maxCount) {
                maxCount = count;
                maxLetter = letter;
            }
        }

        const resultObject = decisionQuizResults.find(result => result.maxChoises === maxLetter);

        if (resultObject) {
            try {
                await AsyncStorage.setItem('LAST_DECISION_RESULT', JSON.stringify(resultObject));
                setLastDecisionResult(resultObject);
                setCommonDecisionResult({
                    pathTitle: resultObject.pathTitle,
                    decision: resultObject.decision
                });
            } catch (error) {
                Alert.alert('Error', 'Failed to save decision result');
            }
        }
    };

    const resetDecisionQuiz = () => {
        setCurrentDecisionIndexPath(0);
        setDecisionsPathOver(false);
        setDecisionsRecord([]);
        setDecisionQuizStarted(false);
        setCommonDecisionResult({ pathTitle: null, decision: null });
    };

    const getChoiceColor = (index) => {
        const colors = ['#fdb938', '#22A700', '#006cb7', '#f04e29'];
        return colors[index % 4];
    };

    console.log('decisionsRecord: ', decisionsRecord)
    console.log('Results: ', commonDecisionResult)

    return (
        <View style={{ width: '100%', height: '100%' }}>
            
            {
                (!decisionQuizStarted && !decisionsPathOver) && (
                    <View style={{width: '100%', flexGrow: 1}}>
                        <View style={styles.topPanel}>
                            <Text style={styles.title}>Quiz</Text>
                        </View>
                        {
                            lastDecisionResult && (
                                <View style={styles.blueTextContainer}>
                                    <Image
                                        source={require('../alkmmdwmwem/odkcfdekmvpoe/decisionStar.png')}
                                        style={{width: 16, height: 16, resizeMode: 'contain', marginRight: 10}}
                                    />
                                    <View>
                                        <Text style={styles.lastResultText}>Result of the last game:</Text>
                                        <Text style={styles.lastResultText}>{lastDecisionResult.pathTitle}</Text>
                                    </View>
                                </View>
                            )
                        }
                        <TouchableOpacity
                            style={{ position: 'absolute', bottom: 150, alignSelf: 'center' }}
                            onPress={() => setDecisionQuizStarted(true)}
                        >
                            <Image
                                source={require('../alkmmdwmwem/decisionQuizStartBtn.png')}
                                style={{width: 116, height: 116, resizeMode: 'contain', marginRight: 10}}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }

            {
                (decisionQuizStarted && !decisionsPathOver && (currentDecisionIndexPath <= decisionQuizData.length - 1)) && (
                    <View style={{width: '100%', alignItems: 'center'}}>

                        <Image
                            source={decisionQuizData[currentDecisionIndexPath].image}
                            style={styles.decisionImage}
                        />

                        <View style={styles.decisionQContainer}>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: height * 0.03}}>
                                <View style={styles.progressBarBackground}>
                                    <View
                                        style={[
                                        styles.progressBarFill,
                                        {
                                            width: `${((currentDecisionIndexPath + 1) / decisionQuizData.length) * 100}%`,
                                        },
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.decisionQuestion, {fontSize: 14}]}>{currentDecisionIndexPath + 1} / {decisionQuizData.length}</Text>
                            </View>
                            <Text style={styles.decisionQuestion}>{decisionQuizData[currentDecisionIndexPath].decideQuestion}</Text>
                        </View>

                        {
                            decisionQuizData[currentDecisionIndexPath].pathChoices.map((item, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[styles.choiceBtn, { backgroundColor: getChoiceColor(idx) }]}
                                    onPress={() => nextDecisionPath(item)}
                                >
                                    <View style={styles.pathLetterContainer}>
                                        <Text style={styles.pathLetter}>{item.pathLetter}</Text>
                                    </View>
                                    <Text style={styles.choiceText}>{item.pathChoice}</Text>
                                </TouchableOpacity>
                            ))
                        }

                    </View>
                )
            }

            {
                (currentDecisionIndexPath > decisionQuizData.length - 1) && (
                    <View style={{ width: '100%', alignItems: 'center', paddingTop: height * 0.08, paddingHorizontal: 20 }}>
                        <ScrollView style={{width: '100%'}}>
                            <Text style={styles.finalDecisionTitle}>🎉 Your Decision-Making Style is... 🎯</Text>
                            <View style={[styles.finalContainer, {backgroundColor: '#fff'}]}>
                                <Text style={styles.finalDecisionText}>Based on your answers, here’s how you typically make decisions:</Text>
                                <View style={[styles.finalContainer, {backgroundColor: '#22A700', marginVertical: 16}]}>
                                    <Text style={styles.finalDecision}>{commonDecisionResult.pathTitle}</Text>
                                    <Text style={styles.finalDecision}>{commonDecisionResult.decision}</Text>
                                </View>
                                <Text style={[styles.finalDecisionText, {fontStyle: 'italic'}]}>💡 Tip: No matter your style, improving your decision-making skills can help you feel more confident and in control! Want to challenge yourself? Try using different decision-making methods in the app!</Text>
                            </View>
                            <TouchableOpacity style={styles.decisionResetBtn} onPress={resetDecisionQuiz}>
                                <Text style={styles.decisionResetText}>Try again</Text>
                            </TouchableOpacity>
                            <View style={{height: 200}} />
                        </ScrollView>
                    </View>
                )
            }

        </View>
    )
};

const styles = StyleSheet.create({

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

    blueTextContainer: {
        width: '90%',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#006CB7',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'center'
    },

    lastResultText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 8
    },

    decisionImage: {
        width: '100%',
        height: height > 700 ? height * 0.35 : height * 0.25,
        resizeMode: 'cover',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 10
    },

    decisionQContainer: {
        width: '90%',
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: height > 700 ? height * 0.04 : height * 0.02,
        backgroundColor: '#006CB7',
        marginBottom: 10
    },

    progressBarBackground: {
        width: '85%',
        height: 12,
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
    },

    progressBarFill: {
        height: '100%',
        backgroundColor: '#FFD52B',
        borderRadius: 16,
    },

    decisionQuestion: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '600',
        color: '#fff'
    },

    choiceBtn: {
        width: '90%',
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 5,
        paddingHorizontal: 14,
        paddingVertical: 9
    },

    pathLetterContainer: {
        width: 38,
        height: 38,
        borderRadius: 100,
        backgroundColor: '#383838',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 11
    },

    pathLetter: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '800',
        color: '#fff'
    },

    choiceText: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '500',
        color: '#fff',
        width: '85%'
    },

    finalDecisionTitle: {
        fontSize: 24,
        lineHeight: 28,
        fontWeight: '800',
        color: '#393E42',
        marginBottom: height * 0.055,
        textAlign: 'center'
    },

    finalContainer: {
        width: '100%',
        borderRadius: 20,
        padding: 16
    },

    finalDecisionText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        color: '#393E42'
    },

    finalDecision: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '600',
        color: '#fff'
    },

    decisionResetBtn: {
        width: '100%',
        padding: 20,
        backgroundColor: '#F04E29',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height > 700 ? height * 0.075 : height * 0.025
    },

    decisionResetText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '600',
        color: '#fff'
    }

})

export default DecisionQuiz;