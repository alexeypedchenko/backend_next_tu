import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuthWatcher } from '../../hooks/useAuthWatcher'
import { selectUser } from '../../store/reducers/user/userReducer'
import Aside from './Aside'
import Header from './Header'

import { getDbDocsByOrder } from '../../firebase/firebaseFirestore'

export const Context = createContext({})

const Layout = ({ children }) => {
  const router = useRouter()
  const authWatcher = useAuthWatcher()
  const { isAuth } = useSelector(selectUser)

  // for context
  const [places, setPlaces] = useState([])

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [isAuth])

  useEffect(() => {
    if (!isAuth) {
      return
    }

    getDbDocsByOrder('places', 'createdAt')
      .then(setPlaces)
  }, [isAuth])

  if (!isAuth) return (
    <div>
      load...
    </div>
  )

  return (
    <Context.Provider value={{ places, setPlaces }}>
      <Header />
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 60px)',
      }}>
        <Aside />
        <main style={{
          padding: 20,
          overflowY: 'auto',
          width: '100%',
        }}>
          {children}
        </main>
      </div>
    </Context.Provider>
  )
}

export default Layout
