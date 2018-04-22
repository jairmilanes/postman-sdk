import operations from "./operations";
import getUuidByString from "uuid-by-string/index";

export default collection => {
    return {
        add: add(collection),
        ...operations(collection.event, 'id')
    }
}

const add = collection => (params) => {
    const {name, listen, disabled, type, exec, source} = params

    const event = {
        id: getUuidByString(name),
        listen: listen || 'prerequest',
        disabled: disabled || false,
        script: {
            id: getUuidByString(name),
            type: type || 'text/javascript',
            name: name
        }
    }

    if (!exec && !source) {
        throw new Error("Cannot create an event without a script to run")
    }

    if (exec) {
        event.script.exec = exec
    }

    if (source) {
        event.script.source = source
    }

    collection.event.push(event)
}