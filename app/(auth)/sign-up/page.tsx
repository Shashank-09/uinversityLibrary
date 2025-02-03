"use client"
import AuthFrom from '@/components/AuthFrom'
import { signUp } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/validation'
import React from 'react'

const page = () => {
  return (
    <AuthFrom
    type='SIGN_UP'
     schema={signUpSchema}
     defaultValues={{
       email:'',
       password:'',
       fullName:'',
       universityId:0,
       universityCard:''
     }}
     onSubmit={signUp}
   />  )
}

export default page