import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive'

import './styles.css';
import logo from '../../assets/images/trilogo-logo.png';
import NewTicketForm from '../NewTicketForm';

function Header() {
  const { Header } = Layout;  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(min-width: 767px)' })

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Header className='header'>
      <div className='header-content'>
        <img src={logo} alt='trílogo' />

        <Modal 
        className='modal-new-ticket'
        title="Novo ticket" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}>
          <NewTicketForm closeModal={handleOk} />
        </Modal>    
        <Button className='button-container' type="primary" shape="round" icon={<PlusOutlined />} size='large' onClick={showModal}>
          {isTabletOrMobile && 'Novo ticket'}
        </Button>
      </div>
    </Header>
  )
}

export default Header;