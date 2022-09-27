import { useContext } from "react";
import { DataContext } from "../App";

export default function FuturesForm({
    state,
    setState,
    handleSelectOptions,
    renderAdditionalOptions
}) {
    return (
        <div className="futures-form">
            <div>
                <p>Position</p>
                <select
                    onChange={e => {
                        setState(state => ({
                            ...state,
                            position: e.target.value
                        }));
                    }}
                    name={"position"}
                >
                    {["Buy", "Sell"]?.map(optionName => {
                        return (
                            <option
                                key={optionName}
                                className="mr-4 bg-white font-medium  cursor-pointer "
                                value={optionName}
                                // selected={state.position === optionName}
                            >
                                {optionName}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <p>Total Lot</p>

                <input
                    type="number"
                    value={state.totalLot}
                    onChange={e => {
                        setState(state => ({
                            ...state,
                            totalLot: Number(e.target.value)
                        }));
                    }}
                    id="totalLot"
                    name="totalLot"
                />
            </div>
        </div>
    );
}
