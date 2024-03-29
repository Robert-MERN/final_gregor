import React, { useState } from 'react'
import Popover from '@mui/material/Popover';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useStateContext from '../context/ContextProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import BallotIcon from '@mui/icons-material/Ballot';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import style from "@/styles/Home.module.css";
import Image from 'next/image';
import unknown from "@/public/images/unknown.jpg"

const Nav_options_popover = ({ anchorEl, close }) => {
    const { cookieUser, switchSidebarTabs, openModal, } = useStateContext()

    const open = Boolean(anchorEl);
    const id = open ? "nav_options_popover" : undefined;

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

            <div className={`w-[230px] rounded-none  max-h-[315px] md:max-h-fit overflow-y-auto bg-stone-800 ${style.scrollBar} `} >
                <Link href="/home">
                    <div onClick={() => { close() }} className='px-[10px] py-[12px] border-b border-stone-600 hover:bg-stone-600 transition-all' >
                        <button className='flex items-center gap-2 text-stone-200 text-[15px] cursor-pointer select-none w-full' >
                            <Image width="40" height="40" alt="profile-photo" src={cookieUser?.profilePhoto || unknown} className='w-[40px] h-[40px] rounded-full object-cover bg-white' />
                            Hi, {cookieUser?.name}
                        </button>
                    </div>
                </Link>

                <Link href="/home">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[14px] xl:hidden flex items-center gap-2 cursor-pointer select-none p-[10px] hover:bg-stone-600 transition-all w-full'>
                        <SportsGolfIcon />
                        Book Your Golfing Bay
                    </button>
                </Link>

                <Link href="/home/my-bookings">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[14px] xl:hidden flex items-center gap-2 cursor-pointer select-none p-[10px] hover:bg-stone-600 transition-all w-full'>
                        <GolfCourseIcon />
                        See your booking(s)
                    </button>
                </Link>

                {cookieUser &&
                    cookieUser.isAdmin &&
                    <>
                        <Link href="/admin/golfing-bays-bookings-admin">
                            <button onClick={() => { close(); }} className='text-stone-200 text-[14px] xl:hidden flex items-center gap-2 cursor-pointer select-none p-[10px] hover:bg-stone-600 transition-all w-full'>
                                <DeliveryDiningIcon />
                                Golfing bays - admin
                            </button>
                        </Link>

                        <Link href="/admin/all-bookings">
                            <button onClick={() => { close(); }} className='text-stone-200 text-[14px] xl:hidden flex items-center gap-2 cursor-pointer select-none p-[10px] hover:bg-stone-600 transition-all w-full'>
                                <BallotIcon />
                                All bookings - admin
                            </button>
                        </Link>


                        <Link href="/admin/all-members">
                            <button onClick={() => { close(); }} className='text-stone-200 text-[14px] xl:hidden flex items-center gap-2 cursor-pointer select-none p-[10px] hover:bg-stone-600 transition-all w-full'>
                                <GroupsIcon />
                                All members - admin
                            </button>
                        </Link>


                        <Link href="/admin/add-new-member">
                            <button onClick={() => { close(); }} className='text-stone-200 text-[14px] xl:hidden flex items-center gap-2 cursor-pointer select-none p-[10px] hover:bg-stone-600 transition-all w-full'>
                                <PersonAddIcon />
                                Add member - admin
                            </button>
                        </Link>
                    </>

                }

                <Link href="/become-member">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[14px] xl:hidden flex items-center gap-2 cursor-pointer select-none p-[8px] hover:bg-stone-600 transition-all w-full'>
                        <CardMembershipIcon className='scale-[.8]' />
                        Become a member
                    </button>
                </Link>

                <Link href="/edit-profile">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[14px] flex items-center gap-2 cursor-pointer select-none p-[8px] hover:bg-stone-600 transition-all w-full'>
                        <ManageAccountsIcon className='scale-[.8]' />
                        Account Settings
                    </button>
                </Link>

                <Link href="/contact-us">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[14px] flex items-center gap-2 cursor-pointer select-none p-[8px] hover:bg-stone-600 transition-all w-full'>
                        <SupportAgentIcon className='scale-[.8]' />
                        Contact-us
                    </button>
                </Link>

                <Link href="/about">
                    <button onClick={() => { close(); }} className='text-stone-200 text-[14px] flex items-center gap-2 cursor-pointer select-none p-[8px] hover:bg-stone-600 transition-all w-full'>
                        <InfoIcon className='scale-[.8]' />
                        About
                    </button>
                </Link>

                <div onClick={() => { openModal("logout_modal"); close() }} className='px-[10px] py-[12px] border-t border-stone-600 hover:bg-stone-600 transition-all' >
                    <button className='flex items-center gap-2 text-stone-200 text-[14px] cursor-pointer select-none w-full' >
                        <LogoutIcon className='scale-[.8]' />
                        Logout
                    </button>
                </div>

            </div>

        </Popover>
    )
}

export default Nav_options_popover



