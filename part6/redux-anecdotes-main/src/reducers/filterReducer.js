import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterReducer(state, action) {
            console.log(action.payload)
            return action.payload
        }
    }

})

export const { filterReducer } = filterSlice.actions
export default filterSlice.reducer