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
        mon: {type: String, minlength: 5, maxlength: 6},
        tue: {type: String, minlength: 5, maxlength: 6},
        wed: {type: String, minlength: 5, maxlength: 6},
        thu: {type: String, minlength: 5, maxlength: 6},
        fri: {type: String, minlength: 5, maxlength: 6},
        sat: {type: String, minlength: 5, maxlength: 6},
        sun: {type: String, minlength: 5, maxlength: 6}
    },
    closed: {
        mon: {type: String, minlength: 5, maxlength: 6},
        tue: {type: String, minlength: 5, maxlength: 6},
        wed: {type: String, minlength: 5, maxlength: 6},
        thu: {type: String, minlength: 5, maxlength: 6},
        fri: {type: String, minlength: 5, maxlength: 6},
        sat: {type: String, minlength: 5, maxlength: 6},
        sun: {type: String, minlength: 5, maxlength: 6}
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