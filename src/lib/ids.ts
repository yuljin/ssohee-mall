export function createOrderNumber() {
  const date = new Date();
  const day = [
    date.getFullYear().toString().slice(-2),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();

  return `HB${day}-${suffix}`;
}

export function createPublicToken() {
  return crypto.randomUUID().replaceAll("-", "");
}
