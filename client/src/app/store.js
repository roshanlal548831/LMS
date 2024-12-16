import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";

export  const appStore = configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
});

const initialzeApp = async()=>{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
};

initialzeApp()