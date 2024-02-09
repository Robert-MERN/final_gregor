import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, FormControl, Select, FormHelperText, MenuItem } from '@mui/material';
import useStateContext from '@/context/ContextProvider';


const Set_member_role_modal = ({ open, close }) => {
    const { member_delete_id, handleUpdateUserAPI, cookieUser, handle_get_all_members_API } = useStateContext()
    const [user, set_user] = useState(null);
    const [dummy_user, set_dummy_user] = useState([]);
    useEffect(() => {
        if (cookieUser && member_delete_id) {
            handle_get_all_members_API(set_dummy_user, "single_user", cookieUser.id, member_delete_id, set_user);
        }
    }, [cookieUser, member_delete_id, open.set_member_role_modal])

    const [role, set_role] = useState(false);
    useEffect(() => {
        if (user) set_role(Boolean(user.isAdmin));
    }, [user])
    const handle_change = (e) => {
        set_role(e.target.value);
    }

    const change_role = () => {
        handleUpdateUserAPI({ isAdmin: role, _id: member_delete_id }, "", "", "admin_true", "member_edit");
        close();
    }

    return (
        <Dialog
            open={open.set_member_role_modal}
            onClose={close}
        >
            <div className=' md:w-[500px] p-6 md:p-7 relative flex flex-col gap-8 md:gap-10' >
                <div onClick={close} className='absolute hidden md:block right-0 md:right-3 top-2 md:top-2 cursor-pointer select-none' >
                    <IconButton >
                        <CloseIcon className='scale-[.9] md:scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <p className='text-[13px] md:text-[16px] text-stone-600 font-medium' >What role do you want to specify?</p>


                <div className='' >
                    <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold'>
                        Select Role*
                    </label>
                    <FormControl
                        className='w-full mt-1'
                        variant="outlined"
                        size='small'
                    >
                        <Select
                            name="bay"
                            onChange={handle_change}
                            value={role}
                            displayEmpty
                            defaultValue={user ? Boolean(user.isAdmin) : false}
                        >
                            <MenuItem value={false}>User</MenuItem>
                            <MenuItem value={true}>Admin</MenuItem>
                        </Select>
                    </FormControl>
                </div>


                <div className='w-full flex justify-end gap-4' >
                    <button onClick={close} className='text-[12px] md:text-[15px] text-stone-600 px-4 py-[6px] rounded-md hover:bg-stone-300 transition-all' >Cancel</button>
                    {user &&
                        <button onClick={change_role} className={` ${role !== user.isAdmin ? "bg-[#6CBE45] hover:opacity[.8]" : "bg-green-300 cursor-not-allowed"} px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] transition-all`} >Confirm</button>
                    }
                </div>
            </div>
        </Dialog>
    )
}

export default Set_member_role_modal