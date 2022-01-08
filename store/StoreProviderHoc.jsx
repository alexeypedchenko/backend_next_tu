import { store } from './store'
import { Provider } from 'react-redux'

const StoreProviderHoc = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default StoreProviderHoc
