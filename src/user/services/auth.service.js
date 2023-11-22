var bcrypt = require("bcryptjs");
const { getUserByEmail } = require("./user.service");

async function loginService(email, password) {
  const user = await getUserByEmail(email);
  if ((await verifyPassword(password, user.password)) && user.isActive != 0) {
    delete user.password;
    return user;
  }
  return null;
}

async function hashPassword(passText) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(passText, salt);
}

async function verifyPassword(passText, hash) {
  try {
    return await bcrypt.compare(passText, hash);
  } catch (error) {
    return false;
  }
}

module.exports = { hashPassword, loginService };
