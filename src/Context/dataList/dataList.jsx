import React, { useReducer } from 'react';
import { initialState, listReducer } from '../../hooks/Reducer/listReducer';

export const ListContext = React.createContext();

function ListsSaver({ children }) {
    const [data, dispatch] = useReducer(
        listReducer,
        initialState,
        () => {
            const localData = localStorage.getItem('list');
            return localData ? { list: JSON.parse(localData) } : initialState;
        }
    );

    const ManagedList = { data, dispatch };

    return (
        <ListContext.Provider value={ManagedList}>
            {children}
        </ListContext.Provider>
    );
}

export default ListsSaver;
