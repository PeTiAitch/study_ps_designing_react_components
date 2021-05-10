import Speakers from "../src/components/Speakers/Speakers";
import Layout from "../src/components/Layout/Layout";
import { SpeakersProvider } from "../src/contexts/SpeakerContext";

export default function Page() {
  return (
    <Layout>
      <SpeakersProvider>
        <Speakers bgColor="bg-gray-500" />
      </SpeakersProvider>
    </Layout>
  );
}
