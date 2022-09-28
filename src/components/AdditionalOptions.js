export const AdditionalOptions = ({ state, setState }) => {
    if (state.strikeCriteria === "Strike Type") {
        return (
            <div>
                <p>Strike Type</p>
                <select
                    onChange={e => {
                        setState(state => ({
                            ...state,
                            additionalOptions: {
                                ...state.additionalOptions,
                                "Strike Type": {
                                    ...state.additionalOptions["Strike Type"],
                                    strikeType: e.target.value
                                }
                            }
                        }));
                    }}
                    name={"Strike Type"}
                >
                    {["ATM", "ITM9", "ITM10", "ITM11", "ITM12", "ITM13"]?.map(
                        optionName => {
                            return (
                                <option
                                    key={optionName}
                                    className="mr-4 bg-white font-medium  cursor-pointer "
                                    value={optionName}
                                >
                                    {optionName}
                                </option>
                            );
                        }
                    )}
                </select>
            </div>
        );
    }
    if (state.strikeCriteria === "Straddle Width") {
        return (
            <div style={{ display: "flex", gap: "10px", marginTop: "40px" }}>
                [ <span>ATM Strike</span>{" "}
                <select
                    onChange={e => {
                        setState(state => ({
                            ...state,
                            additionalOptions: {
                                ...state.additionalOptions,
                                "Straddle Width": {
                                    ...state.additionalOptions[
                                        "Straddle Width"
                                    ],
                                    type: e.target.value
                                }
                            }
                        }));
                    }}
                    name={"Straddle Width"}
                >
                    {["+", "-"]?.map(optionName => {
                        return (
                            <option
                                key={optionName}
                                className="mr-4 bg-white font-medium  cursor-pointer "
                                value={optionName}
                            >
                                {optionName}
                            </option>
                        );
                    })}
                </select>{" "}
                ({" "}
                <input
                    type="number"
                    value={state.additionalOptions["Straddle Width"].multiplier}
                    onChange={e => {
                        setState(state => ({
                            ...state,
                            additionalOptions: {
                                ...state.additionalOptions,
                                "Straddle Width": {
                                    ...state.additionalOptions[
                                        "Straddle Width"
                                    ],
                                    multiplier: Number(e.target.value)
                                }
                            }
                        }));
                    }}
                    id="multiplier"
                    name="multiplier"
                />{" "}
                x <span>ATM Straddle Price</span>) ]
            </div>
        );
    }
    if (state.strikeCriteria === "Premium Range") {
        return (
            <div style={{ display: "flex", gap: "10px" }}>
                <div>
                    <p>Lower Range</p>
                    <input
                        type="number"
                        value={
                            state.additionalOptions["Premium Range"].lowerRange
                        }
                        onChange={e => {
                            setState(state => ({
                                ...state,
                                additionalOptions: {
                                    ...state.additionalOptions,
                                    "Premium Range": {
                                        ...state.additionalOptions[
                                            "Premium Range"
                                        ],
                                        lowerRange: Number(e.target.value)
                                    }
                                }
                            }));
                        }}
                        id="lowerRange"
                        name="lowerRange"
                    />
                </div>
                <div>
                    <p>Upper Range</p>
                    <input
                        type="number"
                        value={
                            state.additionalOptions["Premium Range"].upperRange
                        }
                        onChange={e => {
                            setState(state => ({
                                ...state,
                                additionalOptions: {
                                    ...state.additionalOptions,
                                    "Premium Range": {
                                        ...state.additionalOptions[
                                            "Premium Range"
                                        ],
                                        upperRange: Number(e.target.value)
                                    }
                                }
                            }));
                        }}
                        id="upperRange"
                        name="upperRange"
                    />
                </div>
            </div>
        );
    }
    if (state.strikeCriteria === "Closest Premium") {
        return (
            <div>
                <p>Premium</p>
                <input
                    type="number"
                    value={state.additionalOptions["Closest Premium"].premium}
                    onChange={e => {
                        setState(state => ({
                            ...state,
                            additionalOptions: {
                                ...state.additionalOptions,
                                "Closest Premium": {
                                    ...state.additionalOptions[
                                        "Closest Premium"
                                    ],
                                    premium: Number(e.target.value)
                                }
                            }
                        }));
                    }}
                    id="premium"
                    name="premium"
                />
            </div>
        );
    }
};
