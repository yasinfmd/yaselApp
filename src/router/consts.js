import { HomeStackRouter } from './index'

import Film from '../screens/film'
import Discover from '../screens/discover'

export const TabRouters = [
    {
        name: 'Discover',
        component: Discover,
    },
    {
        name: 'Home',
        component: HomeStackRouter,

    },
    {
        name: 'Film',
        component: Film,

    }]