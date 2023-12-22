const crypto = require("crypto")
const secp256k1 = require("tiny-secp256k1")

function generateKeyPair(privateKey) {
  // Generate a key pair
  const publicKey = secp256k1.pointFromScalar(privateKey)

  return { privateKey, publicKey }
}

function sign(messageHash, privateKey) {
  // Sign the message
  return secp256k1.sign(messageHash, privateKey)
}

function verify(messageHash, signature, publicKey) {
  // Verify the signature
  return secp256k1.verify(messageHash, publicKey, signature)
}

function main() {
  // Generate a key pair
  // const privateKey = crypto.randomBytes(32)
  const privateKey = Buffer.from("e081f3e29a1c4eaf12a5fe9fb4cb5a744ddc81ec9f6ca9ca5a412407ec4d1fb0", "hex")
  const keyPair = generateKeyPair(privateKey)

  // Create a message
  const message = "Hello World"
  // Compute the hash of the message
  const messageHash = crypto.createHash("sha256").update(message).digest()
  console.info("msg hash:", messageHash.toString("hex"))

  // Sign the message
  const signature = sign(messageHash, keyPair.privateKey)
  console.info("signature:", Buffer.from(signature).toString("hex"))

  // Verify the signature
  const isValid = verify(messageHash, signature, keyPair.publicKey)

  // Log the result
  console.log("Is the signature valid?", isValid)
}

main()
