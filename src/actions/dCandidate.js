import api from "./api";

export const ACTION_TYPES = {
  FETCH_ALL: "FETCH_ALL",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  CREATE: "CREATE",
};

const formatData = (data) => {
  return {
    ...data,
    age: parseInt(data.age ? data.age : 0),
  };
};

export const fetchAll = () => {
  return (dispatch) => {
    api
      .dCandidate()
      .fetchAll()
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.FETCH_ALL,
          payload: response.data,
        });
      })
      .catch((err) => console.log("error", err));
  };
};

export const create = (data, onSuccess) => {
  return (dispatch) => {
    const formatedData = formatData(data);
    api
      .dCandidate()
      .create(formatedData)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.CREATE,
          payload: response.data,
        });
        onSuccess();
      });
  };
};

export const update = (id, data, onSuccess) => {
  return (dispatch) => {
    const formatedData = formatData(data);
    api
      .dCandidate()
      .update(id, formatedData)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.UPDATE,
          payload: { id, ...data },
        });
        onSuccess();
      });
  };
};

export const Delete = (id, onSuccess) => {
  return (dispatch) => {
    api
      .dCandidate()
      .delete(id)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.DELETE,
          payload: id,
        });
        onSuccess();
      });
  };
};
