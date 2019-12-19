const crypto = require('crypto');
const moment = require('moment')

module.exports = {
    hmc(password) {
        const secret = 'jiaoyan';
        const hash = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        return hash
    },
    time() {
        let time = moment().format('YYYY-MM-DD');
        return time
    }
}