import React, { useState, useEffect } from 'react'
import useStateContext from '@/context/ContextProvider';
import icon_logo from "@/public/images/text_logo_white.png"
import Image from "next/image";
import { useRouter } from 'next/router';
import Link from "next/link"
import { Fade } from 'react-reveal';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import Nav_popover_landing_page from '@/utils/Nav_popover_landing_page';


const Navbar = () => {
  const { openModal, show_navbar_BG } = useStateContext();

  const router = useRouter();


  const navigate_to_auth_pages = (page) => {
    router.push(`/${page}`);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const handle_nav_options_pop = (e) => {
    setAnchorEl(e.currentTarget);
  }


  return (
    <Fade>
      <div
        className={`w-full h-[60px] px-[10px] md:px-[20px] fixed flex items-center z-[15] transition-all duration-300 drop-shadow-md ${show_navbar_BG ? "bg-[#6CBE45]" : "bg-transparent"}`}
      >
        <div className='flex items-center justify-between w-full transition-all' >
          <div className='w-full' >
            <Link href="/" >
              <div className='relative w-[90px] h-[90px] md:w-[150px] md:h-[150px]' >
                <Image className='w-full h-full object-contain' src={icon_logo} alt="icon_image" />
              </div>
            </Link>
          </div>
          <div className='w-full justify-end gap-2 md:gap-6 items-center flex transition-all' >
            <Link href="/" >
              <button className='text-[12px] md:text-[15px] text-white font-semibold whitespace-nowrap hidden md:block' >Home</button>
            </Link>
            <Link href="/about" >
              <button className='text-[12px] md:text-[15px] text-white font-semibold whitespace-nowrap hidden md:block' >About</button>
            </Link>
            <Link href="/become-member" >
              <button className='text-[12px] md:text-[15px] text-white font-semibold whitespace-nowrap hidden md:block' >Become a member</button>
            </Link>
            <Link href="/login" >
              < button

                className='text-[11px] md:text-[15px] font-semibold px-[14px] py-[6px] bg-white text-indigo-900 rounded-md transition-all  hover:opacity-75  whitespace-nowrap'
              >
                Member login
              </button>
            </Link>


            <div aria-describedby='nav_popover_landing_page' onClick={handle_nav_options_pop} className='w-fit block md:hidden' >
              <IconButton size="small" >
                <MenuIcon className='text-gray-100' />
              </IconButton>
            </div>

            <Nav_popover_landing_page
              anchorEl={anchorEl}
              close={() => setAnchorEl(null)}
            />
          </div>
        </div>
      </div >
    </Fade>

  )
}

export default Navbar