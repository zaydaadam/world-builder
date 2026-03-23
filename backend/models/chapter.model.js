//TODO import database

const chapterSchema = new Schema(
    {
        project_id:{
            type: String,    //can be set to number
            required: true,
            unique: true,
            trim: true
        },

        title:{
            type: String,
            required: true,
            trim: true
        },

        content:{
            type: String,
            required: true
        },

        chapter_order:{
            type: Number,
            required: true,
            unique: true    //hopefully this doesn't conflict with other projects
        }
    }
)

export default chapterSchema;    //this for now
//export const Chapter = INSERT_DATABASE_HERE()  //use when we get a database setup