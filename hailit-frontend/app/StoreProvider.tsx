'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from '../lib/store/store'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  // const storeRef = useRef<AppStore>()
  // if (!storeRef.current) {
    
  //   storeRef.current = store
  // }

  return <Provider store={store}>{children}</Provider>
}