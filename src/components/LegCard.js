import { useContext, useState } from "react";
import { DataContext } from "../App";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import FuturesForm from "./FuturesForm";
import OptionsForm from "./OptionsForm";

export const LegCard = ({ data, legId }) => {
    const { setLegsModified, deleteLeg, copyLeg } = useContext(DataContext);

    const [state, setState] = useState({
        ...data,
        simpleMomentum: data.hasOwnProperty("simpleMomentum")
            ? {
                  ...data.simpleMomentum
              }
            : {
                  type: "Points Inc.",
                  val: 0
              },
        trialSL: data.hasOwnProperty("trialSL")
            ? {
                  ...data.trialSL
              }
            : {
                  type: "Points",
                  instrumentMove: 0,
                  stopLossMove: 0
              }
    });
    const [extraOptions, setExtraOptions] = useState({
        simpleMomentum: data?.extraOptions?.simpleMomentum ?? false,
        trialSL: data?.extraOptions?.trialSL ?? false
    });

    const handleSelectOptions = (e, fieldName) => {
        setState(state => ({
            ...state,
            [fieldName]: e.target.value
        }));
    };

    const updateLeg = legId => {
        setDoc(
            doc(db, "legs", legId),
            { ...state, extraOptions: { ...extraOptions } },
            { merge: true }
        )
            .then(() => {
                alert("Updated");
                setLegsModified(legsModified => !legsModified);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            {data.segment === "Options" ? (
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
            <div style={{ display: "flex", gap: "10px" }}>
                <div className="extra-options">
                    <input
                        type="checkbox"
                        name="simpleMomentum"
                        value={extraOptions.simpleMomentum}
                        checked={extraOptions.simpleMomentum}
                        onChange={() =>
                            setExtraOptions(extraOptions => ({
                                ...extraOptions,
                                simpleMomentum: !extraOptions.simpleMomentum
                            }))
                        }
                    />
                    <label>Simple Momentum</label>

                    <div
                        style={{
                            opacity: extraOptions.simpleMomentum ? 1 : 0.5,
                            pointerEvents: extraOptions.simpleMomentum
                                ? "initial"
                                : "none",
                            marginTop: "10px",
                            display: "flex",
                            gap: "20px"
                        }}
                    >
                        <select
                            onChange={e => {
                                setState(state => ({
                                    ...state,
                                    simpleMomentum: {
                                        ...state.simpleMomentum,
                                        type: e.target.value
                                    }
                                }));
                            }}
                            name="simpleMomentum"
                        >
                            {[
                                "Points Inc.",
                                "Points Dec.",
                                "Percentage Inc.",
                                "Percentage Dec."
                            ]?.map(optionName => {
                                return (
                                    <option
                                        key={optionName}
                                        className="mr-4 bg-white font-medium  cursor-pointer "
                                        value={optionName}
                                        selected={
                                            state.simpleMomentum.type ===
                                            optionName
                                        }
                                    >
                                        {optionName}
                                    </option>
                                );
                            })}
                        </select>

                        <input
                            type="number"
                            value={state.simpleMomentum.val}
                            onChange={e => {
                                setState(state => ({
                                    ...state,
                                    simpleMomentum: {
                                        ...state.simpleMomentum,
                                        val: Number(e.target.value)
                                    }
                                }));
                            }}
                        />
                    </div>
                </div>
                <div className="extra-options">
                    <input
                        type="checkbox"
                        name="trialSL"
                        value={extraOptions.trialSL}
                        checked={extraOptions.trialSL}
                        onChange={() =>
                            setExtraOptions(extraOptions => ({
                                ...extraOptions,
                                trialSL: !extraOptions.trialSL
                            }))
                        }
                    />
                    <label>Trial SL</label>

                    <div
                        style={{
                            opacity: extraOptions.trialSL ? 1 : 0.5,
                            pointerEvents: extraOptions.trialSL
                                ? "initial"
                                : "none",
                            marginTop: "10px",
                            display: "flex",
                            gap: "20px"
                        }}
                    >
                        <select
                            onChange={e => {
                                setState(state => ({
                                    ...state,
                                    trialSL: {
                                        ...state.trialSL,
                                        type: e.target.value
                                    }
                                }));
                            }}
                            name="trialSL"
                        >
                            {["Points", "Percentage"]?.map(optionName => {
                                return (
                                    <option
                                        key={optionName}
                                        className="mr-4 bg-white font-medium  cursor-pointer "
                                        value={optionName}
                                        selected={
                                            state.trialSL.type === optionName
                                        }
                                    >
                                        {optionName}
                                    </option>
                                );
                            })}
                        </select>

                        <input
                            type="number"
                            value={state.trialSL.instrumentMove}
                            onChange={e => {
                                setState(state => ({
                                    ...state,
                                    trialSL: {
                                        ...state.trialSL,
                                        instrumentMove: Number(e.target.value)
                                    }
                                }));
                            }}
                        />
                        <input
                            type="number"
                            value={state.trialSL.stopLossMove}
                            onChange={e => {
                                setState(state => ({
                                    ...state,
                                    trialSL: {
                                        ...state.trialSL,
                                        stopLossMove: Number(e.target.value)
                                    }
                                }));
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="buttons-div">
                <button onClick={() => updateLeg(legId)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        style={{ width: "20px" }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>
                </button>
                <button
                    style={{ backgroundColor: "maroon" }}
                    onClick={() => deleteLeg(legId)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        style={{ width: "20px" }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </button>
                <button onClick={() => copyLeg(legId)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{ width: "20px" }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => {
                        console.log(formatData(state, extraOptions));
                    }}
                >
                    Console JSON
                </button>
            </div>
        </>
    );
};

function formatData(data, extraOptions) {
    const {
        position,
        totalLot,
        trialSL,
        simpleMomentum,
        expiry,
        strikeCriteria,
        additionalOptions
    } = data;
    const obj = {
        PositionType: position,
        Lots: totalLot,
        LegTrailSL: !extraOptions.trialSL
            ? "None"
            : {
                  Type: trialSL.type,
                  Value: {
                      InstrumentMove: trialSL.instrumentMove,
                      StopLossMove: trialSL.stopLossMove
                  }
              },
        LegMomentum: !extraOptions.simpleMomentum
            ? "None"
            : {
                  Type: simpleMomentum.type,
                  Value: simpleMomentum.val
              },
        ExpiryKind: expiry,
        EntryType: strikeCriteria,
        StrikeParameter: additionalOptions[strikeCriteria]
    };

    return obj;
}
