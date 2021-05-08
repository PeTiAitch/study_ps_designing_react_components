import React, { useState, useEffect } from "react";
import axios from "axios";

import SpeakerSearchBar from "../SpeakerSearchBar/SpeakerSearchBar";
import Speaker from "../Speaker/Speaker";

const Speakers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/speakers/");
      setSpeakers(response.data);
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
    await axios.put(
      `http://localhost:4000/speakers/${speakerRec.id}`,
      toggledSpeakerRec
    );

    setSpeakers([
      ...speakers.slice(0, speakerIndex),
      toggledSpeakerRec,
      ...speakers.slice(speakerIndex + 1),
    ]);
  }

  return (
    <div>
      <SpeakerSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
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
    </div>
  );
};
export default Speakers;
