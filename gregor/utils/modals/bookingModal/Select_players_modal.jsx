import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/router';
import useStateContext from '@/context/ContextProvider';
import Players_booking_content_1 from './Players_booking_content_1';
import Players_booking_content_1_admin from './Players_booking_content_1_admin';
import Players_booking_content_2 from './Players_booking_content_2';


const Select_players_modal = ({ open, close }) => {
    const {
        cookieUser,
        selected_players,
        set_selected_players,
        players_slots,
        set_booked_events,
        handle_get_all_bookings,
        set_booking_date,
        booking_date,
        bay_field,
        handle_create_booking,
        handle_get_guests_fees,
        modals,
        handle_get_all_members_API,
    } = useStateContext();



    const [booking_modal, set_booking_modal] = useState("players_booking");





    const handle_next_button = async (last, event) => {
        if (last === "admin") {
            set_userId(event)
            set_booking_modal("players_booking");
        } else if (last === "user") {
            set_booking_modal("duration_booking");
        } else {
            set_booking_modal("players_booking");
            close("select_players_modal");
            set_selected_players(null);

            await handle_create_booking(event, booking_date);
            // set_booked_events(prev => ([...prev, event]))
        }
    }


    const [selected_range_hour, set_selected_range_hour] = useState({ title: "fee_1_hour", button: "1 Hour" });

    const [userId, set_userId] = useState("");



    useEffect(() => {
        if (cookieUser) if (cookieUser.isAdmin) set_booking_modal("booking_category");
    }, [cookieUser, modals.select_players_modal])

    const [selected_booking_category, set_selected_booking_category] = useState(
        { title: "Book For Yourself" }
    );

    useEffect(() => {
        if (cookieUser && selected_booking_category === "Book For Yourself") set_userId(cookieUser.id);
    }, [cookieUser]);


    const handleClose = () => {
        close("select_players_modal");
        set_selected_booking_category({ title: "Book For Yourself" })
        set_booking_modal("players_booking");
        set_selected_players(null);
    };



    return (

        <Dialog
            open={open.select_players_modal}
            onClose={handleClose}
            className='overflow-hidden'
        >
            {booking_modal === "booking_category" ?
                <Players_booking_content_1_admin
                    handleClose={handleClose}
                    cookieUser={cookieUser}
                    set_booking_date={set_booking_date}
                    booking_date={booking_date}
                    bay_field={bay_field}
                    handle_get_all_bookings={handle_get_all_bookings}
                    handle_next_button={handle_next_button}
                    selected_booking_category={selected_booking_category}
                    set_selected_booking_category={set_selected_booking_category}
                />
                : booking_modal === "players_booking" ?

                    <Players_booking_content_1
                        selected_players={selected_players}
                        set_selected_players={set_selected_players}
                        handleClose={handleClose}
                        players_slots={players_slots}
                        cookieUser={cookieUser}
                        set_booking_date={set_booking_date}
                        booking_date={booking_date}
                        bay_field={bay_field}
                        handle_get_all_bookings={handle_get_all_bookings}
                        handle_get_guests_fees={handle_get_guests_fees}
                        handle_next_button={handle_next_button}
                        selected_range_hour={selected_range_hour}
                        set_selected_range_hour={set_selected_range_hour}
                    />
                    :
                    <Players_booking_content_2
                        selected_players={selected_players}
                        handleClose={handleClose}
                        handle_next_button={handle_next_button}
                        booking_date={booking_date}
                        set_booking_modal={set_booking_modal}
                        bay_field={bay_field}
                        userId={userId}
                        cookieUser={cookieUser}
                        selected_range_hour={selected_range_hour}
                        handle_get_all_members_API={handle_get_all_members_API}
                    />
            }
        </Dialog >
    )
}

export default Select_players_modal;
