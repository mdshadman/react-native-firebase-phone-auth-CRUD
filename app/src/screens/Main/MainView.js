import React, { Component } from 'react';
import { Container, Content, Text, Button, Left, Right, Grid, Row, Col, CardItem, Thumbnail } from 'native-base';
import { Modal, TouchableHighlight, View, Alert } from 'react-native';
import AppHeader from '../../../AppHeader';
import ModalContainer from '../../../Components/ModalComponent/Modal';
import { Switch } from 'react-native';


const MainView = (props) => {
    const { openModal, toggleDrawer, modalVisible, getCurrentUser, contact, name, toggleModal, userData } = props
    return (
        <Container>
            <AppHeader toggleMenu={toggleDrawer} />

            <Content>
                <CardItem>
                    <Left>
                        <Text>Click the button to Add a task.</Text>
                    </Left>
                    <Right>
                        <Button rounded success onPress={openModal}><Text>Click me</Text></Button>
                    </Right>
                </CardItem>
                <Grid>

                    <Row style={{ height: 50 }}>
                        <Col style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}><Text>Name</Text></Col>
                        <Col style={{ backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}><Text>Status</Text></Col>
                        <Col style={{ backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}><Text>Image</Text></Col>
                    </Row>


                    {userData.map((data, index) => {
                        return (
                            <Row style={{ backgroundColor: 'red', marginTop: 16 }} key={index}>
                                <Col style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}><Text>{data.Title}</Text></Col>
                                <Col style={{ backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}><Switch value={data.Status} /></Col>
                                <Col style={{ backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}><Thumbnail square source={{ uri: data.Image }} />
                                </Col>
                            </Row>
                        )
                    })
                    }

                </Grid>


                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <ModalContainer onModalClose={toggleModal} />
                </Modal>


            </Content>
        </Container>
    );
}
export default MainView;