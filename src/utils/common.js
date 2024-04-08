import moment from "moment";

export function toA(c1 = "a", c2 = "z") {
  const a = "abcdefghijklmnopqrstuvwxyz".split("");
  return a.slice(a.indexOf(c1), a.indexOf(c2) + 1);
}

export const formatDate = (date, format = "DD/MM/YYYY HH:mm:ss") => moment(date).format(format);
