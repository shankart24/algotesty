import { useContext } from "react";
import { DataContext } from "../App";
import FuturesForm from "./FuturesForm";
import OptionsForm from "./OptionsForm";

export default function AddLeg() {
    const {
        state,
        setState,
        addLeg,
        cancelLeg,
        renderAdditionalOptions,
        handleSelectOptions,
        handleRadioOptions
    } = useContext(DataContext);

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
                        handleSelectOptions,
                        renderAdditionalOptions
                    }}
                />
            ) : (
                <FuturesForm
                    {...{
                        state,
                        setState,
                        handleSelectOptions,
                        renderAdditionalOptions
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
