import React, { Component } from 'react';
import MainView from './MainView';
import firebase from 'react-native-firebase';
import ModalContainer from '../../../Components/ModalComponent/Modal';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            name: '',
            contact: '',
            taskList: [],
            updateData: null
        };
    }
    async componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser = async () => {
        const user = await firebase.auth().currentUser.uid;
        const ref = await firebase.firestore().collection('tasks').where('uid', '==', user);
        ref.onSnapshot(this.onCollectionUpdate)
    }
    onCollectionUpdate = (querySnapshot) => {
        console.log(querySnapshot);
        const taskList = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
            taskList.push({ ...doc.data(), id: doc.id });
        });
        console.log('taskList', taskList)
        this.setState({
            taskList
        });
    }

    // signOut = () => {
    //     firebase.auth().signOut();
    //     this.props.navigation.navigate('Auth');
    // }


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
        },
            //  () => this.getCurrentUser()
        )
    }

    deleteTask = (docId) => {
        console.log('delete pressed')
        firebase.firestore().doc(`tasks/${docId}`).delete().then((res) => {
            console.log('success delete', res)
        }).catch((err) => {
            console.log('error delete', err)
        })
    }
    goToUpdate = (data) => {
        console.log('data coming for moda', data);
        this.setState({
            modalVisible: true,
            updateData: data
        })
        // <ModalContainer sendUpdateData={() => this.props.sendData(data)} />
    }

    sendData = (data) => {
        this.setState({
            data
        })
    };

    render() {
        const { name, contact, modalVisible, imageUrl, updateData } = this.state
        const userData = [{
            user_name: name,
            user_contact: contact,
            user_Image: imageUrl
        }]
        return (
            <MainView
                // signOut={this.signOut}
                toggleDrawer={this.toggleDrawer}
                modalVisible={modalVisible}
                user={this.user}
                getCurrentUser={this.getCurrentUser}
                toggleModal={this.toggleModal}
                name={name}
                contact={contact}
                openModal={this.openModal}
                userData={this.state.taskList}
                deleteTask={(data) => this.deleteTask(data)}
                goToUpdate={(data) => this.goToUpdate(data)}
                updateData={updateData}
            />
        );
    }
}

export default MainContainer;