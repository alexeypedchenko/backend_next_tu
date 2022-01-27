import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import EmptyLayout from '../../components/Layouts/EmptyLayout'
import { selectUser } from '../../store/reducers/user/userReducer'
import { signin } from '../../firebase/firebaseAuth'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const Index = () => {
  const router = useRouter()
  const [fields, setFields] = useState({
    email: '',
    password: ''
  })

  const { isAuth } = useSelector(selectUser)

  useEffect(() => {
    if (isAuth) {
      router.push('/')
    }
  }, [isAuth])

  const submit = () => {
    console.log('fields:', fields)
    signin(fields)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      paddingBottom: 50
    }}>
      <div style={{
        width: 300,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <TextField
          style={{ marginBottom: 20 }}
          label="E-mail"
          variant="outlined"
          placeholder="Введите ваш email"
          value={fields.email}
          onChange={(event) => setFields({ ...fields, email: event.target.value })}
        />
        <TextField
          style={{ marginBottom: 20 }}
          label="Password"
          variant="outlined"
          placeholder="Введите ваш пароль"
          value={fields.password}
          onChange={(event) => setFields({ ...fields, password: event.target.value })}
        />
        <Button
          variant="contained"
          size="large"
          onClick={submit}
        >
          Вход
        </Button>
      </div>
    </div>
  )
}

export default Index

Index.getLayout = function getLayout(page) {
  return (
    <EmptyLayout>
      {page}
    </EmptyLayout>
  )
}
