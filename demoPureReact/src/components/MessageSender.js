import React from 'react'
import getWeb3 from '../utils/getWeb3'
import { Row, Col,  Card, Button, Input, Form } from 'antd';
import { storageABI, storageAddress } from '../contract/contractInfo'

const FormItem = Form.Item;
const Web3 = require('web3');
const queryString = require('query-string');

class MessageSender extends React.Component {

  constructor(props) {
    super(props);

      var x = queryString.parse(queryString.extract(window.location.href));
      //      console.log('x: ' + JSON.stringify(x));
      var y = JSON.parse(JSON.stringify(x));
      console.log('y: ' + y.node);
      
      this.state = {
      web3: null,
      storage: null,
      message: "",
      text: "",
      sender: 0x00,
      accounts: [],
	etherBalance: 0,
	node: y.node
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
	  .then(results => {
//	      if (typeof results.web3 === 'undefined') {
//		  const web3 = new Web3('http://localhost:22000');
//		  this.setState(web3: web3);
//	      } else {
//		  this.setState(web3: results.web3);
//	      }

	      var url = '';
	      //      console.log(this.state.node);

	      switch(parseInt(this.state.node, 10)){
	      case 1:
		  url = "http://40.117.116.172:22000";
		  break;
	      case 2:
		  url = "http://40.117.116.172:22001";
		  break;
	      case 3:
		  url = "http://40.117.116.172:22002";
		  break;
	      case 4:
		  url = "http://40.117.116.172:22003";
		  break;
	      case 5:
		  url = "http://40.117.116.172:22004";
		  break;
	      case 6:
		  url = "http://40.117.116.172:22005";
		  break;
	      case 7:
		  url = "http://40.117.116.172:22006";
		  break;
	      default:
		  url = "http://40.117.116.172:22000";
		  break;
	      }
	      console.log('URL: ' + url);
	      var web3 = new Web3(url);
//	      console.log('URL done');
//	      this.setState({web3: web3}).then(()=>{this.instantiateStorage});
//	      console.log('web3 set ...');

	      this.setState({web3: web3}, ()=>{
		  console.log('setstate2');
		  this.instantiateStorage();
	      });
	      
        // Instantiate storage once web3 provided.
        //this.instantiateStorage()
      })
      .catch(() => {
          console.log('Error finding web3.')

//	  const web3 = new Web3('http://40.117.116.172:22000');
//	  console.log('web3 version: ' + web3.version);
//	  this.setState({web3: web3}, () => { this.instantiateStorage()}); 

	  
      })
  }

    instantiateStorage() {
      console.log('web3.version: ' + JSON.stringify(this.state.web3.version));
      // 1.0.0-beta.34

      this.state.web3.eth.getAccounts()
        .then((res, err) => {
          this.setState({ accounts: res });
            console.log('accounts result: ' + res);

//	    console.log('personal: ' + this.state.web3.eth.personal);
	    this.state.web3.eth.personal.unlockAccount(this.state.accounts[0], '').then(console.log);    
//	    const personal = this.state.web3.personal;
	    // THIS IS A SYNC CALL (WTF?)
//	    const r = personal.unlockAccount(this.state.accounts[0], '');
//	    console.log('r: ' + r);

          const storageTmpABI = storageABI
          let _storage = new this.state.web3.eth.Contract(storageTmpABI, storageAddress);
          this.setState({ storage: _storage });
          console.log('storage address: ' + this.state.storage.options.address + ' ===? ' + storageAddress);

          let _this = this;
          this.state.storage.methods.get().call().then(function(msg){
            console.log('message: ' + msg);
            _this.setState({ message: msg});
          });

          this.state.storage.methods.sender().call().then(function(sndr){
            console.log('sender: ' + sndr);
            _this.setState({ sender: sndr});
          });


      });
    }


      onChange = (e) => {
//        console.log('onChange: type:' + JSON.stringify(e.type) + ' value: ' +  e.target.value);
        this.setState({ text: e.target.value });
      }

      sendMessage() {
/*
        const receivers = [];
//        const values = [];
//        const dataTable = this.state.tableData;
//        const column1 = "address";
//        const column2 = "value";
//        let formatError = false;
//        let addressInvalid = '';
//        let numberInvalid = '';

        //check invalid address and invalid token (null or 0)
        for (let i = 0; dataTable.length > i; i++) {
          if (!this.state.web3.utils.isAddress(dataTable[i][column1])) {
            formatError = true;
            addressInvalid += 'Address Format Error ' + dataTable[i][column1] + "\n";
          }

          if (dataTable[i] !== undefined && dataTable[i][column2].indexOf(',') !== -1) {
            formatError = true;
            numberInvalid += 'Value Format Error, number cannot contain ",": ' + dataTable[i][column1] + "\n";
          }

          if (dataTable[i] !== undefined && (dataTable[i][column2] === undefined || dataTable[i][column2] == 0)) {
            formatError = true;
            numberInvalid += 'Value cannot be null or 0 for Address: ' + dataTable[i][column1] + "\n";
          }

          receivers.push(dataTable[i][column1]);
          values.push(getRealTokenNumbers(dataTable[i][column2]));
        }
        if (formatError) {
          openNotification(addressInvalid + numberInvalid);
          return;
        }

        //check this wallet is admin
        if(!this.state.isAdminWallet) {
          openNotification("This wallet is not Admin, please switch to admin wallet or request admin ");
          return;
        }

        //check ehter balance is not enough
        if(this.state.etherBalance == 0) {
          openNotification("Your Ether Balance is 0");
          return;
        }

        //check token balance is not enough
        if(this.state.totalTokens > this.state.tokenBalance) {
          let msg = "Your TOKEN Balance " + this.state.tokenBalance +
          " < total TOKEN tokens " + this.state.totalTokens;
          openNotification(msg);
          return;
        }*/

//The following worked on sudo node web3 with ipc:
//c.methods.set("HI").send({ from: "0xed9d02e382b34818e88B88a309c7fe71E65f419d", to: addr, gas: 30000000, privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]}, function (error, transactionHash) {  if (error) {  console.log(error);  } else {   console.log(transactionHash);  }});


	  
        const _text = this.state.text;
        console.log('TODO: send text: ' + _text + ' from: ' + this.state.accounts[0] + ' to: ' + this.state.storage.options.address);

	  const _this = this;
// set nonce? gas?  gasPrice?  chainId?
          this.state.web3.eth.personal.unlockAccount(this.state.accounts[0], '').then(console.log).then(	  function(){

	      console.log(_this.state.accounts[0]);
	      console.log(_this.state.storage.options.address);
	      
	      
        _this.state.storage.methods.set(_text)
		  .send({ from: _this.state.accounts[0], to: _this.state.storage.options.address, gas: 30000000, privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]}, function (error, transactionHash) {
		      if (error) {
			  console.log('from: ' + _this.state.accounts[0]);
              console.log('ERROR: ' + error);
            } else {
              console.log('tx hash: ' + transactionHash);
            }
              })
	  });
      }
//chainId: 10,

      render() {
        return (
          <div>
            <Card style={{background:"#e6f7ff"}}>
              <div>
              <Row>
                  <Col span={10}>
                  <h3>Storage Contract Address:</h3> {storageAddress}
                  </Col>
                  <Col span={5}>
                  <h3>Message:</h3> {this.state.message}
                  </Col>
                  <Col span={3}>
                  <h3>Sender:</h3> {this.state.sender}
                  </Col>
              </Row>
              </div>
            </Card>
            <Card>
              <Form layout="inline" >
                <FormItem>
                  <Input type="text"
                    onChange={this.onChange.bind(this)}
                  />
                </FormItem>

                <FormItem>
                  <Button type="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.sendMessage()
                    }}
                    htmlType="submit">Send Message</Button>
                </FormItem>
              </Form>
            </Card>
          </div>
        )
      }
    }

export default MessageSender;
