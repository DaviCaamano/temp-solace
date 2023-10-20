'use client';

import {Provider} from 'react-redux';
import store from '../store';
import {PropsWithChildren} from 'react';

export const Providers = ({children}: PropsWithChildren) => {
    return <Provider store={store} >{children}</Provider>
}
