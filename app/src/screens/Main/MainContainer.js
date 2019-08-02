import React, { Component } from 'react';
import MainView from './MainView';
import firebase from 'react-native-firebase';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }
    async componentDidMount() {
        const { userName, imageURL, } = this.state
        const user = await firebase.auth().currentUser;
        alert('user at MainContainer' + JSON.stringify(user))


    }
    getCurrentUser = async () => {
        const user = await firebase.auth().currentUser;
        alert('user at MainContainer' + user.phoneNumber);
        const ref = await firebase.firestore().doc(`users/${user.uid}`)

        ref.get().then((doc) => {
            if (doc.exists) {
                console.log('data coming from collection', doc);
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
    render() {
        return (
            <MainView
                signOut={this.signOut}
                toggleDrawer={this.toggleDrawer}
                modalVisible={this.state.modalVisible}
                user={this.user}
                getCurrentUser={this.getCurrentUser}
            />
        );
    }
}

export default MainContainer;