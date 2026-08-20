import { JourneyProvider } from "../journey/JourneyProvider";
import { WineJourney } from "../journey/WineJourney";

export function AppPage() {
  return (
    <JourneyProvider>
      <WineJourney />
    </JourneyProvider>
  );
}
