import React, { useReducer, useEffect } from "react";
import axios from "axios";
import requestReducer, { REQUEST_STATUS } from "../reducers/request";
import {
  GET_ALL_SUCCESS,
  GET_ALL_FAILURE,
  PUT_SUCCESS,
  PUT_FAILURE,
  PUT,
} from "../actions/request";

const useRequest = (baseUrl, routeName) => {
  const signal = React.useRef(axios.CancelToken.source());

  const [{ records, status, error }, dispatch] = useReducer(requestReducer, {
    records: [],
    status: REQUEST_STATUS.LOADING,
    error: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${routeName}`, {
          cancelToken: signal.current.token,
        });
        dispatch({
          type: GET_ALL_SUCCESS,
          records: response.data,
          status: REQUEST_STATUS.SUCCESS,
        });
      } catch (e) {
        console.log("Loading data error", e);
        if (axios.isCancel(e)) {
          console.log("Get request canceled");
        } else {
          dispatch({
            type: GET_ALL_FAILURE,
            error: e,
          });
        }
      }
    };
    fetchData();

    return () => {
      console.log("unmount and cancel running axios request");
      signal.current.cancel();
    };
  }, [baseUrl, routeName]);

  const put = React.useCallback(async (record) => {
    dispatch({
      type: PUT,
      record,
    });
    try {
      await axios.put(`${baseUrl}/${routeName}/${record.id}`, record);
      dispatch({
        type: PUT_SUCCESS,
        record,
      });
    } catch (e) {
      dispatch({
        type: PUT_FAILURE,
        status: REQUEST_STATUS.ERROR,
        error: e,
      });
    }
  }, []);

  const propsLocal = { records, status, error, put };

  return propsLocal;
};

export default useRequest;
