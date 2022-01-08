import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authWatcher } from '../firebase/firebaseAuth'
import { selectUser } from '../store/reducers/user/userReducer'
import { useActions } from './useActions'

export const useAuthWatcher = () => {
  const { setUser, setAuth } = useActions()
  const { user, isAuth } = useSelector(selectUser)

  useEffect(() => {
    authWatcher((user, isAuth) => {
      setUser(user)
      setAuth(isAuth)
    })
  }, [])

  return {
    user,
    isAuth
  }
}
