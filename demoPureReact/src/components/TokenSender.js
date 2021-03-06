import React from 'react'
//import getWeb3 from '../utils/getWeb3'
import { getRealTokenNumbers } from '../utils/utils'
import { Alert, Button, Card, Col, Form, Input, Row } from 'antd';
import { contractABI, contractAddress } from '../contract/contractInfo'
import openNotification from './Notification'

var Web3 = require('web3');

const FormItem = Form.Item;
//const Container = Layout.Container;
const queryString = require('query-string');

class TokenSender extends React.Component {

  constructor(props) {
    super(props);

      var x = queryString.parse(queryString.extract(window.location.href));
//      console.log('x: ' + JSON.stringify(x));
      var y = JSON.parse(JSON.stringify(x));
      console.log('y: ' + y.node);
      
      this.state = {
      totalTokens: 0,
      tableData: null,
      web3: null,
      contract: null,
	  accounts: [],
	  node: y.node,
      etherBalance: 0,
	  tokenBalance: 0,
	  tokens: [],
      isAdminWallet: false,
	network: '',
	tokenId: ''
    }

//      var parsed = QueryString.parse(props.search.location);
//      console.log('props: ' + JSON.stringify(props.location));
      //      var x = require('query-string');
//      var x = queryString.parse(queryString.extract(window.location.href));
//      console.log('x: ' + JSON.stringify(x));
//      console.log('href: ' + JSON.stringify(window.location.href));
  }

    componentDidMount() {
//	console.log('search: ' + JSON.stringify(QueryString));
	
    }
    
  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
//    getWeb3
//      .then(results => {
//        this.setState({
//          web3: results.web3
//        })

        // Instantiate contract once web3 provided.
//        this.instantiateContract()
//      })
//      .catch(() => {
//        console.log('Error finding web3.')
//      })

//      console.log('Web3: ' + (typeof Web3.givenProvider));




      // THIS WORKED FOR RETRIEVAL NOT SENDING: var web3 = new Web3(Web3.givenProvider);
      //node1      var web3 = new Web3("http://40.117.116.172:22000");

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

      //      console.log('web3: ' + (typeof web3));
      web3.eth.getAccounts(console.log);
//      console.log(web3.eth.defaultAccount);
      console.log(web3.version);

      this.setState({web3: web3}, ()=>{
	  console.log('setstate');
	  this.instantiateContract();
      });
      
      
	  // initialize web3
//	  if(typeof web3 !== 'undefined') {
	      //reuse the provider of the Web3 object injected by Metamask
//	      App.web3Provider = web3.currentProvider;
//	      console.log('web3.currentProvider: ' + web3.currentProvider);
//	  } else {
	      //create a new provider and plug it directly into our local node
	      //	      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
//	      console.log('?');
//	  }
//      web3 = new Web3(App.web3Provider);

//      App.displayAccountInfo();

//      return App.initContract();
	  
  }

    onChange = (e) => {
	//        console.log('onChange: type:' + JSON.stringify(e.type) + ' value: ' +  e.target.value);
	this.setState({ tokenId: parseInt(e.target.value,10) });
    }

    sendToken(){
//	console.log('send token ' + this.state.tokenId + ' approve: ' + this.state.toAddress);

	var toAddr = '';
	switch(parseInt(this.state.node, 10)){
	case 7:
	    toAddr = "0xed9d02e382b34818e88B88a309c7fe71E65f419d";
	    break;
	default:
	    toAddr = "0xa9e871F88CBeb870d32D88E4221dcfBD36Dd635a";
	    break;
	}
	
	const fromAddr = this.state.accounts[0];
	const contractAddr = this.state.contract.options.address;
	console.log('from: ' + fromAddr + ' to: ' + toAddr + ' contract: ' +  contractAddr);
	
//	this.state.web3.eth.defaultAccount = fromAddr;	
	this.state.web3.eth.personal.unlockAccount(fromAddr, '', 1000).then(()=>{
	    console.log('from: ' + fromAddr + ' to: ' + toAddr + ' contract: ' + contractAddr);

	this.state.contract.methods.approve(toAddr, this.state.tokenId)
		.send({ from: fromAddr, to: contractAddr, chainId: 10 }, function (error, transactionHash) {
			if (error) {
			    console.log('ERROR: ' + error);
			} else {
			    console.log('tx hash: ' + transactionHash);
			}
	    });
	});
    }

    transferToken(){
	var fromAddr = '';
	switch(parseInt(this.state.node, 10)){
	case 7:
	    fromAddr = "0xed9d02e382b34818e88B88a309c7fe71E65f419d";
	    break;
	default:
	    fromAddr = "0xa9e871F88CBeb870d32D88E4221dcfBD36Dd635a";
	    break;
	}
	
	const toAddr = this.state.accounts[0];
	const contractAddr = this.state.contract.options.address;
	console.log('from: ' + fromAddr + ' to: ' + toAddr + ' contract: ' + contractAddr);

	this.state.web3.eth.personal.unlockAccount(toAddr, '', 1000).then(()=>{
	
	    this.state.contract.methods.transferFrom(fromAddr, toAddr, this.state.tokenId)
		.send({ from: toAddr, to: contractAddr, gas: 0, gasLimit: 900020, chainId: 10 }, function (error, transactionHash) {
		if (error) {
		    console.log('ERROR: ' + error);
		} else {
		    console.log('tx hash: ' + transactionHash);
		}
	    });
	});
    }
    
    
  instantiateContract() {
      console.log('web3.version: ' + JSON.stringify(this.state.web3.version));
      console.log('web3.defaultAccount: ' + JSON.stringify(this.state.web3.eth.defaultAccount));
    // 1.0.0-beta.34

//    let accounts = [];
    this.state.web3.eth.getAccounts()
      .then((res, err) => {
        this.setState({ accounts: res });
          console.log('accounts result: ' + res[0]);

//	  console.log('web3.defaultAccount: ' + JSON.stringify(this.state.web3.eth.defaultAccount));
	
        this.state.web3.eth.getBalance(this.state.accounts[0])
          .then(result => {
            this.setState({ etherBalance: result/1000000000000000000 });
            console.log('balance result: ' + result);

            const contractTmpABI = contractABI
            let _contract = new this.state.web3.eth.Contract(contractTmpABI, contractAddress);
//            var p = this.state.web3.eth.contract(contractTmpABI).at(contractAddress)
            this.setState({ contract: _contract });
            console.log('contract address: ' + this.state.contract.options.address + ' ===? ' + contractAddress);
//            console.log('totalSupply: ' + JSON.stringify(this.state.contract.methods.totalSupply()));
//            this.setState({ totalTokens: this.state.contract.methods.totalSupply()});

            let _this = this;
            this.state.contract.methods.totalSupply().call().then(function(supply){
              console.log('totalSupply: ' + supply);
              _this.setState({ totalTokens: supply});
            });

            this.state.contract.methods.balanceOf(this.state.accounts[0]).call().then(function(bal){
              console.log('bal: ' + bal);
              _this.setState({ tokenBalance: bal});
            })

	      var i;
	      var tokens = [];
	      for (i = 1001; i <= 1020; i++) {
		  const _i = i;
 	  this.state.contract.methods.ownerOf(i).call().then(function(o){
	      if (o === _this.state.accounts[0])
	      {
		  tokens.push(_i);
		  _this.setState({tokens: tokens});
//		  console.log('tokens: ' + JSON.stringify(tokens));
//		  console.log('i: ' + _i);
	      }
	      //		  console.log('owner: ' + (o === _this.state.accounts[0]));
	    });
	  }
							     console.log(JSON.stringify(tokens));      
            this.state.web3.eth.net.getNetworkType((err, netWork) => {
              console.log('network: ' + netWork);
              _this.setState({ network: netWork});
            })
          });
      });
  }

