import React, { useReducer } from 'react';
import { initialState, listReducer } from '../../hooks/Reducer/listReducer';

export const ListContext = React.createContext();

function ListsSaver({ children }) {
    const [data, dispatch] = useReducer(
        listReducer,
        initialState,
        () => {
            const localData = localStorage.getItem('list');
            console.log('Local Data:', localData); // Add this line for debugging
            return localData ? { list: JSON.parse(localData) } : initialState;
        }
    );

    const ManagedList = { data, dispatch };
    console.log('ManagedList:', ManagedList); // Add this line for debugging

    return (
        <ListContext.Provider value={ManagedList}>
            {children}
        </ListContext.Provider>
    );
}

export default ListsSaver;
