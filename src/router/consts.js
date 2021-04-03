import { RootStackScreen } from './rootStackRouter'
import Film from '../screens/film'
import Discover from '../screens/discover'

export const TabRouters = [
    {
        name: 'Discover',
        component: Discover,
    },
    {
        name: 'Home',
        component: RootStackScreen,

    },
    {
        name: 'Film',
        component: Film,

    }]