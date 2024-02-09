import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import useStateContext from '@/context/ContextProvider';


const Account_status_modal = ({ open, close }) => {
    const { account_status_message } = useStateContext()


    return (
        <Dialog
            open={open.account_status_modal}
            onClose={close}
        >
            <div className=' md:w-[500px] p-6 md:p-7 relative flex flex-col gap-8 md:gap-10' >
                <div onClick={close} className='absolute hidden md:block right-0 md:right-3 top-2 md:top-2 cursor-pointer select-none' >
                    <IconButton >
                        <CloseIcon className='scale-[.9] md:scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>

                <p className='text-[13px] md:text-[16px] text-stone-600 font-medium mt-4' >
                    {account_status_message}
                </p>



                <div className='w-full flex justify-end' >
                    <button onClick={close} className='text-[12px] md:text-[15px] text-stone-600 px-4 py-[6px] rounded-md hover:bg-stone-300 transition-all' >Close</button>
                </div>
            </div>
        </Dialog>
    )
}

export default Account_status_modal