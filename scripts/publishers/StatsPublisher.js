import { Publisher } from "./_Publisher.js";

class StatsPublisher extends Publisher {
    constructor() {
        super();
    }

    notify(action) {
        this._observers.forEach(obs => obs.update(action))
    }
}

export { StatsPublisher };