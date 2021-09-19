import express from 'express'
import url from 'url'
import urljoin from 'url-join'
import csrf from 'csurf'
import * as services from '../services'

const csrfProtection = csrf({cookie: true})
const router = express.Router()

router.get('/', csrfProtection, (req, res, next) => {
    const query = url.parse(req.url, true).query
    const challenge = query.login_challenge
    if (typeof challenge == 'undefined') {
        next(new Error('Expected a login challenge to be set but received none.'))
        return
    } else {
        res.render('login', {
            csrfToken: req.csrfToken(),
            challenge: challenge,
            action: urljoin(process.env.BASE_URL || '', '/login'),
        })
    }
})


router.post('/', csrfProtection, async (req, res, next) => {
    const challenge = req.body.challenge
    const cif = req.body.cif
    if (req.body.submit === 'Deny access') {
        console.log('Deny access')
        //reject
    } else {
        try {
            const response = await services.accept(challenge, cif)
            console.log(response)
            res.redirect(response.redirect_url);
        } catch (err) {
            next(err)
        }
    }


})
export default router