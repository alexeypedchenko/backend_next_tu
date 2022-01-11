import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from '../components/Layouts/DefaultLayout'
import StoreProviderHoc from '../store/StoreProviderHoc'
import { ToastContainer } from 'react-toastify';

const MyApp = ({ Component, pageProps }) => {
  const pageLayout = Component.getLayout || null

  return (
    <StoreProviderHoc>
      {pageLayout ? (
        pageLayout(<Component {...pageProps} />)
      ) : (
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      )}
      <ToastContainer />
    </StoreProviderHoc>
  )
}

export default MyApp
