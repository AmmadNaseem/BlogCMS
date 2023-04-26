const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ammadBlog:12345abc@clusterblogcms.qa9sf8o.mongodb.net/blogCMSdb?retryWrites=true&w=majority"
  // { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true }
);

let conn=mongoose.Collection;

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match:/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          // if (this.id === user.id) {
          //   return true;
          // }
          return false;
        }
        return true;
      },
      message: (props) => "The specified email address is already in use.",
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
