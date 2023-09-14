import React, { useContext } from 'react'
import { SettingContext } from '../../Context/Settings/index'
import './Settings.scss'

export default function SettingPage() {
  const { settings, dispatch } = useContext(SettingContext)

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2 className="settings-title">Application Settings</h2>

        <label className="settings-label">
          Show Completed ToDos
          <input
            type="checkbox"
            checked={settings.showDone}
            onChange={(e) => dispatch({ type: 'changeShow', payload: e.currentTarget.checked })}
            data-testid="show-completed-switch"
          />
        </label>

        <div className="settings-input">
          <label htmlFor="itemsPerPage">Items Per page</label>
          <input
            type="number"
            id="itemsPerPage"
            value={settings.taskPerPage}
            onChange={(e) => dispatch({ type: 'changeTasksNum', payload: e.target.value })}
            placeholder="Items Per page"
            data-testid="items-per-page-input"
          />
        </div>

        <div className="settings-input">
          <label htmlFor="sortKeyword">Sort Keyword</label>
          <input
            type="text"
            id="sortKeyword"
            value={settings.sortBy}
            onChange={(e) => dispatch({ type: 'changeSort', payload: e.target.value })}
            placeholder="Sort Keyword"
            data-testid="sort-keyword-input"
          />
        </div>
      </div>

      <div className="updated-settings-card">
        <h2 className="updated-settings-title">Updated Settings</h2>
        <p className="setting-item">{settings.showDone ? 'Show' : 'Hide'} Completed ToDos</p>
        <p className="setting-item">Items Per page: {settings.taskPerPage}</p>
        <p className="setting-item">Sort Keyword: {settings.sortBy}</p>
      </div>
    </div>
  )
}
