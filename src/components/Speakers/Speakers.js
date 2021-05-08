import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

import SpeakerSearchBar from "../SpeakerSearchBar/SpeakerSearchBar";
import Speaker from "../Speaker/Speaker";

const Speakers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_ALL_SUCCESS":
        return {
          ...state,
          status: REQUEST_STATUS.SUCCESS,
          speakers: action.speakers,
        };
      case "UPDATE_STATUS":
        return {
          ...state,
          status: action.status,
        };
    }
  };

  const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  };

  const [{ speakers, status }, dispatch] = useReducer(reducer, {
    speakers: [],
    status: REQUEST_STATUS.LOADING,
  });

  //   const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/speakers/");
        dispatch({
          type: "GET_ALL_SUCCESS",
          speakers: response.data,
          status: REQUEST_STATUS.SUCCESS,
        });
      } catch (e) {
        dispatch({
          type: "UPDATE_STATUS",
          status: REQUEST_STATUS.ERROR,
        });
        setError(e);
      }
    };
    fetchData();
  }, []);

  function toggleSpeakerFavorite(speakerRec) {
    return {
      ...speakerRec,
      isFavorite: !speakerRec.isFavorite,
    };
  }

  async function onFavoriteToggleHandler(speakerRec) {
    const toggledSpeakerRec = toggleSpeakerFavorite(speakerRec);
    const speakerIndex = speakers
      .map((speaker) => speaker.id)
      .indexOf(speakerRec.id);
    try {
      await axios.put(
        `http://localhost:4000/speakers/${speakerRec.id}`,
        toggledSpeakerRec
      );
      dispatch({
        type: "GET_ALL_SUCCESS",
        speakers: [
          ...speakers.slice(0, speakerIndex),
          toggledSpeakerRec,
          ...speakers.slice(speakerIndex + 1),
        ],
      });
    } catch (e) {
      dispatch({
        type: "UPDATE_STATUS",
        status: REQUEST_STATUS.ERROR,
      });
      setError(e);
    }
  }

  const success = status === REQUEST_STATUS.SUCCESS;
  const isLoading = status === REQUEST_STATUS.LOADING;
  const hasErrored = status === REQUEST_STATUS.ERROR;

  return (
    <div>
      <SpeakerSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {isLoading && <div>Loading...</div>}
      {hasErrored && (
        <div>
          Loading error... Is the json-server running? (try "npm run
          json-server" at terminal prompt)
          <br />
          <b>ERROR: {error.message}</b>
        </div>
      )}
      {success && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
          {speakers
            .filter((rec) => {
              const targetString = `${rec.firstName} ${rec.lastName}`.toLowerCase();
              return searchQuery.length === 0
                ? true
                : targetString.includes(searchQuery.toLowerCase());
            })
            .map((speaker) => (
              <Speaker
                key={speaker.id}
                {...speaker}
                onFavoriteToggle={() => onFavoriteToggleHandler(speaker)}
              />
            ))}
        </div>
      )}
    </div>
  );
};
export default Speakers;