// see https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#eth-contract
  startTransaction() {
    const receivers = [];
    const values = [];
    const dataTable = this.state.tableData;
    const column1 = "address";
    const column2 = "value";
    let formatError = false;
    let addressInvalid = '';
    let numberInvalid = '';

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

      if (dataTable[i] !== undefined && (dataTable[i][column2] === undefined || dataTable[i][column2] === 0)) {
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
    if(this.state.etherBalance === 0) {
      openNotification("Your Ether Balance is 0");
      return;
    }

    //check token balance is not enough
    if(this.state.totalTokens > this.state.tokenBalance) {
      let msg = "Your TOKEN Balance " + this.state.tokenBalance +
      " < total TOKEN tokens " + this.state.totalTokens;
      openNotification(msg);
      return;
    }

    const freeze = true;
    this.state.contract.methods.batchVipWtihLock(receivers, values, freeze)
      .send({ from: this.state.accounts[0] }, function (error, transactionHash) {
        if (error) {
          console.log(error);
        }
      });
  }

  render() {
    return (
      <div>
        <Card title="Demo">
          <Alert
            message="This is only a demo."
            type="error" />
        </Card>
        <Card style={{background:"#e6f7ff"}}>
          <div>
          <Row>
              <Col span={10}>
              <h3>ERC721Token Contract Address:</h3> {contractAddress}
              </Col>
              <Col span={5}>
              <h3>Network:</h3> {this.state.network}
              </Col>
              <Col span={3}>
              <h3>ERC721 Total Tokens:</h3> {this.state.totalTokens}
              </Col>
          </Row>
          <Row>
              <Col span={10}>
              <h3>My Wallet Address:</h3> {this.state.accounts[0]}
              </Col>
              <Col span={5}>
              <h3>Ether Balance:</h3> {this.state.etherBalance}
              </Col>
              <Col span={5}>
              <h3>ERC721Token Balance:</h3> {this.state.tokenBalance}
              </Col>
          </Row>
          </div>
            </Card>
	    <Card>
	    <div>
	    Serial Numbers of Tokens Owned: {JSON.stringify(this.state.tokens.sort(function(a,b) { return a-b; }))}
	    </div>
	    </Card>
	    <Card>
	    Enter Token Serial Number: 
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
	    this.sendToken()
	}}
	htmlType="submit">Approve Token</Button>
	    </FormItem>
	    

	<FormItem>
	    <Button type="primary"
	onClick={(e) => {
	    e.preventDefault();
	    this.transferToken();
	}}
	htmlType="submit">Transfer From Token</Button>
	    </FormItem>
	    </Form>
	    </Card>
      </div>
    )
  }
}

export default TokenSender;
