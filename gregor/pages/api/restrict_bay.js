import Users from '../../models/userModel';
import connectMongo from '../../utils/functions/connectMongo';
import RestrictedBays from '@/models/restrictBayModel';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


const dateFormatter = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export default async function get_all_restricted_bays(req, res) {
    console.log("Connecting with DB")
    try {
        // connecting with monogDB
        await connectMongo();
        console.log("Successfuly conneted with DB");


        // Validating a requester status, whther he's an admin?
        const { userId } = req.query;
        const admin_user = await Users.findById(userId);
        if (!admin_user || !admin_user.isAdmin) {
            return res.status(401).json({ success: false, message: "You're not allowed!" });
        }

        // (Restricting Bay)- Creating new Bay in DB
        const { restricted_date, restricted_bay_field, ...other } = req.body;
        const validateBay = await RestrictedBays.findOne({
            restricted_date: restricted_date.split("T")[0], restricted_bay_field,
        });
        if (validateBay) {
            return res.status(200).json({
                success: false,
                message: `${restricted_bay_field} is already restricted on ${dateFormatter(restricted_date)}`
            });
        }

        await RestrictedBays.create({
            restricted_date: restricted_date.split("T")[0],
            restricted_bay_field,
            ...other
        });
        return res.status(200).json({ success: true, message: `${req.body.restricted_bay_field} has been restricted on ${dateFormatter(restricted_date)}` });

    } catch (err) {
        // if server catches any error
        return res.status(500).json({ success: false, message: err.message });
    }

}