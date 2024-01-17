import {createSlice} from '@reduxjs/toolkit'

const userSlice =createSlice({
    name:'user',
    initialState:{
        user:{} ,
        follower:[],
        following:[],
     },
    reducers:{
    
        loginReducer(state,action){
            state.user=action.payload
        },
        logoutReducer(state,action){
            state.user={}
        },
        followerReducer(state,action){
            state.follower=action.payload
        },
        followingReducer(state,action){
            state.following=action.payload
        },
    
    }
})

export default  userSlice.reducer;

export const {addUser,loginReducer,logoutReducer,followerReducer,followingReducer} = userSlice.actions;
