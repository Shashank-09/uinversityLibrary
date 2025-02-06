import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getInitialsAdmin } from '@/lib/utils'

interface AvatarUiProps {
  fullName?: string;  
}

const AvatarUi = ({ fullName }: AvatarUiProps) => {
  return (
    
    <Avatar>
      <AvatarFallback className="bg-amber-100">
        {getInitialsAdmin(fullName || "IN")}
      </AvatarFallback>
    </Avatar>

  )
}

export default AvatarUi