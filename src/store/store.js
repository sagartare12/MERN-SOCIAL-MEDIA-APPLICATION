import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/UserSlice";

import routerSlice from "./slices/RouterSlice"

const store = configureStore({
    reducer:{
        users:userSlice,
        routers:routerSlice
    }
})

export default store