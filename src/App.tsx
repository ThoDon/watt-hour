import { useReducer, useEffect } from "react";
import { FormControl } from "./form/components/form-control/FormControl";
import { FormInput } from "./form/components/FormInput/FormInput";

type StateType = {
  power?: number;
  hours?: number;
  days?: number;
  kilowattHours?: number;
  price?: number;
  totalPrice?: number;
};

type ActionsType =
  | { type: "SET_POWER"; payload: number }
  | { type: "SET_HOURS"; payload: number }
  | { type: "SET_DAYS"; payload: number }
  | { type: "SET_KILOWATT_HOURS"; payload: number }
  | { type: "SET_TOTAL_PRICE"; payload: number }
  | { type: "SET_PRICE"; payload: number }
  | { type: "SET_TOTAL_PRICE" };

const reducer = (state: StateType, action: ActionsType) => {
  switch (action.type) {
    case "SET_POWER":
      return { ...state, power: action.payload };
    case "SET_HOURS":
      return { ...state, hours: action.payload };
    case "SET_DAYS":
      return { ...state, days: action.payload };
    case "SET_KILOWATT_HOURS":
      return { ...state, kilowattHours: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_TOTAL_PRICE":
      return {
        ...state,
        totalPrice: getTotalPrice(state.kilowattHours, state.price),
      };
    default:
      return state;
  }
};

export const App: React.FC = () => {
  const [localState, dispatch] = useReducer(reducer, {});

  const { power, hours, days, kilowattHours, price, totalPrice } = localState;

  useEffect(() => {
    if (power && hours && days) {
      const result = Number((hours * days * (power / 1000)).toFixed(2));
      if (!kilowattHours || kilowattHours !== result) {
        dispatch({ type: "SET_KILOWATT_HOURS", payload: result });
      }
      if (price) dispatch({ type: "SET_TOTAL_PRICE" });
    }
  }, [power, hours, days, kilowattHours, price]);

  const handleInputChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target as HTMLInputElement;
    const typeFromName = `SET_${name.toUpperCase()}` as
      | "SET_POWER"
      | "SET_HOURS"
      | "SET_DAYS"
      | "SET_PRICE";
    dispatch({ type: typeFromName, payload: Number(value) });
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form as HTMLFormElement;
      const index = [...form].indexOf(event.target);
      (form.elements[index + 1] as HTMLElement)?.focus();
      event.preventDefault();
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 text-white">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left p-2 sm:p-4">
          <h1 className="text-3xl sm:text-5xl font-bold">Watt hour ?</h1>
          <p className="pt-2 sm:pt-6">
            Calculate how much a finite time of usage will cost you.
          </p>
        </div>
        <div className="card card-compact sm:card-normal  flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
          <form className="card-body text-base">
            <FormControl label="Power">
              <FormInput
                value={power}
                addonText="watts"
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                type="number"
                name="power"
                id="power"
              />
            </FormControl>
            <FormControl label="Duration">
              <FormInput
                value={hours}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                type="number"
                name="hours"
                id="hours"
                max="24"
                addonText="hours"
              />
            </FormControl>
            <FormControl label="Days of usage">
              <FormInput
                value={days}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                type="number"
                name="days"
                id="days"
                addonText="days"
              />
            </FormControl>
            <FormControl label="€ / kilowatt hour">
              <FormInput
                value={price}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                type="number"
                name="price"
                id="price"
                placeholder="0,15€"
                step=".01"
                addonText="€ / kilowatt hour"
              />
            </FormControl>
            <FormControl label="kilowatt / hour">
              <FormInput
                value={kilowattHours}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
                type="number"
                name="kilowattHours"
                id="kilowattHours"
                addonText="kilowatt / hour"
                disabled
              />
            </FormControl>

            {totalPrice && hours && days && (
              <>
                <div className="stats shadow bg-primary text-right mt-4">
                  <div className="stat">
                    <div className="stat-title">Total cost:</div>
                    <div className="stat-value text-white">{totalPrice}€</div>
                    <div className="stat-desc">
                      for a total of {hours * days} hours
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const getTotalPrice = (kilowattHours?: number, price?: number) => {
  if (!kilowattHours || !price) return undefined;
  return Number((kilowattHours * price).toFixed(2));
};
