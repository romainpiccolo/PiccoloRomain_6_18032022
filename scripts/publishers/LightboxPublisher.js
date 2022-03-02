import { Publisher } from "./_Publisher.js";

class LightboxPublisher extends Publisher {
    constructor() {
        super();
    }

    notify(action, data) {
        this._observers.forEach(obs => obs.update(action, data))
    }
}

export { LightboxPublisher };