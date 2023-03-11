import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import dogsReducer from '../features/dogs/dogSlice'

export default configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
    dog: dogsReducer, 
  },
})