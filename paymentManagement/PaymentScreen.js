import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Layout,
  Card,
  Divider,
  List,
  ListItem,
  Icon,
} from '@ui-kitten/components';
import {globalVariable} from '../GLOBAL_VARIABLE';
import axios from 'axios';

class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      transactionListCounter: 5,
    };
  }

  componentDidMount() {
    this.getTransactions(this.state.user.userId);
  }

  //obtain the list of transactions
  async getTransactions(userId) {
    try {
      const response = await axios.get(
        globalVariable.transactionApi + `by/${userId}`
      );
      console.log(response);
      this.setState({
        transactions: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //render the list of transactions
  renderItem = ({item, index}) => {
    const counter = 4;
    if (counter > index) {
      if (item.senderWalletId === this.state.user.Wallet.walletId) {
        return (
          <TouchableOpacity onPress={() => {}}>
            <ListItem
              style={styles.listItemMinus}
              title={`- SGD ${item.amount}`}
              description={item.description}
            />
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity onPress={() => {}}>
            <ListItem
              style={styles.listItemPlus}
              title={`+ SGD ${item.amount}`}
              description={item.description}
            />
          </TouchableOpacity>
        );
      }
    }
  };

  render() {
    return (
      <Layout style={styles.layout}>
        <Text style={styles.header} category="h4">
          Wallet
        </Text>
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('TopUp')}
        >
          <Icon style={styles.setting} name="settings-outline" fill="#777" />
        </TouchableOpacity>
        <ScrollView style={styles.container}>
          <Card style={styles.card}>
            <Text style={styles.label}>Balance</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginTop: 5}}>SGD</Text>
              <Text style={styles.money}>{this.state.user.Wallet.balance}</Text>
            </View>
          </Card>

          <Card>
            <Text style={styles.action}>Quick Actions</Text>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TopUp')}
                style={styles.buttonItem}>
                <Image
                  source={require('../img/topUp.png')}
                  style={styles.imageContainer}
                />
                <Text style={styles.subtitle}>Top-Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MakePayment')}
                style={styles.buttonItem}>
                <Image
                  source={require('../img/sendMoney.png')}
                  style={styles.imageContainer}
                />
                <Text style={styles.subtitle}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.buttonItem}>
                <Image
                  source={require('../img/withdraw.png')}
                  style={styles.imageContainer}
                />
                <Text style={styles.subtitle}>Withdraw</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.buttonItem}>
                <Image
                  source={require('../img/donate.png')}
                  style={styles.imageContainer}
                />
                <Text style={styles.subtitle}>Donate</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
        <Card style={styles.transaction}>
          <Text style={styles.action}>Recent Transactions</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TransactionsList')}>
            <Text style={styles.link}>Show all</Text>
          </TouchableOpacity>
          <List
            keyExtractor={(item) => item.transactionId}
            style={styles.listContainer}
            data={this.state.transactions}
            ItemSeparatorComponent={Divider}
            renderItem={this.renderItem}
          />
        </Card>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    //flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginTop: 60,
    marginLeft: 15,
    fontFamily: 'Karla-Bold',
  },
  card: {
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#ededed',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  actionContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  label: {
    color: '#3366FF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  action: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  money: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    marginTop: 10,
    paddingBottom: 30,
    textAlign: 'center',
  },
  buttonItem: {
    paddingTop: 20,
    marginLeft: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  link: {
    textAlign: 'right',
    marginTop: 10,
  },
  transaction: {
    marginTop: 20,
    marginBottom: 20,
  },
  listContainer: {
    maxHeight: 200,
  },
  listItemMinus: {
    paddingTop: 10,
    color: '#fff',
  },
  listItemPlus: {
    paddingTop: 10,
    color: 'green',
  },
  setting: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(PaymentScreen);
