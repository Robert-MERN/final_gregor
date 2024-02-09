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
        const { bay_field, date } = req.query;
        // (Restricting Bay)- Creating new Bay in DB
        const restricted_bay = await RestrictedBays.findOne({ restricted_bay_field: bay_field, restricted_date: date.split("T")[0] });

        if (restricted_bay) {
            return res.status(200).json({ success: false, restricted_bay });
        }
        return res.status(200).json({ success: true });

    } catch (err) {
        // if server catches any error
        return res.status(500).json({ success: false, message: err.message });
    }

}