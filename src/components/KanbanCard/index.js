import { Card, Dropdown, Menu, Typography } from 'antd';
import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

import './styles.css';

const KanbanCard = ({ id, description, type, responsible, image }, { removeCard, dragging }) => {
  const { Text } = Typography;

  function handleMenuClick(e) {
    console.log('click', e);
  }
  const menu = (
    <Menu className='dropdown-menu' onClick={handleMenuClick}>
      <Menu.Item key='update' className='dropdown-menu-item'>Editar</Menu.Item>
      <Menu.Item key='delete' className='dropdown-menu-item'>Excluir</Menu.Item>
    </Menu>
  );
  
  return (
    <Card
      size='small'
      className='kanban-card'
      style={{ backgroundColor: dragging && 'rgba(0, 0, 0, 0.10)' }}
    >
      <div className='kanban-card-content'>
        {image && <img alt={id} src={image} />}

        <div className='kanban-chip'>
          <h5>{type}</h5>
        </div>

        <h4>{id}</h4>
        <p>{description}</p>
      </div>

      <div className='kanban-card-footer'>
        <Text className='responsible'>
          {responsible}
        </Text>

        <Dropdown.Button type='text' overlay={menu} trigger={['click']} icon={<EllipsisOutlined style={{ fontSize: 36, color: '#8d89a5' }} />} />
      </div>
    </Card>
  )
}

export default KanbanCard;