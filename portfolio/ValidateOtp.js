import React from 'react'
import OtpAuth from './admin/OtpAuth'
import { ApolloProvider, client } from '@/libs/client'


function ValidateOtp() {
  return (
    <ApolloProvider client={client}>
  <OtpAuth/>
  </ApolloProvider>
  )
}

export default ValidateOtp