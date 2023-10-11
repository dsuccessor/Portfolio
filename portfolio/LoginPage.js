import React from 'react'
import { ApolloProvider, client } from '@/libs/client'
import AdminLogin from './admin/adminLogin'
import { ToastContainer } from 'react-toastify'
import PublicRoute from './security/PublicRoute'
import AuthPages from './admin/AuthPages'
function LoginPage() {
    return (
        <PublicRoute>
            <ApolloProvider client={client}>
                <div>
                    <AuthPages />
                    <ToastContainer />
                </div>
            </ApolloProvider>
        </PublicRoute>
    )
}

export default LoginPage