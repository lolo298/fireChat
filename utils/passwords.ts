export async function hashPassword(pass, salt) {
  const pbkdf2 = require("crypto").pbkdf2;
  const ITERATIONS = 1000;
  const KEYLEN = 64;
  const DIGEST = "sha512";
  return new Promise((resolve, reject) => {
    pbkdf2(pass, salt, ITERATIONS, KEYLEN, DIGEST, (err, key) => {
      if (err) {
        reject({ success: false, message: "Server error" });
      }
      resolve(key.toString("hex"));
    });
  });
}
