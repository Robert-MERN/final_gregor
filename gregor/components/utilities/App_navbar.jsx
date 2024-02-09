import React, { useState, useEffect } from 'react'
import useStateContext from '@/context/ContextProvider';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fade from "react-reveal/Fade";
import Nav_options_popover from '@/utils/Nav_options_popover';
import Image from "next/image";
import icon_logo from "@/public/images/text_logo_white.png"
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    const { handleSidebar, openModal, switchSidebarTabs, } = useStateContext();
    const [showNavBG, setShowNavBG] = useState(false);
    const controlNavbar = () => {
        if (window.scrollY < 100) {
            setShowNavBG(true);
        } else {
            setShowNavBG(false);

        }
    }
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        }
    }, []);



    const [anchorEl, setAnchorEl] = useState(null);
    const handle_nav_options_pop = (e) => {
        setAnchorEl(e.currentTarget);
    }

    return (
        <Fade duration={300} >
            <div
                className={`w-screen lg:w-full h-[60px] px-[10px] lg:px-[20px] top-0 inset-x-0 fixed lg:static bg-[#1F2822] flex items-center z-[15] transition-all duration-300 border-b border-stone-600`}
            >
                <div className='flex items-center justify-between w-full overflow-hidden' >
                    <div className='' >
                        <div className='xl:block hidden '>
                            <IconButton

                                onClick={handleSidebar}
                                aria-label="sidebar"
                                // size="large"
                                className='text-zinc-200'
                            >
                                <MenuIcon className='text-zinc-200' />
                            </IconButton>
                        </div>


                        <div className='block overflow-hidden w-[120px] h-[120px] xl:hidden' >
                            <Link href="/">
                                <Image className='w-full h-full object-contain' src={icon_logo} alt="icon_image" />
                            </Link>
                        </div>

                    </div>
                    <div className='justify-end flex gap-6 items-center' >

                        <button onClick={() => switchSidebarTabs("Add to Contacts")} className='text-[15px] text-zinc-200 font-semibold font-sans whitespace-nowrap hidden lg:block italic select-none' >Call <a className='text-[#6CBE45] px-1' href="tel:+12486907370"> (248) 690-7370 </a> </button>
                        {/* <Link href="/about" >
                            <button className='text-[15px] text-zinc-200  font-semibold select-none font-sans whitespace-nowrap hidden lg:block' >About</button>
                        </Link> */}


                        <div aria-describedby='nav_options_popover' onClick={handle_nav_options_pop} className='w-fit' >
                            <div className='xl:hidden block'>
                                <IconButton size="small" className='text-zinc-200' >
                                    <MenuIcon className='text-zinc-200' />
                                </IconButton>
                            </div>
                            <div className='xl:block hidden'>
                                <IconButton size="small" className='text-zinc-200' >
                                    <MoreVertIcon className='text-zinc-200' />
                                </IconButton>
                            </div>

                        </div>

                        <Nav_options_popover
                            anchorEl={anchorEl}
                            close={() => setAnchorEl(null)}
                        />

                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default Navbar
