import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/router';
import useStateContext from '@/context/ContextProvider';
import styles from '@/styles/Home.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, FormControl, Select, FormHelperText, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import TextField from '@mui/material/TextField';


const Restrict_bay_modal = ({ open, close }) => {
    const { cookieUser, set_booking_date_for_admin, booking_date_for_admin, handle_get_all_bookings, bay_field_for_admin, set_bay_field_for_admin, handle_restrict_bay } = useStateContext();


    const router = useRouter();

    const defaultFormState = {
        bay: '',
        note: '',
        errors: {
            bay: '',
            note: '',
        },
    }
    const [formState, setFormState] = useState(defaultFormState);


    const handleClose = () => {
        close('restrict_hours_modal');
        setFormState(defaultFormState);
    };


    const validateField = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'bay':
                if (!value) {
                    error = 'Please select the Bay';
                }
                break;
            case 'note':
                if (!value) {
                    error = 'Please write a note';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const error = validateField(name, value);
        setFormState((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: error,
            },
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === "bay") {
            set_bay_field_for_admin(value);
            if (cookieUser) {
                handle_get_all_bookings(cookieUser.id, value, booking_date_for_admin);
            }
        }
    };


    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setMonth(maxDate.getMonth() + 2);
    const handleDateChange = (date) => {
        set_booking_date_for_admin(date);
        if (cookieUser) {
            handle_get_all_bookings(cookieUser?.id, bay_field_for_admin, date);
        }
    };


    const handle_next_button = async (event) => {
        await handle_restrict_bay(event, () => close("restrict_bay_modal"));
        setFormState(defaultFormState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        Object.keys(formState).forEach((fieldName) => {
            const error = validateField(fieldName, formState[fieldName]);
            if (error) {
                errors[fieldName] = error;
            }
        });
        setFormState((prevState) => ({
            ...prevState,
            errors,
        }));
        if (Object.values(errors).every((error) => !error)) {
            console.log(booking_date_for_admin)
            const restricted_bay = {
                restricted_bay_field: bay_field_for_admin,
                restricted_date: booking_date_for_admin.toISOString(),
                note: formState.note,
                userId: cookieUser.id,
            }
            await handle_next_button(restricted_bay);
        }
    };


    return (
        <Dialog open={open.restrict_bay_modal} onClose={handleClose}>
            <form
                onSubmit={handleSubmit}
                className={`h-fit md:w-[500px] xl:h-[450px] p-5 md:p-7 pt-8 md:pt-12 pb-6 relative flex flex-col gap-4 md:gap-10 justify-between overflow-x-hidden ${styles.scrollBar}`}
            >
                <div
                    onClick={handleClose}
                    className='absolute right-3 top-2 cursor-pointer select-none'
                >
                    <IconButton>
                        <CloseIcon className='scale-[.9] md:scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <div>
                    <p className='text-[15px] md:text-[17px] text-stone-600 font-bold'>
                        Restrict Bay
                    </p>
                    <div className="flex flex-col w-full mt-4 md:mt-6 gap-2 md:gap-3">

                        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4' >

                            <div className='flex flex-col gap-1 flex-1'>
                                <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold'>
                                    Date*
                                </label>

                                <div className="w-fit">
                                    <label
                                        htmlFor="date-picker-modal"
                                        className='text-[17px] cursor-pointer text-stone-500 font-semibold transition-all select-none'
                                    >
                                        {new Date(booking_date_for_admin).toLocaleDateString("en-US", {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </label>
                                    <DatePicker
                                        id='date-picker-modal'
                                        selected={booking_date_for_admin}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={currentDate}
                                        maxDate={maxDate}
                                        className='hidden'
                                        popperPlacement='bottom'
                                    />
                                </div>
                            </div>
                            <div className='flex-1' >
                                <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold'>
                                    Bay*
                                </label>
                                <FormControl
                                    className='w-full mt-1'
                                    variant="outlined"
                                    size='small'
                                >
                                    <Select
                                        name="bay"
                                        error={Boolean(formState.errors.bay)}
                                        onChange={handleChange}
                                        value={formState.bay}
                                        onBlur={handleBlur}
                                        displayEmpty
                                    >
                                        <MenuItem disabled value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"bay-1"}>bay-1</MenuItem>
                                        <MenuItem value={"bay-2"}>bay-2</MenuItem>
                                    </Select>
                                    {formState.errors.bay && <FormHelperText error>{formState.errors.bay}</FormHelperText>}
                                </FormControl>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold mb-2'>
                                Write a note* (should start with "Due to")
                            </label>
                            <TextField
                                autoComplete='off'
                                size='small'
                                className='w-full mt-1'
                                name="note"
                                value={formState.note}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(formState.errors.note)}
                                helperText={formState.errors.note}
                                placeholder="Note - Due to"
                            />
                        </div>

                        {/* Note */}
                        <label htmlFor="" className='text-[11px] md:text-[13px] text-stone-500 md:mt-3 mt-2'>
                            Please note that after restricting a selected bay, you can later unrestrict that bay by going to the 'All Member - Admin' section
                        </label>
                    </div>
                </div>

                <div id="scroll_to_bottom" className='w-full flex justify-end'>
                    <div className='flex gap-6 items-center'>
                        <button
                            type="button"
                            onClick={handleClose}
                            className='bg-red-500 hover:bg-red-400 px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px]'
                        >
                            Cancel
                        </button>
                        <button
                            id={"scroll_to_bottom"}
                            className={`px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] bg-[#6CBE45] hover:opacity-75 `}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default Restrict_bay_modal;
