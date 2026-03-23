//TODO import database and encryption method

const userSchema = new Schema(
    {
        username:{
            type: String,   //This determines type the field is
            required: true, //This makes this field necessary 
            unique: true,   //this is here to make sure noone uses the same username
            //lowercase: true, //this would set the username to be lowercase only
            trim: true, //removes white spaces ie. user name -> username
            minLength: 1,   //this is the min amount of characters
            maxLength: 20   //This is the max amount of characters and can be changed later
        },

        password:{
            type: String,
            required: true,
            minLength: 6,
            maxLength: 50
        },

        email:{
            type: String,
            required: true,
            unique: true,
            //lowercase: true,  //don't know if this is necessary, but it was in the tutorial I found
            trim: true
        }
    },
    
    {
        timestamps: true    //this gets the time it was created
    }
)

export default userSchema    //this for now
//export const User = INSERT_DATABASE_HERE()  //use when we get a database setup