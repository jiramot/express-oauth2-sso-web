import * as express from 'express';

const securityHeader = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader("strict-transport-security", "max-age=31536000;includeSubDomains;preload")
    res.setHeader("x-xss-protection", "1;mode=block")
    res.setHeader("x-frame-options", "SAMEORIGIN")
    res.setHeader("x-content-type-options", "nosniff")
    res.setHeader("referrer-policy", "no-referrer-when-downgrade")
    res.setHeader("x-permitted-cross-domain-policies", "none")
    res.setHeader("expect-ct", "max-age=31536000")
    res.setHeader("content-security-policy", "default-src * 'unsafe-inline' 'unsafe-eval'")
    res.setHeader("feature-policy", "default")
    next()
}

export default securityHeader