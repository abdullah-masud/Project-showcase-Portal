import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const UserInfo = () => {
    const { data: session } = useSession()
    return (
        <div className='mt-12'>
            {
                session ?
                    <div className='flex flex-col items-center border-b-2 pb-10'>
                        <Image className='rounded-full' src={session.user?.image} alt='profile-image' width={75} height={75} />

                        <h2 className='text-3xl font-semibold text-cyan-700'>{session.user.name}</h2>
                        <h2 className='text-base font-semibold text-gray-700'>{session.user.email}</h2>
                    </div>

                    :
                    null
            }
        </div>
    )
}

export default UserInfo