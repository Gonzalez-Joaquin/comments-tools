import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'

import { PrivateRoutes, PublicRoutes } from './models/routes'
import { RoutesWithNotFound } from './utils'
import AuthGuard from './guard/auth.guard'
import store from './redux/store'

const Loading = lazy(() => import('./pages/loading/loading'))
const Public = lazy(() => import('./pages/public/public'))
const Private = lazy(() => import('./pages/private/private'))

import styles from './styles/app.module.css'

const App = () => {
  return (
    <main className={styles.main}>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <BrowserRouter>
            <RoutesWithNotFound>
              <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />
              <Route path={`${PublicRoutes.PUBLIC}/*`} element={<Public />} />
              <Route element={<AuthGuard />}>
                <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </main>
  )
}

export default App