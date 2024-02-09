import Bookings from "@/models/bookingsModel";
import connectMongo from "@/utils/functions/connectMongo"
import Users from "@/models/userModel";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */



const canDeleteBookingWithin15Minutes = (date) => {
    const bookingCreatedAt = new Date(date);
    const currentTime = new Date();

    // Calculate the difference in milliseconds
    const timeDifference = currentTime - bookingCreatedAt;

    // Convert milliseconds to minutes
    const timeDifferenceInMinutes = timeDifference / (1000 * 60);

    return timeDifferenceInMinutes <= 15;
};


export default async function handler(req, res) {
    try {

        await connectMongo();
        // new slot

        const { userId, bookingId, reqId } = req.query;
        const user = await Users.findById(userId);

        if (!user) return res.status(404).json({ status: false, message: "User doesn't exist!" });

        const booking = await Bookings.findById(bookingId);
        if (!booking) return res.status(404).json({ status: false, message: "Booking is not found!" });

        if (reqId === userId || user.isAdmin) {
            if (!user.isAdmin) {
                if (canDeleteBookingWithin15Minutes(booking.createdAt)) {
                    await Bookings.findByIdAndDelete(bookingId);
                } else {
                    return res.status(200).json({ status: false, message: "Can't be deleted. You can only delete within 15 minutes after the booking." })
                }
            } else {
                await Bookings.findByIdAndDelete(bookingId);
            }
        } else {
            return res.status(401).json({ status: false, message: "You're not allowed to do that!" })
        }

        if (booking.title === "Restricted") {
            return res.status(200).json({ status: true, message: "Slot is Unrestricted" })
        }
        return res.status(200).json({ status: true, message: "Booking is deleted!" })

    } catch (err) {
        return res.status(501).json({ status: false, message: err.message });
    }
}

