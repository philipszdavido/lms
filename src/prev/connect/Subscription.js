
class Subscription{
    constructor(store, stateChange) {
        this.store = store
        this.stateChange = stateChange
    }

    trySubscribe() {
        this.store.subscribe(this.stateChange)
    }
}

module.exports = Subscription