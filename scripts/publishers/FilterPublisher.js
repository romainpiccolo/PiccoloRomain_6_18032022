class FilterPublisher {
    constructor() {
        this._observers = []
    }

    subscribe(observer) {
        this._observers.push(observer)
    }

    unsubscribe(observer) {
        this._observers = this._observers.filter(obs => obs !== observer)
    }

    notify(data) {
        this._observers.forEach(obs => obs.update(data))
    }
}

export { FilterPublisher };