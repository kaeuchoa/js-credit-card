
const Bind = function(model, view, ...properties){

    const proxy = new Proxy(model, {
        set(target, prop, value, receiver) {
            const updated = Reflect.set(target, prop, value);
            if (properties.includes(prop)) {
                view.update(prop, value);
            }
            return updated;
        }
    })

    return proxy;

};
