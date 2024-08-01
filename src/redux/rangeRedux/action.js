const actions = {
    RANGE_GET: "RANGE_GET",
    RANGE_ADD: "RANGE_ADD",
    RANGE_UPDATE: "RANGE_UPDATE",
    RANGE_DELETE: "RANGE_DELETE",

    getRange: (data) => {
        return {
            type: actions.RANGE_GET,
            data,
        };
    },
    addRange: (data) => {
        return {
            type: actions.RANGE_ADD,
            data,
        };
    },
    updateRange: (data) => {
        return {
            type: actions.RANGE_UPDATE,
            data,
        };
    },
    deleteRange: (data) => {
        return {
            type: actions.RANGE_DELETE,
            data,
        };
    },
};

export default actions;
