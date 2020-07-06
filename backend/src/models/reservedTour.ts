import mongoose, {Schema, Document} from 'mongoose';
import { ReservedTour } from '../types';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix

const reservedSchema: Schema = new Schema({
    possibleLanguages: [{ type: String }],
    lengthInMinutes: Number,
    tourName: String,
    maxNumberOfPeople: Number,
    price: Number,
    tourInfo: String || undefined,
    chosenLanguage: String,
    groupName: String,
    numberOfPeople: Number,
    groupAge: String,
    paymentMethod: String,
    time: String,
    date: String,
    email: String,
    groupInfo: String,
    salary: {type: Number, required: false},
    confirmed: Boolean
});

export default mongoose.model<ReservedTour & Document>('ReservedMon', reservedSchema);