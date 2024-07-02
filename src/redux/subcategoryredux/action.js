const actions = {
    SUBCATEGORY_GET: "SUBCATEGORY_GET",
    SUBCATEGORY_ADD: "SUBCATEGORY_ADD",
    SUBCATEGORY_UPDATE: "SUBCATEGORY_UPDATE",
    SUBCATEGORY_DELETE: "SUBCATEGORY_DELETE",

    getsubCategory: () => {
        return {
            type: actions.SUBCATEGORY_GET,
        };
    },
    addsubCategory: (data) => {
        return {
            type: actions.SUBCATEGORY_ADD,
            data,
        };
    },
    updatesubCategory: (data) => {
        return {
            type: actions.SUBCATEGORY_UPDATE,
            data,
        };
    },
    deletesubCategory: (data) => {
        return {
            type: actions.SUBCATEGORY_DELETE,
            data,
        };
    },
};

export default actions;
