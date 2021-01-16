import React from 'react';
import './App.less';
import { Layout } from 'antd';

/**
 * Pages
 */
import Header from './components/Header';
import Home from './pages/Home';

const App = () => {
  return (
    <Layout>
      <Header />
      <Home />
    </Layout>
  )
}

export default App;