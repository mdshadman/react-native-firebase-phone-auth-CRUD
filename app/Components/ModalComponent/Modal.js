import React, { Component } from 'react'
import { Container, Content, Text, Button, Header, Left, Body, Right, Icon, Form, Item, Input, Card, ListItem, CardItem, Thumbnail, Label, Toast } from 'native-base';
import { Switch } from 'react-native';
import CameraGallery from '../CameraGallery/CameraGallery';
import firebase from 'react-native-firebase';
import SpinnerComponent from '../../src/screens/Loader/LoaderView';

class ModalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            togVal: true,
            imageUrl: 'https://scontent-sin2-1.xx.fbcdn.net/v/t1.0-1/c0.0.240.240a/p240x240/65822324_2111355985637711_2881848018242371584_n.jpg?_nc_cat=104&_nc_oc=AQljBZvYRPBQlLX4oEPTOMKK_JRfgJk1vJffBvR_PJLpGyTKeht7zk00VIEOYsbfa1U&_nc_ht=scontent-sin2-1.xx&oh=8ae0df6ebccbd58480935944dd68ac52&oe=5DD9AA1A',
            taskStatus: null,
            titleInput: 'Shadman',
            imageUpload: null,
            getData: '',
            receiveUpdatedData: null,
            docId: null,
            loader: false
        };
    }
    async  componentDidMount() {
        const toUpdateData = this.props.sendUpdatedData
        console.log('didmount called success', toUpdateData);
        this.setState({
            receiveUpdatedData: toUpdateData
        }, () => {
            console.log('receivedData', this.state.receiveUpdatedData);
            if (this.state.receiveUpdatedData !== null && this.state.receiveUpdatedData !== undefined) {
                const { receiveUpdatedData } = this.state;
                this.setState({
                    imageUrl: receiveUpdatedData.Image,
                    togVal: receiveUpdatedData.Status,
                    titleInput: receiveUpdatedData.Title,
                    docId: receiveUpdatedData.id
                })
            }
        })

    }
    changeValue = (toggleValue) => {
        console.log('value', toggleValue)
        this.setState({
            togVal: !this.state.togVal
        })
    }

    getUrl = (image, imageData) => {
        const fileUri = decodeURI(image)
        console.log('data coming form gallerypage' + image, imageData)
        const { togVal } = this.state
        this.setState({
            imageUrl: image,
            taskStatus: togVal,
            imageUpload: fileUri
        })
    }




    textChange = (value) => {
        this.setState({
            titleInput: value,
        })
    }

    uploadImageTask = (imageBlob) => new Promise((resolve, reject) => {
        console.log('putFile imageBlob' + imageBlob);
        const fileName = new Date().getTime().toString();
        const userId = firebase.auth().currentUser.uid;
        console.log('userId' + userId);
        const ref = firebase.storage().ref(`tasksUpload/${userId}`).child(fileName);
        ref.putFile(imageBlob).then(
            () => ref.getDownloadURL().then(url => {
                const { titleInput, taskStatus } = this.state
                const taskDetail = {
                    Title: titleInput,
                    Image: url,
                    uid: userId,
                    Status: taskStatus
                }
                console.log('url' + url)
                firebase.firestore().collection('tasks').add(taskDetail)
                    .then(imageData => resolve(imageData))
                    .catch(e => reject(e))
            })
        ).catch(e => reject(e));
    });

    addTask = () => {
        const { imageUrl, imageUpload } = this.state
        const fileUri = decodeURI(imageUrl)
        this.uploadImageTask(imageUpload).then((res) => {
            console.log('task added successfully', res)
            Toast.show({
                text: 'Wrong password!',
                buttonText: 'Okay',
                duration: 3000,
                position: 'bottom'
            })
            this.setState({
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png',
                titleInput: '',
                taskStatus: null
            })
        }).catch((err) => alert('err' + err))
    }


    updateTask = () => {
        console.log('task update enter')
        const { imageUrl, titleInput, taskStatus, docId } = this.state
        const fileUri = decodeURI(imageUrl);
        const currentUId = firebase.auth().currentUser.uid
        const data = {
            Image: fileUri,
            Status: taskStatus,
            Title: titleInput,
            uid: currentUId,
        }

        firebase.firestore().doc(`tasks/${docId}`).update(data).then((res) => {
            setTimeout(() => {
                this.setState({
                    loader: true,
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png',
                    titleInput: '',
                    taskStatus: null
                }, () => this.props.onModalClose())
            }, 3000)

        }).catch((err) => console.log('update Eror', err));
        this.setState({
            loader: false
        })
    }
    render() {
        const { togVal, imageUrl, titleInput } = this.state
        return (
            <Container>
                <Header style={{ backgroundColor: '#6b52ae' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.onModalClose()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body />
                    <Right />
                </Header>
                <Content>
                    {this.state.receiveUpdatedData === null &&
                        <Card style={{ margin: 32 }}>
                            <CardItem >
                                <Item regular>
                                    <Icon name='contact' />
                                    <Input placeholder='Enter Your Title' onChangeText={(value) => this.textChange(value)} />
                                </Item>
                            </CardItem>


                            <CardItem icon>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="add" />
                                    </Button>
                                    <Body>
                                        <Text>Task Status</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Switch onValueChange={(toggleValue) => this.changeValue(toggleValue)} value={togVal} />
                                </Right>
                            </CardItem>

                            <CardItem>
                                <Left>
                                    <Thumbnail square source={{ uri: imageUrl }} />
                                    <Body>
                                        <Text>Select image</Text>
                                    </Body>
                                </Left>
                                <CameraGallery getImage={(url, base) => this.getUrl(url, base)} />
                            </CardItem>
                            <Button style={{ margin: 16, borderRadius: 10, justifyContent: 'center' }} onPress={this.addTask}>
                                <Text>Add Task</Text>
                            </Button>
                        </Card>
                    }

                    {this.state.receiveUpdatedData !== null && this.state.receiveUpdatedData !== undefined &&
                        <Card style={{ margin: 32 }}>
                            <CardItem >
                                <Item regular>
                                    <Icon name='contact' />
                                    <Input onChangeText={(value) => this.textChange(value)} value={titleInput} />
                                </Item>
                            </CardItem>


                            <CardItem icon>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="add" />
                                    </Button>
                                    <Body>
                                        <Text>Task Status</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Switch onValueChange={(toggleValue) => this.changeValue(toggleValue)} value={togVal} />
                                </Right>
                            </CardItem>

                            <CardItem>
                                <Left>
                                    <Thumbnail square source={{ uri: imageUrl }} />
                                    <Body>
                                        <Text>Select image</Text>
                                    </Body>
                                </Left>
                                <CameraGallery getImage={(url, base) => this.getUrl(url, base)} />
                            </CardItem>
                            <Button style={{ margin: 16, borderRadius: 10, justifyContent: 'center' }} onPress={this.updateTask}>
                                <Text>Update Task</Text>
                            </Button>
                        </Card>
                    }

                    {this.state.loader &&
                        <SpinnerComponent size={42} />
                    }
                </Content>
            </Container>
        );
    }
}

export default ModalContainer;