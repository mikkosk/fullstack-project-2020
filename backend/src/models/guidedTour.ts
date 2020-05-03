import mongoose, {Schema, Document} from 'mongoose';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface ITour extends Document {
    id: string;
    possibleLanguages: Array<string>;
    lengthInMinutes: number;
    tourName: string;
    maxNumberOfPeople: number;
    price: number;
    tourInfo?: string; 
}

const tourSchema: Schema = new Schema({
    id: String,
    possibleLanguages: [{ type: String }],
    lengthInMinutes: Number,
    tourName: String,
    maxNumberOfPeople: Number,
    price: Number,
    tourInfo: String || undefined
});

export default mongoose.model<ITour>('Tour', tourSchema);
