import React from 'react';
import {StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
import {Text, Icon, Layout, Input, Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import loginStyle from '../styles/loginStyle';
import axios from 'axios';
import {globalVariable} from '../GLOBAL_VARIABLE';
import {editProfile} from '../redux/actions';


class VerifyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      userId: this.props.user.userId,
      nric: '',
      password: '',
      message: '',
      isUpdated: this.props.isUpdated,
    };
  }


  handleEditProfile = () => {
    if (
      this.state.name == '' ||
      this.state.email == ''
    ) {
      this.setState({
        isUpdated: false,
        message: 'Name and email fields cannot be empty.',
      });
    } else {
      const user = {
        userId: this.props.user.userId,
        name: this.state.name,
        mobileNumber: this.state.mobileNumber,
        email: this.state.email
      }
      this.props.editProfile(user);
      setTimeout(() => {
        if (this.props.isUpdated) {
          this.props.navigation.replace('Tabs', {screen: 'Profile'});
        } else {
          this.setState({
            message: 'Unable to update profile.',
          });
        }
      }, 500);
    }

  };


  render() {
    let responseMessage;
    if (this.state.isUpdated) {
      responseMessage = (
        <Text style={loginStyle.message} status="success">
          {this.state.message}
        </Text>
      );
    } else {
      responseMessage = (
        <Text style={loginStyle.message} status="danger">
          {this.state.message}
        </Text>
      );
    }

    return (
      <Layout style={styles.layout}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#ffffff"
          translucent={true}
        />
        <Text style={styles.header} category="h4">
          Verify Account
        </Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Layout style={styles.container}>
            <Input
              label="NRIC"
              value={this.state.nric}
              onChangeText={(text) => this.setState({nric: text})}
            />
            <Input
              label="Password"
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
            />
            
            <Button
              style={styles.button}
              onPress={() => this.handleEditProfile()}>
              UPDATE PROFILE
            </Button>
            {responseMessage}
          </Layout>
        </TouchableWithoutFeedback>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 15,
    fontFamily: 'Karla-Bold',
  },
  button: {
    marginTop: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isUpdated: state.isUpdated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (user) => {
      dispatch(editProfile(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);