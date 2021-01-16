import React, { useEffect, useState } from  'react';
import { Layout } from 'antd';
import Board, { moveCard } from '@lourenci/react-kanban';

import KanbanCard from '../../components/KanbanCard';
import ticketIssue from '../../assets/images/ticket-issue.png';

import '@lourenci/react-kanban/dist/styles.css'
import './styles.css';

function Home() {
  const { Content } = Layout;
  const initialBoard = {
    columns: [
      {
        id: 1,
        title: 'Abertos',
        color: 'rgba(245, 34, 45, 0.25)',
        cards: [
          {
            id: 6523,
            description: 'Consertar o vazamento',
            type: 'Procedimento',
            responsible: 'Yudi Tamashiro',
            image: ''
          },
          {
            id: 6524,
            description: 'Consertar o vazamento',
            type: 'Procedimento',
            responsible: 'Priscilla Alcântara',
            image: ticketIssue
          },
          {
            id: 6525,
            description: 'Consertar o vazamento',
            type: 'Procedimento',
            responsible: 'Yudi Tamashiro',
            image: ''
          },
          {
            id: 6526,
            description: 'Consertar o vazamento',
            type: 'Procedimento',
            responsible: 'Yudi Tamashiro',
            image: ''
          },
          {
            id: 6527,
            description: 'Consertar o vazamento',
            type: 'Procedimento',
            responsible: 'Yudi Tamashiro',
            image: ''
          },
          {
            id: 6528,
            description: 'Consertar o vazamento',
            type: 'Procedimento',
            responsible: 'Yudi Tamashiro',
            image: ''
          }
        ]
      },
      {
        id: 2,
        title: 'Executados',
        color: 'rgba(212, 102, 45, 0.25)',
        cards: []
      },
      {
        id: 3,
        title: 'Vistoriados',
        color: 'rgba(82, 212, 26, 0.25)',
        cards: []
      },
      {
        id: 4,
        title: 'Arquivados',
        color: 'rgba(193,185,185, 0.25)',
        cards: []
      }
    ]
  }
  
  const [board, setBoard] = useState(initialBoard);

  const handleCardMoving = (_card, source, destination) => {
    console.log('board', _card);
    console.log('source', source);
    console.log('dest', destination);
    console.log(moveCard);
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);
  }

  useEffect(() => {
    async function loadInitialBoard() {
      const initialBoard = JSON.parse(localStorage.getItem('@board:'));
      if(initialBoard) {
        console.log(initialBoard);
        setBoard(initialBoard);
      }
    }
    loadInitialBoard();
  }, []);

  useEffect(() => {
    // Save board state in localStorage
    localStorage.setItem('@board:', JSON.stringify(board));
  }, [board]);
  return (
    <Content style={{ display: 'flex', justifyContent: 'center' }}>
      <Board 
      disableColumnDrag
      onCardDragEnd={handleCardMoving}
      renderCard={KanbanCard}
      renderColumnHeader={({ title, color }) => (
        <div className='react-kanban-custom-column-header' style={{ backgroundColor: color }}>
          <h4>{title}</h4>
        </div>
      )}>
        {board}
      </Board>
    </Content>
  )
}

export default Home;