import React from 'react';
import { Container, Left, Icon, Body, Content, Text, ListItem } from 'native-base';
import AppHeader from '../../../AppHeader';

const MenuItems = [
  { text: 'CRUD operation', icon: 'create', iconType: 'MaterialIcons', routeTo: 'Main' },
  { text: 'Upload operation', icon: 'cloud-upload', iconType: 'MaterialIcons', routeTo: 'Upload' }
]

class SideBar extends React.Component {

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
      // await this.props.firebase.signOut();
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
    return (
      <Container>
        <AppHeader title='Firebase Starter' />
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
