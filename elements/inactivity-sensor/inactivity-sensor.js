class InactivitySensor extends XElement {

    static get NO_INPUT_TIME() { return 30000 } // in seconds 
    static get TAB_INVISIBLE_TIME() { return 10 } // in ms 

    onCreate() {
        document.addEventListener('visibilitychange', e => this._visibilityChange());
    }

    _visibilityChange() {
        if (document.hidden) {
            this.reset(InactivitySensor.TAB_INVISIBLE_TIME);
        } else {
            this.reset();
        }
    }

    reset(seconds) {
        clearTimeout(this._timeout);
        seconds = seconds || InactivitySensor.NO_INPUT_TIME;
        this._timeout = setTimeout(() => this._inactive(), seconds * 1000);
    }

    _inactive() {
        this.fire('x-inactive');
    }
}