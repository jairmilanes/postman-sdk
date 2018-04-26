import getUuidByString from 'uuid-by-string'
import Collection from './../collection'

const COLLECTION_NAME = 'Test Collection'
const COLLECTION_VERSION = '1.0.0'

export const METHODS = [
    'add',
    'findIndex',
    'findWith',
    'findBy',
    'find',
    'has',
    'remove'
]

const event = {
    name: 'test-event',
    listen: 'prerequest',
    disabled: false,
    type: 'text/javascript'
}

const mockScript = {
    id: getUuidByString(event.name),
    type: event.type,
    name: event.name
}

const eventMock =  {
    id: getUuidByString(event.name),
    listen: event.listen,
    disabled: event.disabled,
    script: mockScript
}

const newEventMock = (name, type) => {
    const e = Object.assign({}, eventMock, {id: getUuidByString(name)})
    e.script = Object.assign({}, mockScript, {id: getUuidByString(name), name: name})
    e.script[type] = (type === 'exec' ? ['test script'] : 'http://myscript.com')
    return e
}

const newEvent = (name, type) => {
    if (type === 'exec') {
        return Object.assign({}, event, {id: getUuidByString(name), name: name, exec: ['test script']})
    }
    if (type === 'source') {
        return Object.assign({}, event, {id: getUuidByString(name), name: name, source: 'http://myscript.com'})
    }
}

const collection = Collection(COLLECTION_NAME, COLLECTION_VERSION)
const eventOne = newEvent('event one', 'exec')
const eventMockOne = newEventMock('event one', 'exec')
const eventTwo = newEvent('event two', 'source')
const eventMockTwo = newEventMock('event two', 'source')

describe('Events', () => {
    describe('Operations: ', () => {
        it('should add an event with exec script', () => {
            collection.event.add(eventOne)
            expect(collection.collection.event).toHaveLength(1)
            expect(collection.collection.event[0].script).toHaveProperty('exec')
        })

        it('should add an event with source script', () => {
            collection.event.add(eventTwo)
            console.log(collection.collection.event)
            expect(collection.collection.event).toHaveLength(2)
            expect(collection.event.find(eventMockTwo.id).script).toHaveProperty('source')
        })

        it('Should add with default values if none is supplied', () => {
            const eventName = 'default-event'
            const eventId = getUuidByString(eventName)
            collection.event.add({name: eventName, exec: ['test-script']})
            const defaultE = collection.event.find(eventId)
            expect(defaultE).toMatchObject({
                id: eventId,
                listen: 'prerequest',
                disabled: false,
                script: {
                    id: eventId,
                    type: 'text/javascript',
                    name: eventName,
                    exec: ['test-script']
                }
            })
        })

        it('should contain the expected keys', () => {
            expect(collection.collection.event[0]).toMatchObject(eventMockOne)
            expect(collection.collection.event[1]).toMatchObject(eventMockTwo)
        })

        it('Should find an event', () => {
            const found = collection.event.findBy('id', eventMockTwo.id)
            expect(found).toHaveProperty('id')
            expect(found.id).toEqual(eventMockTwo.id)
        })

        it('Should NOT find an event', () => {
            const found = collection.item.findBy('name', 'dummy-event')
            expect(found).toBeNull()
        })

        it('Should remove events from collection', () => {
            collection.event.remove(eventMockOne.id)
            expect(collection.collection.event).toHaveLength(2)
        })

        it('Should NOT remove if not found', () => {
            const removed = collection.event.remove('dummy')
            expect(removed).toBeFalsy()
        })

        it('Should throw an error if no exec or source parameter', () => {
            expect(() => {collection.event.add(event)}).toThrow()
        })
    })
})