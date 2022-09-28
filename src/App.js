import { useState, useEffect, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "./firebase";
import {
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
                addLeg,
                cancelLeg,
                deleteLeg,
                copyLeg,
                fetchData
            }}
        >
            <div className="main">
                <AddLegSection />
                <LegsDisplaySection />
            </div>
        </DataContext.Provider>
    );
}
