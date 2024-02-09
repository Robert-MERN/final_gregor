import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import useStateContext from '@/context/ContextProvider';
import DatePicker from 'react-datepicker';


const Bay_restriction_message_modal = ({ open, close }) => {
    const { cookieUser, bay_field, set_bay_field, booking_date, set_booking_date, validate_bay, handle_validate_restricted_bay, handle_get_all_bookings } = useStateContext()

    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setMonth(maxDate.getMonth() + 2);
    const handleDateChange = (date) => {
        set_booking_date(date);
        if (cookieUser) {
            handle_get_all_bookings(cookieUser?.id, bay_field, date);
        }
    };

    const handle_close = () => {
        if (validate_bay.restricted_bay_field === "bay-1") {
            set_bay_field("bay-2");
        } else {
            set_bay_field("bay-1");
        }
        close();
    }

    const handle_confirm = () => {
        handle_validate_restricted_bay(bay_field, booking_date.toISOString());
        close();
    }

    return (
        <Dialog
            open={open.bay_restriction_message_modal}
            onClose={handle_close}
        >
            <div className='h-fit xl:h-[400px] md:w-[500px] p-6 md:p-7 relative flex flex-col justify-between' >
                <div onClick={handle_close} className='absolute hidden md:block right-0 md:right-3 top-2 md:top-2 cursor-pointer select-none' >
                    <IconButton >
                        <CloseIcon className='scale-[.9] md:scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>

                <div className='flex flex-col gap-6' >


                    <div className='flex flex-col gap-1 w-full mt-4'>
                        <label htmlFor="" className='text-[16px] md:text-[18px] text-stone-700 font-semibold'>
                            Select Another Date*
                        </label>

                        <div className="w-fit">
                            <label
                                htmlFor="date-picker-modal"
                                className='text-[17px] cursor-pointer text-stone-500 font-semibold transition-all select-none'
                            >
                                {new Date(booking_date).toLocaleDateString("en-US", {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </label>
                            <DatePicker
                                id='date-picker-modal'
                                selected={booking_date}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                minDate={currentDate}
                                maxDate={maxDate}
                                className='hidden'
                                popperPlacement='bottom'
                            />
                        </div>
                    </div>


                    <p className='text-[14px] md:text-[17px] text-red-500 font-medium' >
                        On {new Date(validate_bay.restricted_date).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}, an admin restricted {validate_bay.restricted_bay_field}. Please choose another bay or select different date.
                    </p>
                    <p className='text-[13px] md:text-[16px] text-stone-700 font-bold flex gap-3 items-centersn'>Reason: <span className='text-[12px] md:text-[14px] font-medium' >{validate_bay.note}</span> </p>
                </div>


                <div className='w-full flex item-center justify-end mt-4' >
                    <div className="flex gap-4">
                        <button onClick={handle_close} className='text-[12px] md:text-[15px] text-stone-600 px-4 py-[6px] rounded-md hover:bg-stone-300 transition-all' >Close</button>
                        <button
                            disabled={validate_bay.restricted_date === booking_date.toISOString().split("T")[0]}
                            onClick={handle_confirm}
                            className={`px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] ${validate_bay.restricted_date !== booking_date.toISOString().split("T")[0] ? "bg-[#6CBE45] hover:opacity-75" : "bg-stone-300"}`} >Confirm</button>

                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default Bay_restriction_message_modal