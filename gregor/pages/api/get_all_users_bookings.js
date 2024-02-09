import Bookings from "@/models/bookingsModel";
import connectMongo from "@/utils/functions/connectMongo"
import Users from "@/models/userModel";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


function convertStringToValue(value) {
    return value === "null" ? null : value === "undefined" ? undefined : value;
}

export default async function handler(req, res) {
    try {

        await connectMongo();
        // new slot

        const { userId, restricted } = req.query;
        const user = await Users.findById(userId);

        if (!user) return res.status(404).json({ status: false, message: "User doesn't exist!" });

        if (!user.isAdmin) return res.status(401).json({ status: false, message: "You're not allowed to do that!" });

        const searchFilter = req.query.search_text; // Assuming you get this from request query parameters
        const startDateFilter = req.query.start_date; // Assuming you get this from request query parameters
        const endDateFilter = req.query.end_date; // Assuming you get this from request query parameters

        const query = {};

        // Apply filters if they are provided
        if (searchFilter) {
            // Use a case-insensitive regex for partial username match
            query.username = { $regex: new RegExp(searchFilter, 'i') };
        }

        if (startDateFilter && !endDateFilter) {
            const startDate = new Date(startDateFilter);
            startDate.setUTCHours(0, 0, 0, 0);
            query.start = { $gte: startDate.toISOString() };
        }

        if (endDateFilter && !startDateFilter) {
            const endDate = new Date(endDateFilter);
            endDate.setUTCHours(23, 59, 59, 999);
            query.start = { $lte: endDate.toISOString() };
        }

        if (endDateFilter && startDateFilter) {
            const startDate = new Date(startDateFilter);
            startDate.setUTCHours(0, 0, 0, 0);
            const endDate = new Date(endDateFilter);
            endDate.setUTCHours(23, 59, 59, 999);
            query.start = {
                $gte: startDate.toISOString(),
                $lte: endDate.toISOString()
            };

        }

        // Find bookings with applied filters
        const bookings = await Bookings.find(query).sort({ createdAt: -1 });

        if (convertStringToValue(restricted)) {
            const restricted_bookings = bookings.filter(item => item.title === "Restricted")
            return res.status(200).json(restricted_bookings);
        }
        const sorted_bookings = bookings.filter(item => item.title !== "Restricted")

        return res.status(200).json(sorted_bookings);

    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

