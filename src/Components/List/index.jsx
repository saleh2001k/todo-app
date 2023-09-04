import { useContext } from "react";
import "./List.scss";
import { SettingsContext } from "../../Context/Settings/index";
import { Paper, Text, Group, CloseButton, Checkbox } from "@mantine/core";
function List({ items, currentPage, deleteItem, toggleComplete }) {
  const settings = useContext(SettingsContext);

  settings.hideCompleted
    ? (items = items.filter((item) => !item.complete))
    : "";

  items = items.sort((a, b) => b[settings.sortWord] - a[settings.sortWord]);

  const itemsToDisplay = items.slice(
    (currentPage - 1) * settings.displayItems,
    currentPage * settings.displayItems
  );

  return (
    <>
      <div>
        {itemsToDisplay.map((item) => (
          <>
            <section className="list-item">
              <Paper withBorder p="lg" radius="md" shadow="md">
                <Group position="apart" mb="xs">
                  <Text fz="lg" fw={500}>
                    <span className="pendindg">Pending</span>
                    {item?.assignee?.toUpperCase()}
                  </Text>
                  <CloseButton
                    mr={-9}
                    mt={-9}
                    onClick={() => deleteItem(item.id)}
                  />
                </Group>
                <Text c="dimmed" fz="s">
                  {item.text}
                </Text>

                <Group position="apart" mt="lg">
                  <Text color="blue" size="xs">
                    Difficulty : {item.difficulty}
                  </Text>

                  {/* <Checkbox
                    key={item.id}
                    label="completed"
                    color="teal"
                    onChange={() =>
                      setTimeout(() => {
                        toggleComplete(item.id);
                      }, 200)
                    }
                  /> */}
                </Group>
              </Paper>
            </section>
          </>
        ))}
      </div>
    </>
  );
}

export default List;
