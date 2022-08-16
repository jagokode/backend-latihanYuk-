import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// metode register static
userSchema.statics.register = async function (email, password) {
  // validation
  if (!email || !password) throw new Error("Semua kolom harus diisi");
  if (!validator.isEmail(email)) throw new Error("Email tidak valid");
  if (!validator.isStrongPassword(password))
    throw new Error(
      "Password tidak kuat.Harus mengandung Huruf besar dan kecil, karakter khusus, dan angka"
    );

  // check email
  const emailExist = await this.findOne({ email });
  if (emailExist) throw new Error("Email sudah terdaftar");

  // hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // save to database
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) throw new Error("Semua kolom harus diisi");

  // check email
  const user = await this.findOne({ email });
  if (!user) throw new Error("Email atau password salah");

  // compare password
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw new Error("Email atau password salah");

  // send user
  return user;
};

export default mongoose.model("User", userSchema);
