const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters long']
    },
}, { timestamps: true }); // timestamps: true adds createdAt and updatedAt automatically
userSchema.pre('save', function (next) {
    const user = this;
  if (user.isModified('password')) {
    bcrypt.hash(this.password, WORK_FACTOR)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((error) => next(error))
  } else {
    next();
  }
})
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}
const User = mongoose.model('User', userSchema);
module.exports = User;