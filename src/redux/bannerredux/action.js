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
    addBanner: (data) => {
        return {
            type: actions.BANNER_ADD,
            data,
        };
    },
    updateBanner: (data) => {
        return {
            type: actions.BANNER_UPDATE,
            data,
        };
    },
    deleteBanner: (data) => {
        return {
            type: actions.BANNER_DELETE,
            data,
        };
    },
};

export default actions;
