// Action Creator
export function addPerson(person: any) {
    return {
        type: 'ADD_PERSON',
        data: person
    }
}

export function deletePerson(person: any) {
    return {
        type: 'DELETE_PERSON',
        data: person
    }
}

export function updatePerson(person: any) {
    return {
        type: 'UPDATE_PERSON',
        id: person.id,
        data: {
            name: person.name,
            username: person.username,
            email: person.email,
        }
    }
}

export function setPerson(person: any) {
    return {
        type: 'SET_PERSON',
        data: person
    }
}

