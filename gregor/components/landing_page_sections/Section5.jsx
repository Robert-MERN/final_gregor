import React, { useState } from 'react'
import Fade from "react-reveal/Fade";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import SubjectIcon from '@mui/icons-material/Subject';
import useStateContext from '@/context/ContextProvider';


const Section5 = () => {

    const { handle_sending_mail } = useStateContext();

    const default_form_state = {
        email: '',
        fullName: '',
        subject: '',
        message: '',
        errors: {
            email: '',
            fullName: '',
            subject: '',
            message: '',
        },
    }
    const [formState, setFormState] = useState(default_form_state);
    const validateField = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'email':
                if (!value) {
                    error = 'Please enter an email';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'fullName':
                if (!value) {
                    error = 'Please enter your name';
                } else if (value.length > 55) {
                    error = 'Is too long (maximum is 55 characters).'
                }
                break;
            case 'subject':
                if (!value) {
                    error = 'Please enter the subject';
                } else if (value.length > 16) {
                    error = 'Is too long (maximum is 16 characters).'
                }
                break;
            case 'message':
                if (!value) {
                    error = "can't be blank";
                }
                break;

            default:
                break;
        }
        return error;
    }

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
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
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
            handle_sending_mail(formState, () => setFormState(default_form_state));

        }
    }

    const apiKey = 'AIzaSyBVHpNETGQbjxtvfGN39Fa5tJxg2nHtPb0';
    const location = '169w Clarkston Rd, Lake Orion, MI 48362, USA';


    return (
        <div className='flex justify-center mb-14 lg:mb-28' >
            <div className='w-full lg:w-[1200px] flex flex-col items-center' >
                <Fade right long >
                    <h1 className={`w-full lg:w-[700px] xl:w-[900px] text-stone-100 text-[28px] md:text-[34px] lg:text-[44px] leading-tight lg:leading-[60px] font-bold whitespace-normal text-center mb-10`} >
                        Convenient for Your Time, Not Ours
                    </h1>
                </Fade>

                <div className='flex flex-col lg:flex-row w-full' >
                    <Fade left>
                        <div className='flex-1 lg:pr-20 flex flex-col justify-center'>
                            <form onSubmit={handleSubmit} className='w-full h-full bg-stone-100 rounded-sm px-[10px] py-4 md:p-6 flex flex-col gap-4' >
                                <FormControl size="small">
                                    <OutlinedInput
                                        placeholder='Full Name*'
                                        name="fullName"
                                        error={Boolean(formState.errors.fullName)}
                                        value={formState.fullName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PersonOutlinedIcon className='text-stone-400 lg:scale-100 scale-75' />
                                            </InputAdornment>
                                        }
                                    />
                                    {formState.errors.fullName && <FormHelperText error>{formState.errors.fullName}</FormHelperText>}
                                </FormControl>

                                <FormControl size="small">
                                    <OutlinedInput
                                        placeholder='Subject*'
                                        name="subject"
                                        error={Boolean(formState.errors.subject)}
                                        value={formState.subject}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SubjectIcon className='text-stone-400 lg:scale-100 scale-75' />
                                            </InputAdornment>
                                        }
                                    />
                                    {formState.errors.subject && <FormHelperText error>{formState.errors.subject}</FormHelperText>}
                                </FormControl>

                                <FormControl size="small">
                                    <OutlinedInput
                                        placeholder='Email*'
                                        name="email"
                                        error={Boolean(formState.errors.email)}
                                        value={formState.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MailIcon className='text-stone-400 lg:scale-100 scale-75' />
                                            </InputAdornment>
                                        }
                                    />
                                    {formState.errors.email && <FormHelperText error>{formState.errors.email}</FormHelperText>}
                                </FormControl>

                                <FormControl>
                                    <OutlinedInput
                                        placeholder='Message*'
                                        name="message"
                                        error={Boolean(formState.errors.message)}
                                        value={formState.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        multiline
                                        rows={5}

                                    />
                                    {formState.errors.message && <FormHelperText error>{formState.errors.message}</FormHelperText>}
                                </FormControl>

                                <button type='submit' className='w-full py-[10px] rounded-md bg-[#6CBE45] hover:opacity-[.8] active:opacity-[.7] transition-all text-white font-medium text-[14px]' >
                                    SEND MESSAGE
                                </button>

                                <p className='text-stone-400 text-[14px] leading-tight text-center mt-2 px-4' >
                                    Gregor doesn't sell, share or trade customer information your privacy is very important to us.
                                </p>
                            </form>
                        </div>
                    </Fade>

                    <Fade right delay={200}>
                        <div className='flex-1 mt-16 lg:mt-0 p-0 md:p-12 lg:p-0' >
                            <iframe
                                className='w-full h-full rounded-sm'
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location}&zoom=12`}

                            ></iframe>

                        </div>
                    </Fade>


                </div>
            </div>

        </div>
    )
}

export default Section5