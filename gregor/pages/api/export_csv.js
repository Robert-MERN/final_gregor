import * as fastCsv from 'fast-csv';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */



export default async function handler(req, res) {
    try {
        const data = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ error: 'Invalid request body format' });
        }

        // Create a stream to write the CSV data
        const csvStream = fastCsv.format({ headers: true });
        csvStream.pipe(res);

        // Write the data to the CSV stream
        data.forEach(item => {
            csvStream.write(item);
        });

        // End the CSV stream
        csvStream.end();

        // Set headers for the response
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=exported-data.csv');

        // End the response to trigger the download
        res.status(200);
        res.end();
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
