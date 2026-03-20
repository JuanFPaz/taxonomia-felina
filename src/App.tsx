import { useEffect } from 'react'
import Gatos from './model/Gatos'
import Taxonomia from './pages/Taxonomia/Taxonomia'



export default function App() {
  useEffect(() => {
    Gatos.init()
  }, [])

  return (
    <>
      <Taxonomia></Taxonomia>
    </>
  )
}
