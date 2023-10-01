import base58
import base64

# The private key you provided in base58 format
private_key_base58 = "REPLACE WITH YOUR PRIVATE KEY"

# Decoding the private key from base58 to bytes
private_key_bytes = base58.b58decode(private_key_base58)

# Encoding the private key bytes to base64
base64_bytes = base64.b64encode(private_key_bytes)
base64_private_key = base64_bytes.decode('utf-8')

print(base64_private_key)
print(len(base64_private_key))