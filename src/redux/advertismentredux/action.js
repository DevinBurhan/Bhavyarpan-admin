const actions = {
    ADVERTISMENT_GET: "ADVERTISMENT_GET",
    ADVERTISMENT_ADD: "ADVERTISMENT_ADD",
    ADVERTISMENT_UPDATE: "ADVERTISMENT_UPDATE",
    ADVERTISMENT_DELETE: "PRODUCTMASTER_DELETE",
    ISACTIVEADVERTISMENT_UPDATE: "ISACTIVEADVERTISMENT_UPDATE",

    getAdvertisment: (data) => {
        return {
            type: actions.ADVERTISMENT_GET,
            data,
        };
    },
    addAdvertisment: (data) => {
        console.log("data------", data);
        return {
            type: actions.ADVERTISMENT_ADD,
            data,
        };
    },
    updateAdvertisment: (data) => {
        return {
            type: actions.ADVERTISMENT_UPDATE,
            data,
        };
    },
    deleteAdvertisment: (data) => {
        return {
            type: actions.ADVERTISMENT_DELETE,
            data,
        };
    },
    isActiveAdvertisment: (data) => {
        return {
            type: actions.ISACTIVEADVERTISMENT_UPDATE,
            data,
        };
    },
};

export default actions;
