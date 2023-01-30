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

autorun(() => {console.log(state.count)});
autorun(() => {console.log(state.cats)});

state.cats.push("black cat")
state.cats.push("white cat")
state.count++
state.count++

// Math table^expo

// let table = 2;
// let expo = 93;
// let share = table << expo;

// console.log(share, table, expo)

// Create function from string

// let p = [];
// exec("p", `push('idfk')`)

// function exec(some, ext) {
//     new Function(`${some}.${ext}`)();
// }

// console.log(p)

let _this;
window.addEventListener("DOMContentLoaded", (e) => {
    const executables = document.querySelectorAll("[exec]");

    for (let i = 0; i < executables.length; i++) {
        _this = executables[i];
        const createFunction = new Function(_this.getAttribute("exec"));
        const functionToArray = Array.isArray(createFunction()) ? [...createFunction()] : [...[createFunction()]];

        const element = {
            tag: _this,
            executable: createFunction,
            data: typeof createFunction() === "undefined" ? [] : functionToArray
        }

        autorun(element);
    }
})

const button = document.createElement("button");
button.innerHTML = "add";
button.onclick = () => { state.count++ };
document.body.append(button);