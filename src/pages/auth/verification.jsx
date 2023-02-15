import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useMap } from '../../hooks/useMap'
import { useFetch } from '../../hooks/useFetch'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import BaseInput from '../../components/base/BaseInput'
import AuthLayout from '../../layouts/auth'
import { STORAGE_AUTH_KEY } from '../../constants'
import { useAppContext } from '../../containers/DataProvider'
import { useAuthContext } from '../../containers/AuthProvider'

const VerificationPage = () => {
  const navigate = useNavigate()
  const [token, setAuthToken] = useLocalStorage(STORAGE_AUTH_KEY)
  const {setAppContext} = useAppContext()
  const {authContext} = useAuthContext()

  useEffect(() => {
    if (token) navigate('/')
    if (!authContext.email) navigate('/auth/register')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchHook = useFetch()

  const [formData, { set }] = useMap({
    email: authContext.email,
    otp: '',
  })

  function verifyOTP(e) {
    e.preventDefault()

    fetchHook('users/otp', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (res.message === "User Validated!!") {
        // TODO: replace with user data from designated api
        setAppContext(state => {
          const newState = { ...state }
          newState.authUser = { ...state.authUser, ...authContext }
          return newState
        })
        navigate('/')
      }
    })
    .catch(err => {
      // Failed
    })
  }

  function resendOTP() {
    fetchHook('users/resendotp', {
      method: 'POST',
      body: JSON.stringify({email: formData.email}),
    })
  }

  return (
    <div className='max-w-md px-4 sm:px-0'>
      {/* <Head>
        <title>Moksha | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <form className="space-y-6" onSubmit={verifyOTP}>
        <BaseInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          disabled
          label="Email address"
          value={formData.email}
          onChange={e => set('email', e.target.value)}
        />

        <BaseInput
          id="otp"
          name="otp"
          type="number"
          autoComplete="one-time-code"
          required
          minLength={4}
          maxLength={4}
          label="Enter OTP"
          value={formData.otp}
          onChange={e => set('otp', e.target.value)}
        />

        <div className="flex items-center justify-start">
          <div className="text-sm">
            <button type="button" className="font-medium text-amber-600 hover:text-amber-500" onClick={resendOTP}>
              Resend OTP
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-amber-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  )
}
VerificationPage.getLayout = (page) => <AuthLayout heading="Verify your account">{page}</AuthLayout>
export default VerificationPage