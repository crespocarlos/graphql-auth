import bcrypt from 'bcrypt-nodejs'
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUserDocument extends Document {
  email: string
  password: string
}

export interface IUserModel extends IUserDocument {
  comparePassword: (
    this: IUserModel,
    candidatePassword: string,
    cb: any
  ) => null
}

export interface IUser extends Model<IUserModel> {}

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const UserSchema: Schema = new mongoose.Schema({
  email: { type: String },
  password: { type: String }
})

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
UserSchema.pre<IUserModel>('save', function(next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(
      user.password,
      salt,
      () => {},
      (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      }
    )
  })
})

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.
UserSchema.methods.comparePassword = function comparePassword(
  this: IUserModel,
  candidatePassword: string,
  cb: any
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

const User: IUser = mongoose.model<IUserModel, IUser>('user', UserSchema)

export default User
