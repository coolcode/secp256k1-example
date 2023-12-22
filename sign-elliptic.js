const crypto = require("crypto")
const elliptic = require("elliptic")

// Create an elliptic curve instance with the secp256k1 curve
const ecdsa = new elliptic.ec("secp256k1")

// Function to generate a key pair
function generateKeyPair(privateKeyHex) {
  // Generate a key pair
  //const privateKeyBN = ecdsa.keyFromPrivate(privateKeyHex, 'hex')

  // const keyPair = ec.genKeyPair()
  // Generate a key pair using the specific private key
  const keyPair = ecdsa.keyFromPrivate(privateKeyHex)

  return { privateKey: keyPair.getPrivate(), publicKey: keyPair.getPublic() }
}

// Function to sign a message using a private key
function sign(message, privateKey) {
  // Sign the message
  return ecdsa.sign(message, privateKey) //,"hex",{canonical:true})
}

// Function to verify a signature using a public key
function verify(message, signature, publicKey) {
  // Verify the signature
  return ecdsa.verify(message, signature, publicKey)
}

function main() {
  // Generate a key pair
  const keyPair = generateKeyPair("e081f3e29a1c4eaf12a5fe9fb4cb5a744ddc81ec9f6ca9ca5a412407ec4d1fb0")

  // Create a message
  const message = "Hello World"
  // Compute the hash of the message
  const messageHash = crypto.createHash("sha256").update(message).digest()
  console.info("msg hash:", messageHash.toString("hex"))

  // Sign the message
  const signature = sign(messageHash, keyPair.privateKey)
  // console.info("signature:", signature.toDER("hex"))
  console.info("signature:", signature.r.toString("hex") + signature.s.toString("hex"))

  // Verify the signature
  const isValid = verify(messageHash, signature, keyPair.publicKey)

  // Log the result
  console.log("Is the signature valid?", isValid)
}

main()
