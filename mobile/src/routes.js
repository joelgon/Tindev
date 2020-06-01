import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import login from './pages/Login'
import Main from './pages/Main'

export default createAppContainer(
    createSwitchNavigator({
        login,
        Main,
    })
)