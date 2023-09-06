import React, { useState } from 'react';
import {
  Switch,
  Button,
  Grid,
  Col,
  TextInput,
  Paper,
  Text,
  Group,
  Badge,
  Checkbox,
  Divider,
} from '@mantine/core';
import { useSettings } from '../../Context/Settings/index';
import './Settings.scss';

function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  const [displayItems, setDisplayItems] = useState(settings.displayItems);
  const [hideCompleted, setHideCompleted] = useState(settings.hideCompleted);
  const [savedData, setSavedData] = useState({}); // State to hold saved data

  const handleSaveSettings = () => {
    const newSettings = {
      ...settings,
      displayItems,
      hideCompleted,
    };
    updateSettings(newSettings);

    // Update the saved data when settings are saved
    setSavedData(newSettings);
  };

  return (
    <div className="settings-page">
      <Grid gutter="lg">
        <Col span={6}>
          <Paper padding="lg" shadow="xs" className="settings-card">
            <h2 className="settings-heading">Application Settings</h2>
            <Divider margin="xs" />

            <div className="settings-item">
              <Switch
                labelPosition="left"
                label={<span>Hide Completed Items:</span>}
                size="md"
                checked={hideCompleted}
                onChange={() => setHideCompleted(!hideCompleted)}
              />
            </div>
            <div className="settings-item">
              <TextInput
                label="Display Items"
                type="number"
                value={displayItems}
                onChange={(e) => setDisplayItems(Number(e.target.value))}
              />
            </div>
            <div className="settings-item">
              <TextInput
                label="Sort Keyword"
                name="Keyword"
                type="text"
                placeholder="difficulty"
              />
            </div>

            <Divider margin="xs" />
            <div className="settings-footer">
              <Button
                type="submit"
                fullWidth
                radius="lg"
                size="lg"
                onClick={handleSaveSettings}
              >
                Save Settings
              </Button>
            </div>
          </Paper>
        </Col>
        <Col span={6}>
          <Paper padding="lg" shadow="xs" className="saved-data-card">
            <h2 className="settings-heading">Saved Data</h2>
            <Divider margin="xs" />

            <Text>
              Display Items: {savedData.displayItems || settings.displayItems}
            </Text>
            <Text>Hide Completed Items: {savedData.hideCompleted ? 'Yes' : 'No'}</Text>
          </Paper>
        </Col>
      </Grid>
    </div>
  );
}

export default SettingsPage;
