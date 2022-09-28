import { AdditionalOptions } from "./AdditionalOptions";

export default function OptionsForm({ state, setState, handleSelectOptions }) {
    return (
        <div className="options-form">
            <div>
                <p>Lots</p>
                <input
                    type="number"
                    value={state.totalLot}
                    onChange={e => {
                        setState(state => ({
                            ...state,
                            totalLot: e.target.value
                        }));
                    }}
                    id="totalLot"
                    name="totalLot"
                />
            </div>

            {[
                {
                    label: "Position",
                    name: "position",
                    options: ["Sell", "Buy"]
                },
                {
                    label: "Option Type",
                    name: "optionType",
                    options: ["Call", "Put"]
                },
                {
                    label: "Expiry",
                    name: "expiry",
                    options: ["Weekly", "Monthly"]
                },
                {
                    label: "Strike Criteria",
                    name: "strikeCriteria",
                    options: [
                        "Straddle Width",
                        "Premium Range",
                        "Closest Premium",
                        "Strike Type"
                    ]
                }
            ]?.map(fieldObj => {
                return (
                    <div key={fieldObj.label}>
                        <p>{fieldObj.label}</p>
                        <select
                            onChange={e =>
                                handleSelectOptions(e, fieldObj.name)
                            }
                            name={fieldObj.name}
                        >
                            {fieldObj.options?.map(optionName => {
                                return (
                                    <option
                                        key={optionName}
                                        className="mr-4 bg-white font-medium  cursor-pointer "
                                        value={optionName}
                                        selected={
                                            state[fieldObj.name] === optionName
                                        }
                                    >
                                        {optionName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                );
            })}

            <div style={{ marginLeft: "10px" }}>
                <AdditionalOptions {...{ state, setState }} />
            </div>
        </div>
    );
}
