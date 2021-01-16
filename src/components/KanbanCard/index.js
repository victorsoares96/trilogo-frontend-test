/* eslint-disable no-restricted-globals */
import React from 'react';
import { Card, Dropdown, Menu, message, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { removeCard } from '@lourenci/react-kanban';

import './styles.css';

const KanbanCard = ({ id, description, type, responsible, image }, { dragging }) => {
  const { Text } = Typography;

  const handleRemoveCard = () => {
    const board = JSON.parse(localStorage.getItem('@board:'));
    const newBoard = removeCard(board, { id: 1 }, { id, description, type, responsible, image });
    localStorage.setItem('@board:', JSON.stringify(newBoard));
    message.success('Excluido!', 2, function () {
      location.reload();
    });
  }
  const menu = (
    <Menu className='dropdown-menu'>
      <Menu.Item key='update' className='dropdown-menu-item'>Editar</Menu.Item>
      <Menu.Item key='delete' className='dropdown-menu-item' onClick={handleRemoveCard}>Excluir</Menu.Item>
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