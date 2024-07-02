const actions = {
    CATEGORY_GET: "CATEGORY_GET",
    CATEGORY_ADD: "CATEGORY_ADD",
    CATEGORY_UPDATE: "CATEGORY_UPDATE",
    CATEGORY_DELETE: "CATEGORY_DELETE",

    getCategory: (data) => {
        return {
            type: actions.CATEGORY_GET,
            data,
        };
    },
    addCategory: (data) => {
        return {
            type: actions.CATEGORY_ADD,
            data,
        };
    },
    updateCategory: (data) => {
        return {
            type: actions.CATEGORY_UPDATE,
            data,
        };
    },
    deleteCategory: (data) => {
        return {
            type: actions.CATEGORY_DELETE,
            data,
        };
    },
};

export default actions;
