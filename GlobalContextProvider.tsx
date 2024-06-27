import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react'
import { IUserInfo } from '../src/common/service/login/login'
import { ISniffer, useSniffer } from '../src/contexts/global-context/sniffer'
import {  useTokenPrice } from '../src/contexts/global-context/tokenPrice'
import { GlobalContext } from '../src/contexts/global-context'
import { useLoginModalInfo } from './login'

export const GlobalContextProvider: React.FC<
  PropsWithChildren<{
    sniffer: Partial<ISniffer>
    userInfo: IUserInfo
    cookies: Record<string, string>
  }>
> = ({ children, userInfo: initUserInfo, sniffer: _sniffer, cookies }) => {
  const { tokenPriceMap, getTokenPrice } = useTokenPrice()
  const signInModalState = useLoginModalInfo()
  const [sniffer, setSniffer] = useState<ISniffer>({ })
  const onResize = useCallback(() => {
    const type = window.innerWidth === 375 || window.innerWidth === 650 ?  'mobile' : 'pc' 
    const devicePixelRatio = window.devicePixelRatio
    setSniffer(
      {
        type,
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio,
        landscape: window.innerWidth > window.innerHeight
      }
    )
  }, [])
 useEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  return (
   <GlobalContext.Provider
      value={{
        signInModalState,
        userInfo: initUserInfo,
        sniffer,
        tokenPriceMap,
        getTokenPrice,
      } as any}
    >
      {children}
    </GlobalContext.Provider>
  )
}


