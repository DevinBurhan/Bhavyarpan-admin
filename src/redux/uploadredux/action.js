const actions = {
  UPLOAD_GET: "UPLOAD_GET",
  UPLOAD_ADD: "UPLOAD_ADD",
  UPLOAD_DELETE: "UPLOAD_DELETE",

  getUplaod: (data) => {
    return {
      type: actions.UPLOAD_GET,
      data,
    };
  },
  addUplaod: (data) => {
    return {
      type: actions.UPLOAD_ADD,
      data,
    };
  },

  deleteUplaod: (data) => {
    return {
      type: actions.UPLOAD_DELETE,
      data,
    };
  },
};

export default actions;
