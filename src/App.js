import { useState, useEffect, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "./firebase";
import {
    addDoc,
    collection,
    getDocs,
    getDoc,
    doc,
    setDoc,
    deleteDoc
} from "firebase/firestore";
import "./App.css";
import AddLegSection from "./components/AddLegs";
import LegsDisplaySection from "./components/LegsDisplay";

export const DataContext = createContext();

export default function App() {
    const defaultState = {
        segment: "Options",
        totalLot: 1,
        position: "Sell",
        optionType: "Call",
        expiry: "Weekly",
        strikeCriteria: "Strike Type",
        additionalOptions: {
            "Strike Type": {
                strikeType: "ATM"
            },
            "Straddle Width": {
                type: "+",
                multiplier: 0.5
            },
            "Premium Range": {
                lowerRange: 50,
                upperRange: 200
            },
            "Closest Premium": {
                premium: 50
            }
        }
    };
    const [state, setState] = useState(defaultState);
    const [allLegs, setAllLegs] = useState([]);
    const [legsModified, setLegsModified] = useState(false);

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

    const renderAdditionalOptions = () => {
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
                                        ...state.additionalOptions[
                                            "Strike Type"
                                        ],
                                        strikeType: e.target.value
                                    }
                                }
                            }));
                        }}
                        name={"Strike Type"}
                    >
                        {[
                            "ATM",
                            "ITM9",
                            "ITM10",
                            "ITM11",
                            "ITM12",
                            "ITM13"
                        ]?.map(optionName => {
                            return (
                                <option
                                    key={optionName}
                                    className="mr-4 bg-white font-medium  cursor-pointer "
                                    value={optionName}
                                    // selected={
                                    //     state.additionalOptions[
                                    //         "Strike Type"
                                    //     ] === optionName
                                    // }
                                >
                                    {optionName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            );
        }
        if (state.strikeCriteria === "Straddle Width") {
            return (
                <div
                    style={{ display: "flex", gap: "10px", marginTop: "40px" }}
                >
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
                                    // selected={
                                    //     state.additionalOptions[
                                    //         "Straddle Width"
                                    //     ] === optionName
                                    // }
                                >
                                    {optionName}
                                </option>
                            );
                        })}
                    </select>{" "}
                    ({" "}
                    <input
                        type="number"
                        value={
                            state.additionalOptions["Straddle Width"].multiplier
                        }
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
                                state.additionalOptions["Premium Range"]
                                    .lowerRange
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
                                state.additionalOptions["Premium Range"]
                                    .upperRange
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
                        value={
                            state.additionalOptions["Closest Premium"].premium
                        }
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

    const addLeg = () => {
        if (state.segment === "Options") {
            const id = uuidv4();
            setDoc(
                doc(db, "legs", id),
                {
                    id,
                    ...state
                },
                { merge: true }
            )
                .then(() => {
                    alert("Added!");
                    setState(defaultState);
                    setLegsModified(!legsModified);
                })
                .catch(err => console.log(err));
        } else {
            const id = uuidv4();
            const { segment, totalLot, position } = state;
            setDoc(
                doc(db, "legs", id),
                {
                    id,
                    segment,
                    totalLot,
                    position
                },
                { merge: true }
            )
                .then(() => {
                    alert("Added!");
                    setState(defaultState);
                    setLegsModified(!legsModified);
                })
                .catch(err => console.log(err));
        }
    };

    const cancelLeg = () => {
        setState(defaultState);
    };

    const deleteLeg = legId => {
        deleteDoc(doc(db, "legs", legId))
            .then(() => {
                alert("Deleted");
                setLegsModified(!legsModified);
            })
            .catch(err => console.log(err));
    };

    const copyLeg = async legId => {
        const id = uuidv4();
        const docRef = await getDoc(doc(db, "legs", legId));

        if (docRef.exists) {
            const { id: oldId, ...rest } = docRef.data();
            setDoc(
                doc(db, "legs", id),
                {
                    id,
                    ...rest
                },
                { merge: true }
            )
                .then(() => {
                    alert("Duplicate leg created!");
                    setLegsModified(!legsModified);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const fetchData = async () => {
        const docsRef = await getDocs(collection(db, "legs"));
        const data = docsRef.docs.map(doc => doc.data());
        setAllLegs(data);
    };

    useEffect(() => {
        fetchData();
    }, [legsModified]);

    return (
        <DataContext.Provider
            value={{
                state,
                setState,
                allLegs,
                setAllLegs,
                legsModified,
                setLegsModified,
                handleSelectOptions,
                handleRadioOptions,
                renderAdditionalOptions,
                addLeg,
                cancelLeg,
                deleteLeg,
                copyLeg,
                fetchData
            }}
        >
            <div className="main">
                <AddLegSection />
                {/* 
                <button
                    style={{ marginTop: "10px", backgroundColor: "darkgreen" }}
                    onClick={fetchData}
                >
                    Fetch Data
                </button> */}

                <LegsDisplaySection />
            </div>
        </DataContext.Provider>
    );
}
