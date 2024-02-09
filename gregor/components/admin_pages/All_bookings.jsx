import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStateContext from '@/context/ContextProvider';
import { Button } from '@mui/material';
import styles from "@/styles/Home.module.css";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from 'react-datepicker';



const headers = [
    "User Name",
    "Bay (field No.)",
    "Session",
    "Start Time",
    "End Time",
    "Player(s)",
    "Member",
    "Guest(s)",
    "Action",
]

const headers_2 = [
    "Bay (field No.)",
    "Total Time",
    "Start Time",
    "End Time",
    "Action",
]

const headers_3 = [
    "Bay (field No.)",
    "Reason",
    "Action",
]

export default function All_bookings() {

    const { openSidebar, handle_get_all_user_bookings, all_users_booking_admin_view, cookieUser, set_booking_delete_id, set_restricted_bay_id, all_restricted_bays, handle_get_all_restricted_bays, openModal, handle_export_CSV } = useStateContext();

    const [page_content, set_page_content] = useState("all_users_bookings");
    useEffect(() => {
        if (cookieUser && page_content === "all_users_bookings") {
            handle_get_all_user_bookings(cookieUser.id, "", "", "", "");
        } else if (cookieUser && page_content === "all_restricted_slots") {
            handle_get_all_user_bookings(cookieUser.id, true, "", "", "");
        } else if (cookieUser && page_content === "all_restricted_bays") {
            handle_get_all_restricted_bays(cookieUser.id)
        }
    }, [cookieUser, page_content]);


    function calculateTotalHours(startTime, endTime) {
        const start = new Date(`1970-01-01T${startTime.split("T")[1]}`);
        const end = new Date(`1970-01-01T${endTime.split("T")[1]}`);
        const timeDifference = end - start;

        // Convert milliseconds to hours
        const totalHours = timeDifference / (1000 * 60 * 60);

        return totalHours + " Hour(s)";
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

    const handle_delete = (id, param) => {
        if (param === "unrestrict_bay_modal") {
            set_restricted_bay_id(id)
        } else {
            set_booking_delete_id(id);
        }
        openModal(param);
    }

    const convert_date_formatter = (prem) => {
        const date = new Date(prem);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }


    const [search_text, set_search_text] = useState("");
    const [start_date, set_start_date] = useState("");
    const [end_date, set_end_date] = useState("");

    const trigger_search = (e, keyboard) => {
        if (e.code === "Enter" && search_text) {
            handle_get_all_user_bookings(cookieUser.id, "", search_text, start_date, end_date);
        } else if (e === "search" && search_text) {
            handle_get_all_user_bookings(cookieUser.id, "", search_text, start_date, end_date);
        } else {
            if (!keyboard || (keyboard && e.code === "Enter")) {
                handle_get_all_user_bookings(cookieUser.id, "", search_text, start_date, end_date);
            }
        }
    }

    const export_csv = () => {
        const csv_data = [];
        if (all_users_booking_admin_view.length) {
            for (const each of all_users_booking_admin_view) {
                const { start, end, username, bay_field, players, title } = each;
                const csv_obj = {
                    "Date": convert_date_formatter(start.split("T")[0]),
                    "User Name": username,
                    "Bay (field No.)": bay_field,
                    "Session": calculateTotalHours(start, end),
                    "Start Time": start.split("T")[1],
                    "End Time": end.split("T")[1],
                    "Player(s)": players,
                    "Member": countMembers(title),
                    "Guest(s)": countGuests(title),
                }
                csv_data.push(csv_obj);
            }
            handle_export_CSV(csv_data);
        } else {
            handle_export_CSV(csv_data);
        }

    }

    return (
        <div className={`w-full h-[calc(100vh-60px)] flex items-center flex-col overflow-y-auto ${openSidebar ? "px-[20px] md:px-[40px]" : "px-[80px]"} pt-24 lg:pt-6 transition-all duration-300`}>


            <div className='w-full rounded-t-md flex items-center mb-4 md:mb-8 overflow-hidden'>
                <button
                    onClick={() => set_page_content("all_users_bookings")}
                    className={`flex-1 hover:opacity-75 py-[15px] md:text-[14px] text-[12px] font-semibold w-full ${page_content === "all_users_bookings" ? "bg-[#6CBE45] text-white" : "bg-stone-300 text-stone-600"} transition-all`}
                >
                    Users's Bookings
                </button>
                <button
                    onClick={() => set_page_content("all_restricted_slots")}
                    className={`flex-1 py-[10px] hover:opacity-75 md:text-[14px] text-[12px]  font-semibold w-full ${page_content === "all_restricted_slots" ? "bg-[#6CBE45] text-white" : "bg-stone-300 text-stone-600"} transition-all select-none border-x border-gray-50`}
                >
                    Restricted Slots
                </button>
                <button
                    onClick={() => set_page_content("all_restricted_bays")}
                    className={`flex-1 py-[10px] hover:opacity-75 md:text-[14px] text-[12px]  font-semibold w-full ${page_content === "all_restricted_bays" ? "bg-[#6CBE45] text-white" : "bg-stone-300 text-stone-600"} transition-all select-none`}
                >
                    Restricted Bays
                </button>

            </div>
            {page_content === "all_users_bookings" ?
                <>
                    {/* filters */}
                    <div className='mb-4 w-full flex md:flex-row flex-col md:items-center justify-between' >
                        {/* Search by username */}
                        <div
                            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className={`bg-neutral-700 px-[6px] flex transition-all duration-300 rounded-md w-full md:w-fit items-center`}
                        >

                            <SearchIcon
                                onClick={() => trigger_search("search")}
                                className={`text-gray-300 scale-[.7] md:scale-90`}
                            />

                            <input
                                type="text"
                                placeholder='Search booking(s)'
                                value={search_text}
                                onChange={e => set_search_text(e.target.value)}
                                autoFocus={true}
                                onKeyDown={(e) => trigger_search(e, true)}
                                className={`bg-neutral-700 outline-none border-none  text-white caret-gray-400 text-[14px] md:text-[15px] transition-all duration-300 md:w-[16rem] w-[70%] py-[6px]`}
                            />
                        </div>


                        <div className='flex mt-3 justify-between w-full md:w-fit md:gap-8'>
                            {/* Search with start date */}
                            <div>
                                <p className='text-[12px] md:text-[16px] text-stone-100 font-semibold' >
                                    Start Date
                                </p>
                                <div className='flex flex-col flex-1'>
                                    <div className='w-fit' >
                                        <label
                                            htmlFor="start-date-picker-modal"
                                            className='text-[12px] md:text-[15px] cursor-pointer text-stone-200 font-medium transition-all select-none'
                                        >
                                            {start_date ? start_date.toLocaleDateString("en-US", {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }) : "dd/mm/yyy"}
                                        </label>
                                        <DatePicker
                                            id="start-date-picker-modal"
                                            selected={start_date || new Date()}
                                            onChange={(date) => set_start_date(date)}
                                            dateFormat="dd/MM/yyyy"
                                            className='hidden'
                                            popperPlacement='bottom'
                                        />
                                    </div>
                                </div>

                            </div>
                            {/* Search with end date */}
                            <div>

                                <p className='text-[12px] md:text-[16px] text-stone-100 font-semibold' >
                                    End Date
                                </p>
                                <div className='flex flex-col flex-1'>
                                    <div className='w-fit' >
                                        <label
                                            htmlFor="end-date-picker-modal"
                                            className='text-[12px] md:text-[15px] cursor-pointer text-stone-200 font-medium transition-all select-none'
                                        >
                                            {end_date ? end_date.toLocaleDateString("en-US", {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }) : "dd/mm/yyyy"}
                                        </label>
                                        <DatePicker
                                            id="end-date-picker-modal"
                                            selected={end_date || start_date || new Date()}
                                            onChange={(date) => set_end_date(date)}
                                            dateFormat="dd/MM/yyyy"
                                            minDate={start_date || new Date()}
                                            className='hidden'
                                            popperPlacement='bottom'
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Search button */}
                            <button
                                onClick={() => trigger_search("search")}
                                className={` border-lime-500 bg-lime-500 hover:opacity-80
                             border rounded-md px-[7px] md:px-[18px] py-[4px] md:py-[6px] h-fit text-white text-[12px] md:text-[14px] transition-all cursor-pointer`}
                            >
                                Search
                            </button>

                            {/* Export to CSV */}
                            <button
                                onClick={export_csv}
                                className={` border-blue-600 bg-blue-600 hover:opacity-80
                             border rounded-md px-[7px] md:px-[18px] py-[4px] md:py-[6px]  h-fit text-white text-[12px] md:text-[14px] transition-all cursor-pointer`}
                            >
                                Export to CSV
                            </button>
                        </div>
                    </div>

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
                                                key={header}
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
                                {Boolean(all_users_booking_admin_view.length) &&
                                    <TableBody>
                                        {
                                            all_users_booking_admin_view.map((row, index) => (
                                                <TableRow
                                                    key={row._id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    style={{ whiteSpace: 'nowrap' }}
                                                >
                                                    <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' component="th" scope="row" align="center">
                                                        {convert_date_formatter(row.start.split("T")[0])}
                                                    </TableCell>
                                                    <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 capitalize whitespace-nowrap' component="th" scope="row" align="center">
                                                        {row.username}
                                                    </TableCell>
                                                    <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{row.bay_field}</TableCell>
                                                    <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{calculateTotalHours(row.start, row.end)}</TableCell>
                                                    <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{row.start.split("T")[1]}</TableCell>
                                                    <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{row.end.split("T")[1]}</TableCell>
                                                    <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{row.players}</TableCell>
                                                    <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{countMembers(row.title)}</TableCell>
                                                    <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{countGuests(row.title)}</TableCell>
                                                    <TableCell align="center">
                                                        <Button
                                                            onClick={() => handle_delete(row._id, "delete_booking_modal")}
                                                            key={row._id} size='small'
                                                            variant='outlined'
                                                            color='error'
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                }
                            </Table>
                            {!Boolean(all_users_booking_admin_view.length) &&
                                <div className='w-full grid place-items-center py-[40px]' >
                                    <p className='text-stone-400 text-[12px]' >No Bookings</p>
                                </div>
                            }
                        </TableContainer>
                    </div>
                </>


                : page_content === "all_restricted_slots" ?

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
                                        {headers_2.map((header, index) => (
                                            <TableCell
                                                key={header}
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
                                    {Boolean(all_users_booking_admin_view.length) &&
                                        all_users_booking_admin_view.map((row, index) => (
                                            <TableRow
                                                key={row._id}
                                                style={{ whiteSpace: 'nowrap' }}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell
                                                    style={{ color: "rgb(120 113 108)" }}
                                                    className='text-stone-500 whitespace-nowrap' component="th" scope="row" align="left">
                                                    {convert_date_formatter(row.start.split("T")[0])}
                                                </TableCell>

                                                <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{row.bay_field}</TableCell>
                                                <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{calculateTotalHours(row.start, row.end)}</TableCell>
                                                <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{row.start.split("T")[1]}</TableCell>
                                                <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{row.end.split("T")[1]}</TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        onClick={() => handle_delete(row._id, "unrestrict_slot_modal")}
                                                        key={row._id} size='small'
                                                        variant='outlined'
                                                        color='error'
                                                    >
                                                        Un-restrict
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>

                            {!Boolean(all_users_booking_admin_view.length) &&
                                <div className='w-full grid place-items-center py-[40px]' >
                                    <p className='text-stone-400 text-[12px]' >No Restricted Slots</p>
                                </div>
                            }
                        </TableContainer>
                    </div>

                    :

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
                                            Restricted Date
                                        </TableCell>
                                        {headers_3.map((header, index) => (
                                            <TableCell
                                                key={header}
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
                                    {Boolean(all_restricted_bays.length) &&
                                        all_restricted_bays.map((row, index) => (
                                            <TableRow
                                                key={row._id}
                                                style={{ whiteSpace: 'nowrap' }}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell
                                                    style={{ color: "rgb(120 113 108)" }}
                                                    className='text-stone-500 whitespace-nowrap' component="th" scope="row" align="left">
                                                    {convert_date_formatter(row.restricted_date)}
                                                </TableCell>

                                                <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{row.restricted_bay_field}</TableCell>

                                                <TableCell style={{ color: "rgb(120 113 108)" }} className='text-stone-500 whitespace-nowrap' align="center">{row.note}</TableCell>


                                                <TableCell align="center">
                                                    <Button
                                                        onClick={() => handle_delete(row._id, "unrestrict_bay_modal")}
                                                        key={row._id} size='small'
                                                        variant='outlined'
                                                        color='error'
                                                    >
                                                        Un-restrict
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>

                            {!Boolean(all_users_booking_admin_view.length) &&
                                <div className='w-full grid place-items-center py-[40px]' >
                                    <p className='text-stone-400 text-[12px]' >No Restricted Slots</p>
                                </div>
                            }
                        </TableContainer>
                    </div>

            }

        </div >
    );
}