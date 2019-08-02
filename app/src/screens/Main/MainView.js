import React, { Component } from 'react';
import { Container, Content, Text, Button, Header, Left, Icon, Body, Right, Grid, Row, Col, CardItem } from 'native-base';
import { Modal, TouchableHighlight, View, Image, Alert } from 'react-native';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

const MainView = (props) => {
    const { signOut, toggleDrawer, modalVisible, getCurrentUser } = props
    return (
        <Container>
            <Header>
                <Left>
                    <Icon name="menu" onPress={toggleDrawer} />
                </Left>
                <Body />
                <Right />
            </Header>
            <Content>
                <CardItem>
                    <Left>
                        <Text>Click the button to Add detail..</Text>
                    </Left>
                    <Right>
                        <Button rounded success onPress={signOut}><Text>Click me</Text></Button>
                    </Right>
                </CardItem>
                <Grid>
                    <Row style={{ height: 50 }}>
                        <Col style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}><Button onPress={getCurrentUser}><Text>Click to get user phone</Text></Button></Col>
                        <Col style={{ backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}><Text>Status</Text></Col>
                        <Col style={{ backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}><Text>Image</Text></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'red' }}>

                    </Row>
                </Grid>
                <View style={{ marginTop: 22 }}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <Text>Hello World!</Text>

                                <TouchableHighlight
                                    onPress={() => {
                                        this.setState({ modalVisible: false });
                                    }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Content>
        </Container>
    );
}
export default MainView;