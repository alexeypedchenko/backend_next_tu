import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAuthWatcher } from '../../hooks/useAuthWatcher'
import { selectUser } from '../../store/reducers/user/userReducer'
import Aside from '../Aside/Aside'
import Header from '../Header/Header'

const Layout = ({ children }) => {
  const router = useRouter()
  const authWatcher = useAuthWatcher()
  const { isAuth } = useSelector(selectUser)

  // useEffect(() => {
  //   if (!isAuth) {
  //     router.push('/login')
  //   }
  // }, [isAuth])

  // if (!isAuth) return (
  //   <div>
  //     load...
  //   </div>
  // )

  return (
    <>
      <Header />
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 60px)',
      }}>
        <Aside/>
        <main style={{
          padding: 20,
          overflowY: 'auto',
          width: '100%',
        }}>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
