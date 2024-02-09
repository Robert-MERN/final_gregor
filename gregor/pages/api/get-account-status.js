import Users from '../../models/userModel';
import connectMongo from '../../utils/functions/connectMongo';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async (req, res) => {
  const { id } = req.query;

  try {

    // connecting with monogDB
    await connectMongo();
    console.log("Successfuly conneted with DB");
    // Simulate fetching data from your database based on the email
    const user = await Users.findById(id);
    if (!user) {
      return res.status(200).json({ success: false, message: "Your account is not registered with us anymore. Please contact support." })
    }
    if (!user.accountStatus) {
      if (!user.isAdmin) {
        return res.status(200).json({ success: false, message: "Your account is temporarily blocked by an admin. Please contact support." })
      } else if (user.isAdmin) {
        return res.status(200).json({ success: true, message: "Your account is blocked but, you're an admin. You can still book." })
      }
    }
    return res.status(200).json({ success: true, message: "" });
  } catch (err) {
    res.status(500).json({ success: false, messsage: err.message });
  }
};
