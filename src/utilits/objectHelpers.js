export let updateObjectInArray = (array, itemId, objPropName, newObjProps) => {
    array.map(i => {
        if (i[objPropName] === itemId) {
            return {...i, ...newObjProps};
        }
        return i
    })
} 