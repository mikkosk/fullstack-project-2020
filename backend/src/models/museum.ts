import mongoose, {Schema, Document} from 'mongoose';
import { Museum } from '../types';
import uniqueValidator from 'mongoose-unique-validator';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix

const museumSchema: Schema = new Schema({
    museumName: {
        type: String,
        unique: true
    },
    open: {
        mon: {type: String, minlength: 5, maxlength: 5},
        tue: {type: String, minlength: 5, maxlength: 5},
        wed: {type: String, minlength: 5, maxlength: 5},
        thu: {type: String, minlength: 5, maxlength: 5},
        fri: {type: String, minlength: 5, maxlength: 5},
        sat: {type: String, minlength: 5, maxlength: 5},
        sun: {type: String, minlength: 5, maxlength: 5}
    },
    closed: {
        mon: {type: String, minlength: 5, maxlength: 5},
        tue: {type: String, minlength: 5, maxlength: 5},
        wed: {type: String, minlength: 5, maxlength: 5},
        thu: {type: String, minlength: 5, maxlength: 5},
        fri: {type: String, minlength: 5, maxlength: 5},
        sat: {type: String, minlength: 5, maxlength: 5},
        sun: {type: String, minlength: 5, maxlength: 5}
    },
    openInfo: {
        type: String || undefined,
    },
    offeredTours: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TourMon'
        }
    ],
    museumInfo: {
        type: String || undefined,
    }
});

museumSchema.plugin(uniqueValidator);



export default mongoose.model<Museum & Document>('MuseumMon', museumSchema);