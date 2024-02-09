import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStateContext from '@/context/ContextProvider';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "@/styles/Home.module.css";

const headers = [
    "User Name",
    "Bay (field No.)",
    "Session Duration",
    "Start Time",
    "End Time",
    "Player(s)",
    "Member",
    "Guest(s)",
    "Action",
]

export default function My_bookings() {

    const { openSidebar, handle_get_user_bookings, cookieUser, set_booking_delete_id, openModal, single_user_booking_user_view } = useStateContext();
    useEffect(() => {
        if (cookieUser) handle_get_user_bookings(cookieUser.id)
    }, [cookieUser])

    function calculateTotalHours(startTime, endTime) {
        const start = new Date(`1970-01-01T${startTime.split("T")[1]}`);
        const end = new Date(`1970-01-01T${endTime.split("T")[1]}`);
        const timeDifference = end - start;

        // Convert milliseconds to hours
        const totalHours = timeDifference / (1000 * 60 * 60);

        return totalHours;
    }

    function countMembers(statement) {
        const regex = /Member/g;
        const match = statement.match(regex);
        return match ? match.length : 0;
    }

    function countGuests(statement) {
        const regex = /\b(\d+)\s*Guests?\b/g;
        const matches = statement.match(regex);
        if (matches) {
            return matches.reduce((total, match) => total + parseInt(match), 0);
        }
        return 0;
    }


    const conver_date_formatter = (prem) => {
        const date = new Date(prem);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    };

    const handle_delete = (id, param) => {
        set_booking_delete_id(id);
        openModal(param);
    }

    const convert_time_am_pm = (date) => {
        return new Date(date).toLocaleString("en-US", { hour12: true, hour: 'numeric', minute: 'numeric', });
    }

    console.log(single_user_booking_user_view);

    return (
        <div className={`w-full h-[calc(100vh-60px)] flex flex-col items-center overflow-y-auto ${openSidebar ? "px-[20px] md:px-[40px]" : "px-[80px]"} pt-24 lg:pt-6 transition-all duration-300`}>

            <div className={`w-[90vw] lg:w-[1000px] xl:w-[1200] 2xl:w-[1400px] rounded-md ${styles.scrollBar}  overflow-x-auto h-full md:mb-4 xl:mb-8`}>
                <TableContainer style={{ width: "100%", height: "100%" }} className={`${styles.scrollBar}`} component={Paper}>
                    <Table size="medium" aria-label="My Booking">
                        <TableHead>
                            <TableRow
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                <TableCell
                                    className='text-stone-500 font-semibold text-[12px]'
                                    style={{ color: "rgb(120 113 108)", fontSize: "12px", fontWeight: 600 }}
                                >
                                    Date
                                </TableCell>
                                {headers.map((header, index) => (
                                    <TableCell
                                        key={index}
                                        align="center"
                                        style={{ color: "rgb(120 113 108)", fontSize: "12px", fontWeight: 600 }}
                                        className='text-stone-500 font-semibold text-[12px]'
                                    >
                                        {header}
                                    </TableCell>
                                ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Boolean(single_user_booking_user_view.length) &&
                                single_user_booking_user_view.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        style={{ whiteSpace: 'nowrap', fontSize: "5px" }}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px]' component="th" scope="row" align="center">
                                            {conver_date_formatter(row.start.split("T")[0])}
                                        </TableCell>
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px] capitalize' component="th" scope="row" align="center">
                                            {row.username}
                                        </TableCell>
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px]' align="center">{row.bay_field}</TableCell>
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px]' align="center">{calculateTotalHours(row.start, row.end)}</TableCell>
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px]' align="center">{convert_time_am_pm(row.start)}</TableCell>
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px]' align="center">{convert_time_am_pm(row.end)}</TableCell>
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px]' align="center">{row.players}</TableCell>
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px]' align="center">{countMembers(row.title)}</TableCell>
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px]' align="center">{countGuests(row.title)}</TableCell>
                                        <TableCell style={{ color: "rgb(120 113 108)", fontSize: "12px" }} className='text-stone-500 text-[12px]' align="center">

                                            <IconButton
                                                onClick={() => handle_delete(row._id, "delete_booking_modal")}
                                                key={index} size='small'
                                                variant='outlined'
                                                color='error'
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    {!Boolean(single_user_booking_user_view.length) &&
                        <div className='w-full grid place-items-center py-[40px]' >
                            <p className='text-stone-400 text-[13px]' >No Bookings</p>
                        </div>
                    }
                </TableContainer>
            </div>

        </div>
    );
}