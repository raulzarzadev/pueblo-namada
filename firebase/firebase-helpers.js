export const mapUserFromFirebase = (user) => {
  if (!user) return null
  const { email, displayName, photoURL, phoneNumber, uid } =
    user
  return {
    email,
    displayName,
    name: displayName,
    uid
  }
}
