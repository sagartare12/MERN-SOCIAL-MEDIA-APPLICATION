import {createSlice} from '@reduxjs/toolkit'

const userSlice =createSlice({
    name:'user',
    initialState:{
        user:{} ,
        follower:[],
        following:[],
        followUnfollow:{
            data:{
                updatedUser:{
                    followers:0,
                    following:0
                }
            }
        },
        userData:{}
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
        followUnfollowReducer(state,action){
            state.followUnfollow=action.payload
            
        },

        usersData(state,action){
            state.userData=action.payload
        },
        updateUserReducer(state,action){
            state.user.user=action.payload
           
            
        }


    
    }
})

export default  userSlice.reducer;

export const {addUser,loginReducer,logoutReducer,followerReducer,followingReducer,updateUserReducer,followUnfollowReducer,usersData} = userSlice.actions;
