import {createSlice} from '@reduxjs/toolkit'

const postSlice =createSlice({
    name:'post',
    initialState:{
        posts:[] ,
        allPosts:[]
     },
    reducers:{
    
      createPostReducer(state,action){
           console.log(action.payload)
            state.posts.push(action.payload)
        },
        allPostsReducer(state,action){
            state.allPosts=action.payload
            console.log( action.payload)
        }
     
    }
})

export default  postSlice.reducer;

export const {createPostReducer,allPostsReducer} = postSlice.actions;
