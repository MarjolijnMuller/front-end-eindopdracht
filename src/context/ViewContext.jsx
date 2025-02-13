import {createContext, useState} from "react";

export const ViewContext = createContext({});

function ViewContextProvider({ children })
{
    const [viewTiles, toggleViewTiles] = useState(true);

    function viewSwitch()
    {
        toggleViewTiles(!viewTiles)
            console.log("view: " + viewTiles);
            return viewTiles;
        }


    const contextData = {
        viewTiles: viewTiles,
        viewSwitch: viewSwitch,
    };

    return (
        <ViewContext.Provider value={contextData}>
            {children}
        </ViewContext.Provider>
    )
}

export default ViewContextProvider;
