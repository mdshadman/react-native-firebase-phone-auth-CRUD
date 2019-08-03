import React, { Component } from 'react';
import MainView from './MainView';
import firebase from 'react-native-firebase';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            name: '',
            contact: '',
            taskList: []
        };
    }
    async componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser = async () => {
        const user = await firebase.auth().currentUser;
        const ref = await firebase.firestore().collection('tasks');
        ref.onSnapshot(this.onCollectionUpdate)
    }
    onCollectionUpdate = (querySnapshot) => {
        const taskList = [];
        querySnapshot.forEach((doc) => {
            taskList.push(doc.data());
        });
        console.log('taskList', taskList)
        this.setState({
            taskList
        });
    }

    signOut = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate('Auth');
    }


    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    }
    openModal = () => {
        this.setState({
            modalVisible: true
        })
    }
    toggleModal = () => {
        this.setState({
            modalVisible: false,
        }, () => this.getCurrentUser())
    }
    render() {
        const { name, contact, modalVisible, imageUrl } = this.state
        const userData = [{
            user_name: name,
            user_contact: contact,
            user_Image: imageUrl
        }]
        return (
            <MainView
                signOut={this.signOut}
                toggleDrawer={this.toggleDrawer}
                modalVisible={modalVisible}
                user={this.user}
                getCurrentUser={this.getCurrentUser}
                toggleModal={this.toggleModal}
                name={name}
                contact={contact}
                openModal={this.openModal}
                userData={this.state.taskList}

            />
        );
    }
}

export default MainContainer;