import { useContext } from "react";
import { DataContext } from "../App";
import FuturesForm from "./FuturesForm";
import OptionsForm from "./OptionsForm";

export default function AddLeg() {
    const { state, setState, addLeg, cancelLeg } = useContext(DataContext);

    const handleSelectOptions = (e, fieldName) => {
        setState(state => ({
            ...state,
            [fieldName]: e.target.value
        }));
    };

    const handleRadioOptions = e => {
        setState(state => ({
            ...state,
            segment: e.target.value
        }));
    };

    return (
        <>
            <div className="segments">
                <h4>Select Segments</h4>
                <label>
                    <input
                        type="radio"
                        name="segment"
                        value="Futures"
                        defaultChecked={state.segment === "Futures"}
                        onChange={handleRadioOptions}
                    />
                    Futures
                </label>
                <label>
                    <input
                        type="radio"
                        name="segment"
                        value="Options"
                        defaultChecked={state.segment === "Options"}
                        onChange={handleRadioOptions}
                    />
                    Options
                </label>
            </div>

            {state.segment === "Options" ? (
                <OptionsForm
                    {...{
                        state,
                        setState,
                        handleSelectOptions
                    }}
                />
            ) : (
                <FuturesForm
                    {...{
                        state,
                        setState,
                        handleSelectOptions
                    }}
                />
            )}

            <div className="buttons-div" style={{ marginTop: "35px" }}>
                <button onClick={addLeg}>Add Leg</button>
                <button onClick={cancelLeg}>Cancel</button>
            </div>
        </>
    );
}
