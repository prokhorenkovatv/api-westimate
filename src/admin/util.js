import bcrypt from "bcrypt";
import models from "models";

async function authenticate(email, password) {
  const userRecord = await models.User.findOne({
    where: { email },
  });
  if (userRecord) {
    const matched = await bcrypt.compare(password, userRecord.password);
    if (matched) {
      return userRecord;
    }
  }
  return false;
}
export { authenticate };
