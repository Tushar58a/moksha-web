import Container from '../components/common/Container'
import React from 'react'
import { Helmet } from 'react-helmet'
import image from '../assets/coming.png'

function Sponsors() {
  return (
    <>
      <Helmet>
        <title>Moksha | Sponsors</title>
      </Helmet>

      <Container>
        <div className='mx-auto flex justify-center items-center'>
          <img className='h-[380px]' src={image} alt='' />
        </div>
      </Container>
    </>
  )
}

export default Sponsors
