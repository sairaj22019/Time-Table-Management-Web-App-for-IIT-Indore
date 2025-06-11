import {Schema,model,models} from 'mongoose';

const AdminSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User ID is required"]
    },
    polls:[
       {
         type:Schema.Types.ObjectId,
         ref:"Polls",
       }
    ],
    notifications:[
      {
        type:Schema.Types.ObjectId,
        ref:"Notification"
      }
    ]
    
})

const Admin=models?.Admin||model("Admin",AdminSchema);
export default Admin;