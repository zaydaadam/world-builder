//TODO import database

const landmarkSchema = new Schema(
    {
        map_id:{
            type: String,    //can be set to number
            required: true,
            unique: true,
            trim: true
        },

        name:{
            type: String,
            required: true,
            unique: true
        },

        description:{
            type: String,
            required: true
        },

        x_position:{
            type: Number,
            required: true
        },

        y_position:{
            type: Number,
            required: true
        }
    }
)

export default landmarkSchema    //this for now
//export const Landmark = INSERT_DATABASE_HERE()  //use when we get a database setup