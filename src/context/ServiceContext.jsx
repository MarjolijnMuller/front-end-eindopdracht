import {createContext, useState} from "react";

export const ServiceContext = createContext({});

function ServiceContextProvider({ children })
{
    const [selectedServices, setSelectedServices] = useState([]);

    function services(service) {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter((g) => g !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
        console.log(selectedServices);
    }


    const contextData = {
        selectedServices,
        services,
    };

    return (
        <ServiceContext.Provider value={contextData}>
            {children}
        </ServiceContext.Provider>
    )
}

export default ServiceContextProvider;
