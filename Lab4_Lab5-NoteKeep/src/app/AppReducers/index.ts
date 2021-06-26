import IAppStorage from "../../interfaces/IAppStorage";

import localStorage from "./localStorage"

export type env = "localStorage"

const AppReducers = (environment : env) : IAppStorage => {

        switch(environment){
            case "localStorage":
            return new localStorage();
        }

}

export default AppReducers;
