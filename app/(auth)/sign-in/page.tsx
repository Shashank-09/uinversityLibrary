"use client"
import AuthFrom from '@/components/AuthFrom'
import { signInWithCredentials } from '@/lib/actions/auth'
import { signInSchema } from '@/lib/validation'
import React from 'react'

const page = () => {
  return (
    <AuthFrom
     type='SIGN_IN'
      schema={signInSchema}
      defaultValues={{
        email:'',
        password:''
      }}
      onSubmit={signInWithCredentials}
    />
  )
}

export default page