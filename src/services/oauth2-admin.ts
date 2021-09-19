import axios from 'axios';

const accept = async (code: string, cif: string) => {
    console.log(`accept login request with code=${code}, cif=${cif}`)
    const endpoint = process.env.OAUTH_ADMIN_ENDPOINT || "http://localhost:8081"
    console.log(`endpoint=${endpoint}`)
    const body = JSON.stringify({"cif": cif})
    const url = `${endpoint}/oauth2/auth/request/login/accept?login_challenge=${code}`;
    try {
        const res = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.data
    } catch (err) {
        throw new Error('Unable to get a token.')
    }
}
export {accept}

