import React from 'react'
import Fade from "react-reveal/Fade";
import Image from "next/image";
import slide1 from "@/public/images/slide1.jpg";
import slide2 from "@/public/images/slide2.jpg";
import slide3 from "@/public/images/slide3.jpg";
import slide4 from "@/public/images/slide4.jpg";
import center from "@/public/images/center.jpg";


const Section4 = () => {

    return (
        <div className='flex justify-center mb-14 lg:mb-28 bg-golf-wall bg-center bg-no-repeat bg-cover relative' >
            <div className='absolute flex justify-center inset-0 bg-[#1F2822] opacity-[.85]' >
            </div>
            <div className='w-full lg:w-[1200px] xl:h-[550px] flex flex-col items-center pt-[40px] md:pt-[90px] px-[20px]' >
                <Fade right long >
                    <h1 className={`w-full  xl:w-[1000px] text-[#6CBE45] text-[24px] md:text-[34px] xl:text-[42px] leading-tight lg:leading-[60px] font-bold whitespace-normal text-center mb-8`} >
                        About Golf™ Premium Simulator Enclosures
                    </h1>
                </Fade>

                <div className='grid  xl:w-[800px] place-content-center place-items-center grid-cols-1 md:grid-cols-2 w-full md:gap-12' >

                    <Fade left delay={200}>
                        <div className='w-[250px] xl:w-[350px]'>
                            <ol className='list-outside list-disc mb-4' >
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium pb-2' >
                                    24/7/365 Golf Simulator Access
                                </li>
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium py-2' >
                                    Indoor Member Golf Leagues
                                </li>
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium py-2' >
                                    Easy-to-use Ag Clubhouse Interface
                                </li>
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium py-2' >
                                    Available Private Lockers
                                </li>
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium py-2' >
                                    Private Member Access To Website For Scheduling
                                </li>
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium pt-2' >
                                    Relaxed Seating
                                </li>

                            </ol>
                        </div>
                    </Fade>

                    <Fade right>
                        <div className='w-[250px] xl:w-[350px]'>
                            <ol className='list-outside list-disc mb-4' >
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium pb-2' >
                                    Foosball Table
                                </li>
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium py-2' >
                                    Sports Watch Events
                                </li>
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium py-2' >
                                    Refreshment And Wet Bar Area W/ Fridge,  Ice Machine And Glassware
                                </li>
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium py-2' >
                                    **Private Golf Lessons
                                </li>
                                <li className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium py-2' >
                                    **Club Fittings
                                </li>

                            </ol>
                        </div>
                    </Fade>
                    <Fade>
                        <div className='w-[250px] xl:w-[350px] mb-[30px]' >
                            <p className='text-[13px] md:text-[15px] xl:text-[16px] text-zinc-300 font-medium'>**Additional fees apply</p>
                        </div>
                    </Fade>

                </div>
            </div>

        </div>
    )
}

export default Section4