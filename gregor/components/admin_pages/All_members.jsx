import React, { useEffect, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStateContext from '@/context/ContextProvider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import styles from "@/styles/Home.module.css";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const headers = [
    "Member ID",
    "User Name",
    "Email",
    "Role",
    "Specify Role",
    "Subscription Date",
    "Subscription Status",
    "Account Status",
    "Subscription Renewal",
    "Action",
]


export default function All_users() {

    const router = useRouter();

    const { openSidebar, handle_get_all_members_API, cookieUser, set_member_delete_id, openModal, all_members, set_all_members } = useStateContext();

    useEffect(() => {
        if (cookieUser) {
            handle_get_all_members_API(set_all_members, "", cookieUser.id, "");
        }
    }, [cookieUser]);


    const handle_member = (id, param) => {
        set_member_delete_id(id);
        openModal(param);
    }
    const toastConfig = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
    }

    const conver_date_formatter = (prem) => {
        const date = new Date(prem);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const edit_user = (id, only_text) => {
        navigator.clipboard.writeText(id);
        toast.info("Id has been copied", { ...toastConfig, toastId: "fetchingAllUsersFaliure" });

        if (!only_text) router.push("/admin/add-new-member");
    }

    const getSubscriptionStatus = (subscriptionDate, status_name) => {
        const currentDate = new Date();
        const parsedSubscriptionDate = new Date(subscriptionDate);

        // Calculate the next billing date (30 days from the subscription date)
        const nextBillingDate = new Date(parsedSubscriptionDate);
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

        let status;
        // Check if the current date is beyond the next billing date
        switch (status_name) {
            case "subscription_status":
                if (currentDate > nextBillingDate) {
                    status = 'Expired';
                } else {
                    status = 'Active';
                }
                break;
            case "renew_subscription":
                if (currentDate >= nextBillingDate) {
                    status = false;
                } else {
                    status = true;
                }
                break;
            default:
                break;

        }
        return status;

    };


    const [search_text, set_search_text] = useState("");
    const [sizeInc, setsizeInc] = useState(false)
    const sizeControl = (val) => {
        setsizeInc(val)
    }
    const [hoverInput, setHoverInput] = useState(false);

    const trigger_search = (e, keyboard) => {
        if (e.code === "Enter" && search_text) {
            handle_get_all_members_API(set_all_members, "", cookieUser.id, "", "", search_text);
        } else if (e === "search" && search_text) {
            handle_get_all_members_API(set_all_members, "", cookieUser.id, "", "", search_text);
        } else {
            if (!keyboard || (keyboard && e.code === "Enter")) {
                handle_get_all_members_API(set_all_members, "", cookieUser.id, "");
            }
        }
    }

    return (
        <div className={`w-full h-[calc(100vh-60px)] overflow-y-auto ${openSidebar ? "px-[20px] md:px-[40px]" : "px-[80px]"} ${styles.scrollBar} pt-24 lg:pt-6 transition-all duration-300 flex items-center flex-col`}>

            <div className={`w-[90vw] lg:w-[1000px] xl:w-[1200] 2xl:w-[1400px] flex mb-4`}>
                <div onMouseOver={() => setHoverInput(true)} onMouseLeave={() => setHoverInput(false)} style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`${hoverInput ? "bg-neutral-700" : "bg-zinc-700"} px-[6px] flex transition-all duration-300 rounded-md md:w-fit w-full`} >
                    <Tooltip title="Search" arrow>
                        <IconButton
                            onClick={() => trigger_search("search")}
                        >
                            <SearchIcon className={`text-gray-300 scale-90`} />
                        </IconButton>
                    </Tooltip>
                    <input
                        type="text"
                        placeholder='Search member(s)'
                        value={search_text}
                        onChange={e => set_search_text(e.target.value)}
                        autoFocus={true}
                        onFocus={() => sizeControl(true)}
                        onBlur={() => sizeControl(false)}
                        onKeyDown={(e) => trigger_search(e, true)}
                        className={`${hoverInput ? "bg-neutral-700" : "bg-zinc-700"} outline-none border-none  text-white caret-gray-400 text-[16px] transition-all duration-300 ${sizeInc ? "w-full md:w-[24rem]" : "md:w-[16rem] w-full"} `}
                    />
                </div>
            </div>

            <div className={`w-[90vw] lg:w-[1000px] xl:w-[1200] 2xl:w-[1400px] rounded-md ${styles.scrollBar}  overflow-x-auto h-full md:mb-4 xl:mb-8`}>
                <TableContainer className={`${styles.scrollBar}`} style={{ width: "100%", height: "100%" }} component={Paper}>
                    <Table size="medium" aria-label="My Booking">
                        <TableHead>
                            <TableRow
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                <TableCell
                                    className='text-stone-500 font-semibold text-[12px]'
                                    style={{ color: "rgb(120 113 108)", fontSize: "12px", fontWeight: 600 }}
                                >
                                    Created At
                                </TableCell>
                                {headers.map((header, index) => (
                                    <TableCell
                                        key={index}
                                        align="left"
                                        style={{ color: "rgb(120 113 108)", fontSize: "12px", fontWeight: 600 }}
                                        className='text-stone-500 font-semibold text-[12px]'
                                    >
                                        {header}
                                    </TableCell>
                                ))
                                }
                            </TableRow>
                        </TableHead>
                        {Boolean(all_members.length) &&
                            <TableBody>
                                {
                                    all_members.map((row, index) => (
                                        <TableRow
                                            key={row._id}
                                            style={{ whiteSpace: 'nowrap' }}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell
                                                style={{ color: "rgb(120 113 108)", fontSize: "12px" }}
                                                className='text-stone-500 whitespace-nowrap text-[12px]' component="th" scope="row" align="justify">
                                                {conver_date_formatter(row.createdAt.split("T")[0])}
                                            </TableCell>
                                            <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} component="th" scope="row" align="justify">
                                                <p onClick={() => edit_user(row._id, true)} className='text-stone-500 whitespace-nowrap text-[12px] hover:underline active:text-stone-300 cursor-pointer select-none'>
                                                    {row._id}
                                                </p>
                                            </TableCell>
                                            <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 capitalize whitespace-nowrap text-[12px]' component="th" scope="row" align="justify">
                                                {row.name}
                                            </TableCell>

                                            <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 whitespace-nowrap text-[12px]' align="justify">{row.email}</TableCell>


                                            <TableCell style={{ fontSize: "12px" }} align="justify">
                                                <p className={`${row.isAdmin ? "text-green-600" : "text-blue-500"} whitespace-nowrap text-[12px]`}>
                                                    {row.isAdmin ? "Admin" : "User"}

                                                </p>
                                            </TableCell>


                                            <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className=' whitespace-nowrap' align="justify"
                                            >
                                                <button
                                                    onClick={() => handle_member(row._id, "set_member_role_modal")}
                                                    className={`text-white font-medium px-[10px] py-[6px] rounded-md select-none  transition-all text-[12px] hover:opacity-[.8] active:opacity-[.6] bg-violet-500`}
                                                >
                                                    Edit Role
                                                </button>
                                            </TableCell>


                                            <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} align="justify">
                                                <p className='text-stone-500 whitespace-nowrap text-[12px]'>
                                                    {conver_date_formatter(row.subscriptionDate.split("T")[0])}
                                                </p>
                                            </TableCell>

                                            <TableCell
                                                style={{ fontSize: "12px" }}
                                                align="justify">
                                                <p className={`whitespace-nowrap 
                                        text-[12px] getSubscriptionStatus 
                                        ${getSubscriptionStatus(row.subscriptionDate, "subscription_status") === "Active" ? "text-green-600" : "text-red-500"}`}>
                                                    {getSubscriptionStatus(row.subscriptionDate, "subscription_status")}
                                                </p>
                                            </TableCell>


                                            <TableCell style={{ fontSize: "12px" }} align="justify">
                                                <p className={`whitespace-nowrap text-[12px] ${row.accountStatus ? "text-green-600" : "text-red-500"}`}>
                                                    {row.accountStatus ? "Active" : "Blocked"}
                                                </p>
                                            </TableCell>


                                            <TableCell align="justify">
                                                <button
                                                    onClick={() => handle_member(row._id, "renewal_subscription_modal")}
                                                    key={index}
                                                    disabled={getSubscriptionStatus(row.subscriptionDate, "renew_subscription")}
                                                    className={`text-white font-medium px-[10px] py-[6px] rounded-md select-none  transition-all text-[12px] ${getSubscriptionStatus(row.subscriptionDate, "renew_subscription") ? "bg-green-300 cursor-not-allowed" : "hover:opacity-[.8] active:opacity-[.6] bg-green-600 "}`}
                                                >
                                                    Renew Subscription
                                                </button>

                                            </TableCell>


                                            <TableCell align="justify">

                                                <IconButton
                                                    onClick={() => handle_member(row._id, "delete_member_modal")}
                                                    key={row._id} size='small'
                                                    variant='outlined'
                                                    color='error'
                                                >
                                                    <DeleteIcon />
                                                </IconButton>

                                                <button
                                                    className={`text-white font-medium px-[10px] py-[6px] rounded-md select-none  transition-all text-[12px] hover:opacity-[.8] active:opacity-[.6] bg-blue-500`}
                                                    onClick={() => edit_user(row._id)}
                                                    key={index}
                                                >
                                                    Edit
                                                </button>

                                                {row.accountStatus ?
                                                    <button
                                                        onClick={() => handle_member(row._id, "block_member_modal")}
                                                        key={index}
                                                        className='text-white bg-amber-600 font-medium px-[10px] py-[6px] rounded-md select-none hover:opacity-[.8] active:opacity-[.6] transition-all text-[12px] mx-2'

                                                    >
                                                        Block
                                                    </button>
                                                    :
                                                    <button
                                                        onClick={() => handle_member(row._id, "unblock_member_modal")}
                                                        key={index}
                                                        className='text-white bg-stone-400 font-medium px-[10px] py-[6px] rounded-md select-none hover:opacity-[.8] active:opacity-[.6] transition-all text-[12px] mx-2'
                                                    >
                                                        Unblock
                                                    </button>
                                                }

                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        }
                    </Table>
                    {!Boolean(all_members.length) &&
                        <div className='w-full grid place-items-center py-[40px]' >
                            <p className='text-stone-400 text-[13px]' >No Members</p>
                        </div>
                    }
                </TableContainer>
            </div>


        </div>
    );
}

























