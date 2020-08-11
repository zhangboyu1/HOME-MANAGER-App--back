class BaseModal {
    constructor(data, msg) {
        // data is going to be an object type:
        this.message = (typeof data === 'string') ? data : msg
        data = (typeof data === 'string') ? null : data;
        msg = (typeof data === 'string') ? null : msg;
        this.data = data ? data : ''
    }
}

class SuccessModel extends BaseModal {
    constructor(data, msg) {
        super(data, msg)
        this.errno = 1;
    }
}

class ErrorModel extends BaseModal {
    constructor(data, msg) {
        super(data, msg)
        this.errno = 0;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}