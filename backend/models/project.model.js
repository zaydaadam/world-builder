//TODO import database

const projectSchema = new Schema(
    {
        user_id:{
            type: String,   //can be chaned to Number if we are useing only numerical values
            required: true,
            unique: true,
            trim: true
        },

        title:{
            type: String,
            required: true,
            trim: true
        },

        description:{
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
)

export default projectSchema    //this for now
//export const Project = INSERT_DATABASE_HERE()  //use when we get a database setup