import React, { Component } from 'react'
import { Provider } from 'react-redux'
import LessonWords from './LessonScreen/component/LessonWords'
import store from './store'
import {  StyleProvider } from 'native-base'
import getTheme from './native-base-theme/components';
import zhopa from './native-base-theme/variables/zhopa';
export default class App extends Component {
    render () {
        return(
            <Provider store={store}>
                <StyleProvider style={getTheme(zhopa)}>
                <LessonWords/>
                </StyleProvider>
            </Provider>
        )
    }
}