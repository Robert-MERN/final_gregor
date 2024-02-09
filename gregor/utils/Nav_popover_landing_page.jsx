import React, { useState } from 'react'
import Popover from '@mui/material/Popover';
import useStateContext from '../context/ContextProvider';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Nav_popover_landing_page = ({ anchorEl, close }) => {
    const { cookieUser, switchSidebarTabs, openModal, } = useStateContext()

    const open = Boolean(anchorEl);
    const id = open ? "nav_popover_landing_page" : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={close}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <div className='w-[230px] bg-stone-800' >
                <Link href="/">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[12px] flex items-center gap-2 cursor-pointer select-none p-[10px] hover:bg-stone-600 transition-all w-full'>
                        <HomeIcon />
                        Home
                    </button>
                </Link>


                <Link href="/about">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[12px] flex items-center gap-2 cursor-pointer select-none p-[8px] hover:bg-stone-600 transition-all w-full'>
                        <InfoIcon className='scale-[.8]' />
                        About
                    </button>
                </Link>

                <Link href="/contact-us">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[12px] flex items-center gap-2 cursor-pointer select-none p-[8px] hover:bg-stone-600 transition-all w-full'>
                        <SupportAgentIcon className='scale-[.8]' />
                        Contact-us
                    </button>
                </Link>

                {/* <Link href="/terms-conditions">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[12px] flex items-center gap-2 cursor-pointer select-none p-[8px] hover:bg-stone-600 transition-all w-full'>
                        <AssignmentIcon className='scale-[.8]' />
                        Terms & Conditions
                    </button>
                </Link> */}

                <Link href="/login">
                    <div className='px-[10px] py-[12px] border-t border-stone-600 hover:bg-stone-600 transition-all' >
                        <button className='flex items-center gap-2 text-stone-200 text-[12px] cursor-pointer select-none w-full' >
                            <VpnKeyIcon className='scale-[.8]' />
                            Login as a member
                        </button>
                    </div>
                </Link>

            </div>

        </Popover>
    )
}

export default Nav_popover_landing_page



