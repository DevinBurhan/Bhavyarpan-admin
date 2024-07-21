/**
 * It's suggested to configure the RESTful endpoints in this file
 * so that there is only one source of truth, future update of endpoints
 * could be done from here without refactoring on multiple places throughout the app
 */
const API = {
    auth: {
        login: "auth/login",
        signUp: "/signup",
    },
    category: {
        add: "category/create",
        update: "category/",
        get: "category/list",
        delete: "category/",
    },
    subCategory: {
        add: "subCategory/create ",

        update: "subCategory/",
        get: "subCategory/list",
        delete: "subCategory/",
    },
    productMaster: {
        get: "productMaster/list",
        detail: "productMaster/",
        add: "productMaster/create",
        update: "productMaster/",
        delete: "productMaster/",
        upload: "productMaster/import-product",
    },
    banner: {
        get: "banner/list",
        getDetail: "banner/",
        add: "banner/create-banner",
        update: "banner/",
        delete: "banner/",
    },
    advertisment: {
        get: "ads/list",
        add: "ads/create",
        update: "ads/",
        isActive: "ads/update-isActive/",
        delete: "ads/",
    },
    upload: {
        add: "upload/upload-images",
        get: "upload/list",
        delete: "upload/delete-all",
    },
};

export { API };
