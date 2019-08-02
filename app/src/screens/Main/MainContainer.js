import React, { Component } from 'react';
import MainView from './MainView';
import firebase from 'react-native-firebase';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            name: '',
            contact: ''
        };
    }
    async componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser = async () => {
        const user = await firebase.auth().currentUser;
        const ref = await firebase.firestore().doc(`users/${user.uid}`);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    name: doc._data.name,
                    contact: doc._data.contact
                })
            } else {
                console.log("No such document!");
            }
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
            modalVisible: false
        })
    }
    render() {
        const { name, contact, modalVisible } = this.state
        const userData = [{
            user_name: name,
            user_contact: contact
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
                userData={userData}

            />
        );
    }
}

export default MainContainer;