import React from "react";
import "./List.scss";
import { useSettings } from "../../Context/Settings/index";
import { Paper, Text, Group, CloseButton, Checkbox } from "@mantine/core";
import Auth from '../auth/Auth';


function List({ items, currentPage, deleteItem, toggleComplete }) {
  const { settings } = useSettings();

  const filteredItems = settings.hideCompleted
    ? items.filter((item) => !item.complete)
    : items;

  const sortedItems = filteredItems.sort(
    (a, b) => b[settings.sortField] - a[settings.sortField]
  );

  const startIndex = (currentPage - 1) * settings.displayItems;
  const endIndex = startIndex + settings.displayItems;
  const itemsToDisplay = sortedItems.slice(startIndex, endIndex);

  return (
    <div>
      {itemsToDisplay.map((item) => (
        <section className="list-item" key={item.id}>
          <Paper withBorder p="lg" radius="md" shadow="md">
            <Group position="apart" mb="xs">
              <Text fz="lg" fw={500}>
                <span className="pending">Pending</span>
                {item?.assignee?.toUpperCase()}
              </Text>
              <Auth capability="delete">
                <CloseButton
                  mr={-9}
                  mt={-9}
                  onClick={() => deleteItem(item.id)}
                />
              </Auth>
            </Group>
            <Text c="dimmed" fz="s">
              {item.text}
            </Text>
            <Group position="apart" mt="lg">
              <Text color="blue" size="xs">
                Difficulty: {item.difficulty}
              </Text>
              <Checkbox
                label="completed"
                color="teal"
                checked={item.complete}
                onChange={() => toggleComplete(item.id)}
              />
            </Group>
          </Paper>
        </section>
      ))}
    </div>
  );
}

export default List;
