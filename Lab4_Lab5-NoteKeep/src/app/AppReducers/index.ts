import IAppStorage from "../../interfaces/IAppStorage";

import localStorage from "./localStorage"
import firestoreStorage from "./firestoreStorage";

export type env = "localStorage" | "firestore"

const AppReducers = (environment : env) : IAppStorage => {

        switch(environment){
            case "localStorage":
                return new localStorage();

            case "firestore":
                return new firestoreStorage();
        }

}

export default AppReducers;
