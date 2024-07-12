const actions = {
    BANNER_GET: "BANNER_GET",
    BANNER_ADD: "BANNER_ADD",
    BANNER_UPDATE: "BANNER_UPDATE",
    BANNER_DELETE: "PRODUCTMASTER_DELETE",

    getBanner: (data) => {
        return {
            type: actions.BANNER_GET,
            data,
        };
    },
    addbanner: (data) => {
        return {
            type: actions.BANNER_ADD,
            data,
        };
    },
    updatebanner: (data) => {
        return {
            type: actions.BANNER_UPDATE,
            data,
        };
    },
    deletebanner: (data) => {
        return {
            type: actions.BANNER_DELETE,
            data,
        };
    },
};

export default actions;
