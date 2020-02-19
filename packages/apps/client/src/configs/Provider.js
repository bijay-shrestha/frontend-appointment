import React from 'react';
import {store} from '@frontend-appointment/redux-module';
import {Provider} from 'react-redux';
import App from '../App'

export const Apps = (<Provider store={store}><App/></Provider>);
