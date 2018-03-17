let instance = null;

class JobId {
    constructor() {
        this.id = 23450;
    }

    nextId() {
        return ++this.id;
    }
}

function getInstance() {
    if (! instance) {
        instance = new JobId();        
    }
    return instance;
}

module.exports = getInstance;