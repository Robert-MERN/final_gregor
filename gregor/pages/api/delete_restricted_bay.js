import Users from '../../models/userModel';
import connectMongo from '../../utils/functions/connectMongo';
import RestrictedBays from '@/models/restrictBayModel';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function get_all_restricted_bays(req, res) {
    console.log("Connecting with DB")
    try {
        // connecting with monogDB
        await connectMongo();
        console.log("Successfuly conneted with DB");


        // Validating a requester status, whther he's an admin?
        const { id, userId } = req.query;
        const admin_user = await Users.findById(userId);
        if (!admin_user || !admin_user.isAdmin) {
            return res.status(401).json({ success: false, message: "You're not allowed!" });
        }

        // (Restricting Bay)- Deleting Bay from DB
        await RestrictedBays.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: `Bay has been un-restricted` });

    } catch (err) {
        // if server catches any error
        return res.status(500).json({ success: false, message: err.message });
    }

}