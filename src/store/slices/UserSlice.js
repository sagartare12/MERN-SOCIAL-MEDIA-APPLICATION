import {createSlice} from '@reduxjs/toolkit'

const userSlice =createSlice({
    name:'user',
    initialState:{
        user:{} ,
     },
    reducers:{
    
        loginReducer(state,action){
            console.log(action.payload)
            // state.push(action.payload)
            state.user=action.payload.user;
        },
        logoutReducer(state,action){
            state.user={}
        }
    }
})

export default  userSlice.reducer;

export const {addUser,loginReducer,logoutReducer} = userSlice.actions;
