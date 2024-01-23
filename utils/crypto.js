const crypto = require("crypto");

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
const algorithm = "aes-256-cbc";

function encryptId(id) {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let encryptedId = cipher.update(id.toString(), "utf8", "hex");
  encryptedId += cipher.final("hex");
  return encryptedId;
}

function decryptId(encryptedId) {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let decryptedId = decipher.update(encryptedId, "hex", "utf8");
  decryptedId += decipher.final("utf8");
  return decryptedId;
}

module.exports = {
  encryptId,
  decryptId,
};
