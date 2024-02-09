import React, { useState } from 'react'
import Link from "next/link"
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailIcon from '@mui/icons-material/Mail';
import styles from '@/styles/Home.module.css'
import Image from "next/image";
import full_logo from "@/public/images/text_logo_white.png";
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Fade } from 'react-reveal';
const Footer = () => {
  const icons = [
    {
      icon: <TwitterIcon />,
      name: "icon-2",
      link: "https://twitter.com/gpcgolf",
    },
    {
      icon: <InstagramIcon />,
      name: "icon-3",
      link: "https://www.instagram.com/gpcgolf/",
    },
    {
      icon: <MailIcon />,
      name: "icon-4",
      link: "mailto:access@gpcgolf.com",
    }
  ]
  const [hover, sethover] = useState({
    'icon-1': false,
    'icon-2': false,
    'icon-3': false,
  });
  // hover function
  const hoverIcon = (bool, key) => {
    sethover((prev) => ({ ...prev, [key]: bool }))
  }
  return (
    <Fade duration={500} >
      <div className='pt-8 2xl:pt-12 pb-6 border-t border-stone-600 flex flex-col items-center gap-12 2xl:gap-16 bg-inherit' >
        <div className='lg:w-[1200px] w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-0' >
          <div className='flex-1 flex flex-col gap-2 lg:pr-8' >
            <div className='w-full flex justify-center'>
              <Link href="/ " >
                <Image className=' object-contain w-[250px] object-center' alt="full icon" src={full_logo} />
              </Link>
            </div>

            <p className='text-[16px] md:text-[17px] text-center 2xl:text-[20px] text-stone-100 font-medium'>We take the work out of connecting with others so you can accomplish more.</p>
          </div>
          <div className='flex-1 lg:border-x border-t lg:border-t-0 border-stone-600 flex flex-col gap-5 2xl:gap-6 lg:px-8 items-center lg:items-start pt-6 lg:pt-0' >
            <Link href="/" >
              <p className='text-[14px] md:text-[16px] text-stone-100 font-semibold hover:text-stone-400 transition-all' >Home</p>
            </Link>
            <Link href="/about" >
              <p className='text-[14px] md:text-[16px] text-stone-100 font-semibold hover:text-stone-400 transition-all' >About</p>
            </Link>
            <Link href="/become-member" >
              <p className='text-[14px] md:text-[16px] text-stone-100 font-semibold hover:text-stone-400 transition-all' >Become a Member</p>
            </Link>
            <Link href="/become-member" >
              <p className='text-[14px] md:text-[16px] text-stone-100 font-semibold hover:text-stone-400 transition-all' >Member login</p>
            </Link>
            <Link href="/contact-us" >
              <p className='text-[14px] md:text-[16px] text-stone-100 font-semibold hover:text-stone-400 transition-all' >Contact Us</p>
            </Link>
          </div>
          <div className='flex-1 flex flex-col gap-4 border-t border-stone-600 lg:border-none lg:pl-8 items-center lg:items-start pt-6 lg:pt-0' >
            <div className='flex gap-3 items-center' >
              {/* icons */}
              {
                icons.map((i, index) => (
                  <a href={i.link} target="__blank" key={index} onMouseOver={() => hoverIcon(true, i.name)} onMouseLeave={() => hoverIcon(false, i.name)} className={`w-[50px] h-[50px] relative rounded-full bg-black-trans overflow-hidden cursor-pointer border border-stone-100 ${styles.tapHighlight}`} >
                    <div className={`absolute inset-0 w-full h-full grid place-content-center text-stone-100 transition-all rounded-full duration-[400ms] ${hover[i.name] ? "opacity-0" : "opacity-100"}`} >
                      {i.icon}
                    </div>
                    <div className={`absolute inset-0 w-full h-full grid place-content-center bg-[#6CBE45] text-white  transition-all duration-[400ms] rounded-full ${hover[i.name] ? "scale-[1]" : "scale-0"}`} >
                      {i.icon}
                    </div>
                  </a>
                ))}
            </div>
            <a rel="noreferrer noopener" href="tel:+12486907370" className=" text-stone-100 font-medium text-[14px] md:text-[16px] hover:text-stone-400 transition-all text-center">
              <CallIcon className='mr-3 scale-90' ></CallIcon> <span>(248) 690-7370</span>
            </a>
            <a rel="noreferrer noopener" href="mailto:access@gpcgolf.com" className=" text-stone-100 font-medium hover:text-stone-400 transition-all text-[14px] md:text-[16px] text-center">
              <MailIcon className='mr-3 scale-90' ></MailIcon> <span>access@gpcgolf.com</span>
            </a>
            <a rel="noreferrer noopener" target='__blank' href="https://goo.gl/maps/qHeMvKq2oMa6iDCy9" className=" text-stone-100 font-medium hover:text-stone-400 transition-all text-[14px] md:text-[16px] text-center">
              <LocationOnIcon className='mr-3 scale-90' ></LocationOnIcon> <span>169w. Clarkston Rd.
                Lake Orion, MI 48362</span>
            </a>
          </div>

        </div>
        <div className='w-full flex justify-center' >
          <p className='text-[14px] text-stone-400 font-medium text-center' > © Copyright 2023. All Rights Reserved by GPCGolf.</p>
        </div>
      </div>
    </Fade>

  )
}

export default Footer