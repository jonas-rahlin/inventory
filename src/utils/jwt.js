
import * as jose from "jose";

export async function signJWT(payload, secret, options = {}) {
    secret = secret || process.env.JWT_SECRET;
    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(new TextEncoder().encode(secret));
    
    return token;
}

export async function verifyJWT(token, secret) {
    secret = secret || process.env.JWT_SECRET;
    const { payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(secret),
    )
    return payload;
}