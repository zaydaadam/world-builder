//TODO import database

const mapSchema = new Schema(
    {
        project_id:{
            type: String,    //can be set to number
            required: true,
            unique: true,
            trim: true
        },

        image_url:{ 
            type: String,
            required: true,
            trim: true
        }
    }
)

export default mapSchema    //this for now
//export const Map = INSERT_DATABASE_HERE()  //use when we get a database setup