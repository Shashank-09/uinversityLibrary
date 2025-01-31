"use client"
import AuthFrom from '@/components/AuthFrom'
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
      onSubmit={() => {}}
    />
  )
}

export default page