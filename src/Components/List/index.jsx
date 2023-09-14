import React, { useContext, useState } from 'react';
import {
  Card,
  Text,
  Badge,
  Button,
  Flex,
  Pagination,
} from '@mantine/core';
import { SettingContext } from '../../Context/Settings/index';
import Auth from '../auth/Auth';
import './List.scss';

export default function List({ list, toggleComplete, deleteItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { settings } = useContext(SettingContext);

  const tasksToDisplay = list
    .filter((task) => settings.showDone || !task.complete)
    .slice(
      (currentPage - 1) * settings.taskPerPage,
      currentPage * settings.taskPerPage
    );

  const totalPages = Math.ceil(
    tasksToDisplay.length / settings.taskPerPage
  );

  return (
    <div>
    {tasksToDisplay.map((item) => (
      <Card
        data-testid='task-card'
        className='task-card'
        key={item.id}
      >
        <Card.Section className='task-card-section'> 
          <Flex justify='space-between'>
            <Text>Task: {item.text}</Text>
            <Text>Assigned to: {item.assignee}</Text>
            <Text>Difficulty: {item.difficulty}</Text>
            <Badge
              data-testid='btn-done'
              className='btn-done' 
              color={item.complete ? 'green' : 'pink'}
              variant='light'
              onClick={() => toggleComplete(item.id)}
            >
              {item.complete ? 'Done' : 'ToDo'}
            </Badge>
            <Auth capability='delete'>
              <Button
                onClick={() => deleteItem(item.id)}
                className='delete-button' 
              >
                Delete
              </Button>
            </Auth>
          </Flex>
        </Card.Section>
      </Card>
    ))}

    <Pagination
      onChange={setCurrentPage}
      m='20px'
      color='indigo'
      total={totalPages}
    />
  </div>
);
}