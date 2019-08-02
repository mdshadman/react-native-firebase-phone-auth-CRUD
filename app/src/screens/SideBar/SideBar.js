import React from 'react';
import { Container, Left, Icon, Body, Content, Text, ListItem, List, Thumbnail, Right } from 'native-base';
import firebase from 'react-native-firebase';

const MenuItems = [
  { text: 'CRUD operation', icon: 'create', iconType: 'MaterialIcons', routeTo: 'Main' },
  { text: 'Upload operation', icon: 'cloud-upload', iconType: 'MaterialIcons', routeTo: 'Upload' }
]

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      imageURL: 'https://scontent-sin2-1.xx.fbcdn.net/v/t1.0-1/c0.0.240.240a/p240x240/65822324_2111355985637711_2881848018242371584_n.jpg?_nc_cat=104&_nc_oc=AQljBZvYRPBQlLX4oEPTOMKK_JRfgJk1vJffBvR_PJLpGyTKeht7zk00VIEOYsbfa1U&_nc_ht=scontent-sin2-1.xx&oh=8ae0df6ebccbd58480935944dd68ac52&oe=5DD9AA1A'

    };
  }

  async componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const user = await firebase.auth().currentUser;
    alert('user at MainContainer' + user.phoneNumber);
    const ref = await firebase.firestore().doc(`users/${user.uid}`);

    ref.get().then((doc) => {
      if (doc.exists) {
        console.log('data coming from collection', doc);
        this.setState({
          name: doc._data.name,
          contact: doc._data.contact,
        })
      } else {
        console.log("No such document!");
      }
    });
  }

  getMenuItem = () => (
    MenuItems.map(el => (
      <ListItem icon onPress={() => this.goto(el.routeTo)}>
        <Left>
          <Icon active name={el.icon} type={el.iconType} />
        </Left>
        <Body>
          <Text>{el.text}</Text>
        </Body>
      </ListItem>
    ))
  )

  logout = async () => {
    try {
      await this.firebase.auth.signOut();
      this.props.navigation.navigate('Auth');
    } catch (e) {
      console.log(e, 'error in logout'); //todo error handling
    }
  }

  goto = screen => {
    console.log(screen, 'unable to route')
    this.props.navigation.navigate(screen)
  }

  render() {
    const { name, imageURL } = this.state
    return (
      <Container>
        <List style={{ backgroundColor: '#6b52ae' }}>
          <ListItem thumbnail>
            <Left>
              <Thumbnail circular source={{ uri: imageURL }} />
            </Left>
            <Body>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Welcome</Text>
              <Text numberOfLines={1} style={{ color: 'white', fontWeight: 'bold' }}>{name}</Text>
            </Body>
            <Right>
              <Icon name='create' color={'white'} fontSize={32} />
            </Right>
          </ListItem>
        </List>
        <Content>
          {this.getMenuItem()}
          <ListItem icon button onPress={this.logout}>
            <Left>
              <Icon active name='logout' type='MaterialCommunityIcons' />
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    )
  }
}

export default SideBar;
