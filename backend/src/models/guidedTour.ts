import mongoose, {Schema, Document} from 'mongoose';
import { GuidedTour } from '../types';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix

const tourSchema: Schema = new Schema({
    id: String,
    possibleLanguages: [{ type: String }],
    lengthInMinutes: Number,
    tourName: String,
    maxNumberOfPeople: Number,
    price: Number,
    tourInfo: String || undefined
});

export default mongoose.model<GuidedTour & Document>('Tour', tourSchema);
