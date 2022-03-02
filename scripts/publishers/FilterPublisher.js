import { Publisher } from "./_Publisher.js";

class FilterPublisher extends Publisher {
    constructor() {
        super();
    }

    notify(data) {
        this._observers.forEach(obs => obs.update(data))
    }
}

export { FilterPublisher };