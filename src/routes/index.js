// We only need to import the modules necessary for initial render
import App from '../layouts/App'
import Error404 from './404'
import Home from './home'
import Page from './page'
import Redirect from './404/redirect'
/**
 * 路由控制中心
 */
var routerList = []
if (__DEV__) {
  routerList = [...routerList]
}
routerList = [...routerList, ...Page]
export const createRoutes = (store) => {
  for (let i in routerList) {
    routerList[i] = routerList[i](store)
  }
  return {
    path: '/',
    component: App,
    indexRoute: Home(store),
    childRoutes: [...routerList,
      Error404(store),
      Redirect
    ]
  }
}
export default createRoutes
