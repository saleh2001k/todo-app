import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form';

import { v4 as uuid } from 'uuid';
import { Title, Grid, Flex, Button, TextInput, Text, Slider } from '@mantine/core';
import List from '../List/';
import { ListContext } from '../../Context/dataList/dataList';
import LoginForm from '../LoginForm/LoginForm';
import Auth from '../auth/Auth';
import { LoginContext } from '../../Context/AuthContext/LoginContext';
import './Todo.scss'

const Todo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { data, dispatch } = useContext(ListContext)
  const { can } = useContext(LoginContext)
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    dispatch({ type: 'changeList', payload: item });
  }

  function deleteItem(id) {
    const items = data.list.filter(item => item.id !== id);
    dispatch({ type: 'replaceList', payload: items });
  }

  function toggleComplete(id) {
    if (can('update')) {

      const items = data.list.map(item => {
        if (item.id === id) {
          item.complete = !item.complete;
        }
        return item;
      });

      dispatch({ type: 'replaceList', payload: items })
    }

  }

  useEffect(() => {
    let incompleteCount = data.list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    localStorage.setItem('list', JSON.stringify(data.list))
  }, [data.list]);

  return (
    <Flex direction='column' justify='center' align={'center'} mih='80vh'>
      <LoginForm />
      <Auth capability="read">
        <Title ta={'center'} c={'white'} bg={'#343a40'} w='80%' p={"20px"} m={'auto'} data-testid="todo-h1" order={1}>To Do List: {incomplete} items pending</Title>
      </Auth>
      <Grid mih={'80vh'} justify='center' w={'80%'} grow gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} >
        <Grid.Col span={4}>
          <Auth capability="create">
            <form onSubmit={handleSubmit}>

              <h2>Add To Do Item</h2>

              <TextInput
                onChange={handleChange}
                name="text"
                placeholder="Task Details"
                label="To Do Item"
              />

              <TextInput
                onChange={handleChange}
                name="assignee"
                placeholder="For who?"
                label="Assigned To"
              />

              <Text>Difficulty</Text>
              <Slider
                color='indigo'
                onChange={handleChange}
                defaultValue={defaultValues.difficulty}
                step={1}
                min={1}
                max={5}
                name="difficulty"
              />
              <Button color='indigo' type="submit">Add Task</Button>
            </form>
          </Auth>
        </Grid.Col>
        <Grid.Col span={8}>
          <Auth capability="read">
            <List list={data.list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
          </Auth>
        </Grid.Col>
      </Grid>

    </Flex>
  );
};

export default Todo;