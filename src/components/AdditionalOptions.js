export const AdditionalOptions = ({ state, setState }) => {
    const handleOptions = (e, type, fieldName) => {
        setState(state => ({
            ...state,
            additionalOptions: {
                ...state.additionalOptions,
                [type]: {
                    ...state.additionalOptions[type],
                    [fieldName]: e.target.value
                }
            }
        }));
    };

    if (state.strikeCriteria === "Strike Type") {
        return (
            <div>
                <p>Strike Type</p>
                <select
                    onChange={e =>
                        handleOptions(e, "Strike Type", "strikeType")
                    }
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
                    onChange={e => handleOptions(e, "Straddle Width", "type")}
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
                    onChange={e =>
                        handleOptions(e, "Straddle Width", "multiplier")
                    }
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
                        onChange={e =>
                            handleOptions(e, "Premium Range", "lowerRange")
                        }
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
                        onChange={e =>
                            handleOptions(e, "Premium Range", "upperRange")
                        }
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
                    onChange={e =>
                        handleOptions(e, "Closest Premium", "premium")
                    }
                    id="premium"
                    name="premium"
                />
            </div>
        );
    }
};
