export default function generateId(length = 12) {
   return crypto.randomUUID().slice(24, 24 + length);
}
