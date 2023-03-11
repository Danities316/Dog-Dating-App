require('file-loader?name=[name].[ext]!./index.html');
import regeneratorRuntime from "regenerator-runtime";
import "regenerator-runtime/runtime";
import { App } from "./App";
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM  from 'react-dom'
import store from './app/store'
import { Provider } from 'react-redux'
import "./App.scss";


const appElement = document.getElementById('root')

ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>,appElement)
