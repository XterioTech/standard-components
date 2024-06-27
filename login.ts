import { useBoolean } from 'ahooks'
import { Actions } from 'ahooks/lib/useBoolean'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { loginStore } from '../src/common/store'
import { LoginModalEnumEleType } from '../src/components/LoginModal/const'

export interface IBaseProps {
  username?: string
  password?: string
  autoSend?: boolean
  mode: 'signIn' | 'signUp'
  queryMode?: 'email' | 'default'
}

const initBaseProps: IBaseProps = {
  username: '',
  password: '',
  autoSend: true,
  mode: 'signIn'
}

export interface ILoginModalRes extends IBaseProps {
  loginModalOpen: boolean
  webviewHelpModalOpen: boolean
  eleType: LoginModalEnumEleType
  connectWcIng: boolean
  ConnectWcAction: Actions
  setWebviewHelpModal: Dispatch<SetStateAction<boolean>>
  toLogin(
    initEleType?:
      | LoginModalEnumEleType.SignUp
      | LoginModalEnumEleType.EmailSignIn
      | LoginModalEnumEleType.Reset
      | LoginModalEnumEleType.SignIn
      | LoginModalEnumEleType.ResetSuccess
  ): void
  closeLoginModal(): void
  toLoginNextStep(initEleType: LoginModalEnumEleType, p?: IBaseProps): void
}

export const useLoginModalInfo = (): ILoginModalRes => {
  const { pathname } = useRouter()
  const { loginModalShow, onClose, onOpen } = loginStore((s) => s)
  const [webviewHelpModalOpen, setWebviewHelpModal] = useState(false)
  const [eleType, setInitEleType] = useState<LoginModalEnumEleType>(
    '/sso/reset' === pathname ? LoginModalEnumEleType.Reset : LoginModalEnumEleType.SignIn
  )
  const [state, setState] = useState<IBaseProps>(initBaseProps)
  const [connectWcIng, ConnectWcAction] = useBoolean()

  const toLoginNextStep = useCallback(
    (_init = LoginModalEnumEleType.SignIn, p?: IBaseProps) => {
      onOpen()
      setState(p || initBaseProps)
      setInitEleType(_init)
    },
    []
  )
  const init = useCallback(() => {
    onClose()
    setState(initBaseProps)
    setInitEleType(LoginModalEnumEleType.SignIn)
  }, [])

  const closeLoginModal = useCallback(() => {
    init()
  }, [init])
  const type = ['/sso', '/sso/reset'].includes(pathname) ? 'sso' : 'normal'

  const queryMode = 'default'

  const res = useMemo<ILoginModalRes>(
    () => ({
      ...state,
      queryMode,
      loginModalOpen: loginModalShow && type === 'normal',
      eleType,
      webviewHelpModalOpen,
      connectWcIng,
      ConnectWcAction,
      setWebviewHelpModal,
      toLogin: toLoginNextStep,
      toLoginNextStep,
      closeLoginModal
    }),
    [
      loginModalShow,
      ConnectWcAction,
      closeLoginModal,
      eleType,
      connectWcIng,
      queryMode,
      state,
      toLoginNextStep,
      type,
      webviewHelpModalOpen
    ]
  )

  return res
}
