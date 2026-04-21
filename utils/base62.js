const CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function encode(num) {
  let str = "";
  while (num > 0) {
    str = CHARSET[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str || "a";
}

module.exports = { encode };