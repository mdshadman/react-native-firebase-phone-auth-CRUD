import React, { Component } from 'react'
import { Container, Content, Text, Button, Header, Left, Body, Right, Icon } from 'native-base';

class ModalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // modalVisible: true
        };
    }
    render() {
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
                    <Button bordered success onPress={() => this.props.onModalClose()}>
                        <Text >Modal is working</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default ModalContainer;