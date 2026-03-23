//TODO import database

const characterSchema = new Schema(
    {
        project_id:{
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

        image_url:{ 
            type: String,
            required: true,
            trim: true
        }
    },

    {
        timestamps: true
    }
)

export default characterSchema    //this for now
//export const Character = INSERT_DATABASE_HERE()  //use when we get a database setup