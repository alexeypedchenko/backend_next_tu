import '../styles/globals.css'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import StoreProviderHoc from '../store/StoreProviderHoc'

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
    </StoreProviderHoc>
  )
}

export default MyApp
