import { useContext } from "react";
import { DataContext } from "../App";
import { LegCard } from "./LegCard";

export default function LegsDisplay() {
    const {
        allLegs,
        copyLeg,
        deleteLeg,
        renderAdditionalOptions,
        handleSelectOptions,
        setLegsModified
    } = useContext(DataContext);

    return (
        <div>
            {allLegs.length !== 0 ? (
                allLegs?.map(leg => {
                    return (
                        <div key={leg.id} className="leg-card">
                            <LegCard
                                {...{
                                    data: leg,
                                    legId: leg.id
                                }}
                            />
                        </div>
                    );
                })
            ) : (
                <p style={{ marginTop: "30px" }}>Nothing to show!</p>
            )}
        </div>
    );
}
