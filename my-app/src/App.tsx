import { NinjaJourney } from "./components/NinjaJourney";

/**
 * Reference app for the Aurora design system.
 * Only renders components that comply with the Aurora token contract.
 * Off-brand demos (cream + purple handwriting cards, etc.) are not shipped.
 */
function App() {
  return (
    <div className="flex flex-col items-center">
      <NinjaJourney />
    </div>
  );
}

export default App;
