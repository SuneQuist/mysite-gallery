// Garbage Collector
const garbageCollector = new WeakMap();

function Garbage() {
    const _subscriber = { _: new Set() };
    garbageCollector.set(this, _subscriber);
}

Garbage.prototype.proxy = function() { return garbageCollector.get(this); }

// Observer

function observe(obj) {
    Object.keys(obj).forEach((key) => {
        let iv = obj[key];
        Object.defineProperty(obj, key, {
            get() { return iv; },
            set(t) {
                iv = t;
                dep.notify(obj, key);
            }
        })
    })
}

class Dep {
    constructor(weak) { this.subscribers = weak; }
    
    dependency(update) { this.subscribers.proxy()._.add(update); }
    
    notify() {
        this.subscribers.proxy()._.forEach(sub => {
            typeof sub === "function" ? sub() : sub?.executable();
        });
    }
}

let activateUpdate;
const dep = new Dep(new Garbage());

function autorun(update) { dep.dependency(update); }

const state = {
    count: 0,
    cats: []
}

observe(state);

let _this;
window.addEventListener("load", (e) => {
    const executables = document.querySelectorAll("[exec]");

    for (let i = 0; i < executables.length; i++) {
        _this = executables[i];
        const createFunction = new Function(_this.getAttribute("exec"));
        const functionToArray = Array.isArray(createFunction) ? [...createFunction] : [...[createFunction]];
        
        const element = {
            tag: _this,
            executable: createFunction,
            data: typeof createFunction() === "undefined" ? [] : functionToArray
        }

        autorun(element);
    }
})