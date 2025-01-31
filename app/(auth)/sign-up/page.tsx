"use client"
import AuthFrom from '@/components/AuthFrom'
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
     onSubmit={() => {}}
   />  )
}

export default page