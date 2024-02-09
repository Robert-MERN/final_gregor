import React, { useState, useEffect } from 'react'
import useStateContext from '@/context/ContextProvider';
import { getCookie } from 'cookies-next';
import style from "@/styles/Home.module.css";
import Section1 from './landing_page_sections/Section1';
import Section2 from './landing_page_sections/Section2';
import Section3 from './landing_page_sections/Section3';
import Section4 from './landing_page_sections/Section4';
import Section5 from './landing_page_sections/Section5';
import Footer from './utilities/Footer';



const Langing_page = ({ CJS_KEY }) => {

    const { signupUser, landing_page_form, handle_landing_page_form, set_show_navbar_BG } = useStateContext();
    const signupUserInfo = getCookie("signupUser") ? JSON.parse(getCookie("signupUser")) : signupUser;


    const controlNavbar = () => {
        const scrollVal = document.getElementById("landing-page").scrollTop;
        if (scrollVal < 100) {
            set_show_navbar_BG(false);
        } else {
            set_show_navbar_BG(true);

        }
    }

    useEffect(() => {
        controlNavbar();
    }, [])


    return (
        <div id="landing-page" onScroll={controlNavbar} className={`w-screen h-screen overflow-y-auto overflow-x-hidden ${style.scrollBar} px-[20px]`} >
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Footer />
        </div >
    )
}

export default Langing_page