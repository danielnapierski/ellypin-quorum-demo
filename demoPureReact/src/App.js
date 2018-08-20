import React, { Component } from 'react';
import './App.css';
import Index from './components/Index';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout

class App extends Component {
  render() {
    return (
      <Layout>
        <Header className="header" title="ELLYPIN">
          <h2 style={{color:'white'}}>
            ELLYPIN DEMO
          </h2>
          <div className="logo" />
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <div>
            <Index />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          ELLYPIN ©2018
        </Footer>
      </Layout>
    );
  }
}

export default App;
