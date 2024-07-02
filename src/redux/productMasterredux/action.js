const actions = {
    PRODUCTMASTER_GET: "PRODUCTMASTER_GET",
    PRODUCTMASTER_ADD: "PRODUCTMASTER_ADD",
    PRODUCTMASTER_UPDATE: "PRODUCTMASTER_UPDATE",
    PRODUCTMASTER_DELETE: "PRODUCTMASTER_DELETE",

    getproductMaster: () => {
        return {
            type: actions.PRODUCTMASTER_GET,
        };
    },
    addproductMaster: (data) => {
        return {
            type: actions.PRODUCTMASTER_ADD,
            data,
        };
    },
    updateproductMaster: (data) => {
        return {
            type: actions.PRODUCTMASTER_UPDATE,
            data,
        };
    },
    deleteproductMaster: (data) => {
        return {
            type: actions.PRODUCTMASTER_DELETE,
            data,
        };
    },
};

export default actions;
