class StatsPublisher {
    constructor() {
        this._observers = []
    }

    subscribe(observer) {
        this._observers.push(observer)
    }

    unsubscribe(observer) {
        this._observers = this._observers.filter(obs => obs !== observer)
    }

    notify(action) {
        this._observers.forEach(obs => obs.update(action))
    }
}

export { StatsPublisher };