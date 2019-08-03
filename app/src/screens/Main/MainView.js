import React, { Component } from 'react';
import { Container, Content, Text, Button, Left, Right, Grid, Row, Col, CardItem, Thumbnail, Card, Body, Icon } from 'native-base';
import { Modal, TouchableHighlight, View, Alert } from 'react-native';
import AppHeader from '../../../AppHeader';
import ModalContainer from '../../../Components/ModalComponent/Modal';
import { Switch } from 'react-native';


const MainView = (props) => {
    const { openModal, toggleDrawer, modalVisible, deleteTask, updateData, name, toggleModal, userData, goToUpdate } = props
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
                                <Col>
                                    <Card>
                                        <CardItem>
                                            <Left>
                                                <Body>
                                                    <Text>Title</Text>
                                                </Body>
                                            </Left>

                                            <Right>
                                                <Text>{data.Title}</Text>
                                            </Right>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Body>
                                                    <Text>Task Status</Text>
                                                </Body>
                                            </Left>

                                            <Right>
                                                <Switch value={data.Status} />
                                            </Right>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Text>Your Image</Text>
                                            </Left>

                                            <Body style={{ justifyContent: 'center' }}>
                                                <Text numberOfLines={1}>{data.Image}</Text>
                                            </Body>
                                            <Right>
                                                <Thumbnail square source={{ uri: data.Image }} />
                                            </Right>
                                        </CardItem>

                                        <Button iconLeft success style={{ justifyContent: 'center', margin: 10 }} onPress={() => goToUpdate(data)}>
                                            <Icon name='create' color='red' />
                                            <Text>Update</Text>
                                        </Button>

                                        <Button iconLeft danger style={{ justifyContent: 'center', margin: 10 }} onPress={() => deleteTask(data.id)}>
                                            <Icon name='trash' color='red' />
                                            <Text>Delete</Text>
                                        </Button>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })
                    }
                    {userData.length <= 0 &&
                        <Card>
                            <CardItem>
                                <Text style={{ textAlign: 'center' }}>You don't have any tasks yet, Add some tasks </Text>
                            </CardItem>
                        </Card>

                    }
                </Grid>


                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <ModalContainer onModalClose={toggleModal} sendUpdatedData={updateData} />
                </Modal>


            </Content>
        </Container>
    );
}
export default MainView;