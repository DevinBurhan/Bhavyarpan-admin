const actions = {
    SUBCATEGORY_GET: "SUBCATEGORY_GET",
    SUBCATEGORY_ADD: "SUBCATEGORY_ADD",
    SUBCATEGORY_UPDATE: "SUBCATEGORY_UPDATE",
    SUBCATEGORY_DELETE: "PRODUCTMASTER_DELETE",

    getSubcategory: (data) => {
        return {
            type: actions.SUBCATEGORY_GET,
            data,
        };
    },
    addSubcategory: (data) => {
        return {
            type: actions.SUBCATEGORY_ADD,
            data,
        };
    },
    updateSubcategory: (data) => {
        return {
            type: actions.SUBCATEGORY_UPDATE,
            data,
        };
    },
    deleteSubcategory: (data) => {
        return {
            type: actions.SUBCATEGORY_DELETE,
            data,
        };
    },
};

export default actions;
