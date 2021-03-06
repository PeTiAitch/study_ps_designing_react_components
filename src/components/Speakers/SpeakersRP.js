import React, { useState, useContext } from "react";

import SpeakerSearchBar from "../SpeakerSearchBar/SpeakerSearchBar";
import Speaker from "../Speaker/Speaker";
import { REQUEST_STATUS } from "../../reducers/request";
import Request from "../RPs/Request";
import SpecialMessage from "../RPs/SpecialMessage";
import { SpeakersContext } from "../../contexts/SpeakerContext";

const Speakers = ({ bgColor }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const speakersInContext = useContext(SpeakersContext);
  console.log(speakersInContext);

  return (
    <div className={bgColor}>
      <SpeakerSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <SpecialMessage>
        {({ specialMessage }) => {
          return (
            <Request baseUrl="http://localhost:4000" routeName="speakers">
              {({ records: speakers, status, error, put }) => {
                async function onFavoriteToggleHandler(speakerRec) {
                  put({
                    ...speakerRec,
                    isFavorite: !speakerRec.isFavorite,
                  });
                }

                const success = status === REQUEST_STATUS.SUCCESS;
                const isLoading = status === REQUEST_STATUS.LOADING;
                const hasErrored = status === REQUEST_STATUS.ERROR;
                return (
                  <>
                    {specialMessage && specialMessage.length > 0 && (
                      <div
                        className="bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-4 text-2xl"
                        role="alert"
                      >
                        <p className="font-bold">Special Message</p>
                        <p>{specialMessage}</p>
                      </div>
                    )}
                    {isLoading && <div>Loading...</div>}

                    {hasErrored && (
                      <div>
                        Loading error... Is the json-server running? (try "npm
                        run json-server" at terminal prompt)
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
                              : targetString.includes(
                                  searchQuery.toLowerCase()
                                );
                          })
                          .map((speaker) => (
                            <Speaker
                              key={speaker.id}
                              {...speaker}
                              onFavoriteToggle={() =>
                                onFavoriteToggleHandler(speaker)
                              }
                            />
                          ))}
                      </div>
                    )}
                  </>
                );
              }}
            </Request>
          );
        }}
      </SpecialMessage>
    </div>
  );
};

export default Speakers;
