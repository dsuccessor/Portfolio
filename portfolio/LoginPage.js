import React from 'react'
import { ApolloProvider, client } from '@/libs/client'
import AdminLogin from './admin/adminLogin'
import { ToastContainer } from 'react-toastify'
import PublicRoute from './security/PublicRoute'

function LoginPage() {
    return (
        <PublicRoute>
            <ApolloProvider client={client}>
                <div>
                    <AdminLogin />
                    <ToastContainer />
                </div>
            </ApolloProvider>
        </PublicRoute>
    )
}

export default LoginPage