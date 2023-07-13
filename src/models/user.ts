import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    require: [true, "Email is required!"],
  },
  username: {
    type: String,
    require: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should be contain 8-20 alphanumeric letters and ba unique!",
    ],
  },
  image: {
    type: String,
  },
  id: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
