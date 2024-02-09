import React, { useEffect, useState } from 'react'
import style from "@/styles/Home.module.css"
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField, FormControl } from '@mui/material';
import { Fade } from 'react-reveal';
import mongoose from 'mongoose';
import DatePicker from 'react-datepicker';


const Players_booking_content_1_admin = ({
    handleClose,
    handle_next_button,
    cookieUser,
    set_booking_date,
    bay_field,
    handle_get_all_bookings,
    booking_date,
    selected_booking_category,
    set_selected_booking_category,
}) => {

    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setMonth(maxDate.getMonth() + 2);

    const handleDateChange = (date) => {
        set_booking_date(date);
        if (cookieUser) {
            handle_get_all_bookings(cookieUser?.id, bay_field, date);
        }
    };

    const validate_form = (val) => {
        if (!val) {
            return "Please provide Member ID"
        }
        if (val && !mongoose.Types.ObjectId.isValid(val)) {
            return "Invalid ID"
        }
    }
    const default_id = {
        id: "",
        errors: {
            id: "",
        }
    }
    const [id, set_id] = useState(default_id)


    const booking_categories = [
        { title: "Book For Yourself" },
        { title: "Book For Member" },
    ]


    const handle_change = (item) => () => {
        set_id(default_id);
        set_selected_booking_category(item);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        set_id(prev => ({ ...prev, [name]: value }));
    }
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validate_form(value);
        if (error) {
            set_id(prev => ({ ...prev, errors: { [name]: error } }));
        }
    }

    const handle_submit = () => {
        if (selected_booking_category.title === "Book For Member") {
            const error = validate_form(id.id);
            if (error) {
                return set_id(prev => ({ ...prev, errors: { [name]: error } }));
            } else {
                handle_next_button("admin", id.id);
            }
        } else {
            handle_next_button("admin", cookieUser.id);
        }
    }




    return (
        <Fade left duration={300}>
            <div className={`md:w-[500px] h-fit p-5 md:p-7 pt-8 md:pt-12 pb-6 relative flex flex-col gap-4 md:gap-10 justify-between overflow-x-hidden ${style.scrollBar}`} >
                <div
                    onClick={handleClose}
                    className='absolute right-3 top-2 cursor-pointer select-none'
                >
                    <IconButton >
                        <CloseIcon className='scale-[.9] md:scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>


                <div>
                    <p className='text-[15px] md:text-[17px] text-stone-600 font-bold mb-1' >
                        Select Date
                    </p>

                    <div className='flex flex-col flex-1 mb-4'>
                        <div className='w-fit' >
                            <label
                                htmlFor="date-picker-modal"
                                className='text-[15px] cursor-pointer text-stone-500 font-semibold transition-all select-none'
                            >
                                {new Date(booking_date).toLocaleDateString("en-US", {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </label>
                            <DatePicker
                                id="date-picker-modal"
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

                    < label htmlFor="" className='text-[12px] md:text-[15px] text-stone-500 md:mt-6 mt-4  font-semibold' >
                        For whom would you like to make a booking?
                    </label>

                    <div className='w-full flex items-center mt-3 md:mt-4 gap-4' >
                        {booking_categories.map((item, index) => (
                            <button
                                index={item.title}
                                onClick={handle_change(item)}
                                className={`w-full py-[8px] hover:opacity-75 md:text-[14px] text-[11px] rounded-md ${item.title === selected_booking_category.title ? "bg-lime-600 text-white" : "bg-stone-300 text-stone-600"} transition-all select-none`}
                            >
                                {item.title}
                            </button>
                        ))
                        }

                    </div>

                    <div className="flex flex-col w-full mt-4 md:mt-6 gap-2 md:gap-4">

                        {selected_booking_category.title === "Book For Member" &&
                            <>

                                <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold'>
                                    Enter Member ID
                                </label>
                                <FormControl
                                    className='flex flex-col w-full gap-4'
                                >
                                    <TextField
                                        size='small'
                                        autoComplete='off'
                                        placeholder="Member ID"
                                        error={Boolean(id.errors.id)}
                                        helperText={id.errors.id}
                                        name="id"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={id.id}
                                    />
                                </FormControl>
                                < label htmlFor="" className='text-[11px] md:text-[13px] text-stone-500 md:mt-6 mt-4' >
                                    Please enter the member ID, and ensure that it is correct.
                                </label>
                            </>

                        }



                    </div>

                </div>

                <div id="scroll_to_bottom" className='w-full flex justify-end' >
                    <div className='flex gap-6 items-center' >


                        <button type="button"
                            onClick={handleClose}
                            className='bg-red-500 hover:bg-red-400 px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px]' >
                            Cancel
                        </button>
                        <button

                            disabled={
                                (id.errors.id && selected_booking_category.title === "Book For Member") ||
                                (!id.errors.id && !id.id && selected_booking_category.title === "Book For Member")
                            }
                            onClick={handle_submit}

                            className={`px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] ${(id.errors.id && selected_booking_category.title === "Book For Member") ||
                                (!id.errors.id && !id.id && selected_booking_category.title === "Book For Member") ?
                                "bg-stone-300"
                                :
                                "bg-[#6CBE45] hover:opacity-75"}`} >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </Fade>

    )
}

export default Players_booking_content_1_admin