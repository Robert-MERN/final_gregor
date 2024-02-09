import { Schema, connection } from "mongoose"

const restrictedBaySchema = new Schema(
    {
        restricted_bay_field: {
            type: String,
        },
        restricted_date: {
            type: String,
        },
        note: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true });

const Db = connection.useDb("Gregor");
const RestrictedBays = Db.models.RestrictedBays || Db.model('RestrictedBays', restrictedBaySchema);
export default RestrictedBays

