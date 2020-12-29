import '../styles/globals.css'
import { SelectionProvider } from '../components/context/selectionContext'

function MyApp({ Component, pageProps }) {
  return (
    <SelectionProvider>
      <Component {...pageProps} />
    </SelectionProvider>
  )
}

export default MyApp
