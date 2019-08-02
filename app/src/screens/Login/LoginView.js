import React, { Component } from 'react';
import { Container, Text, Button, Card, } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { View, ImageBackground } from 'react-native';

import styles from './Loginstyles';

const LoginView = (props) => {
    const {
        user,
        confirmResult,
        signIn,
        renderVerificationCodeInput,
        renderMessage,
        phoneNumber,
        valueChange,

    } = props;
    const successImageUri = 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';

    return (
        <Container>
            <ImageBackground source={{ uri: successImageUri }}
                style={styles.fullwidthHeight}
                resizeMode='cover'
            >

                <View>
                    {!user && !confirmResult &&
                        <Card style={styles.boxStyle}>
                            <View>
                                <Text style={{ fontSize: 34, textAlign: 'center', color: 'white', marginVertical: 82 }}>Login</Text>
                            </View>
                            <Text style={[styles.textWhite, styles.marginLR]}>Enter phone number :</Text>
                            <View style={[styles.viewCardtype, styles.marginLR]}>
                                <TextInput
                                    autoFocus
                                    style={styles.inputText}
                                    onChangeText={(value) => valueChange(value)}
                                    placeholder={'Enter Phone number ... '}
                                    value={phoneNumber}
                                    keyboardType='number-pad'
                                    maxLength={13}
                                    placeholderTextColor='white'
                                />
                            </View>

                            <Button onPress={signIn} style={[styles.buttonDiv, styles.marginLR]}>
                                <Text style={styles.buttonDivText}>Sign In</Text>
                            </Button>
                        </Card>
                    }

                    {renderMessage()}

                    {!user && confirmResult && renderVerificationCodeInput()}


                    {user &&
                        <View style={styles.buttonDiv}>
                            {props.renderButton()}
                        </View>
                    }
                </View>
            </ImageBackground>
        </Container>
    );


}
export default LoginView;