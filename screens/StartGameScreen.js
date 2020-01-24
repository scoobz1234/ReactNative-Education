import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const NumberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const ResetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const ConfirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Input!',
                'Number has to be a number between 1 and 99', [{
                    text: 'Okay',
                    style: 'destructive',
                    onPress: ResetInputHandler
                }
            ])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    //Letting the user know what they input
    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
    }

    return (
        // the following lines creates the ability to click outside of
        // the keyboard and close the keyboard on that click.
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.card}>
                    <Text>Select a Number</Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={NumberInputHandler}
                        value={enteredValue}
                    />

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="Reset"
                                onPress={ResetInputHandler}
                                color={Colors.accent}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Confirm"
                                onPress={ConfirmInputHandler}
                                color={Colors.primary}
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    card: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;