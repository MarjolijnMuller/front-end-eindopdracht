function uniqueStreamingServices(services) {
    if (!services || !Array.isArray(services)) {
        return []; // Handle cases where services is null or not an array
    }

    const uniqueServiceNames = new Set(); // Use a Set to efficiently store unique values

    for (const service of services) {
        if (service && service.service && service.service.name) {  //check of service wel bestaat
            uniqueServiceNames.add(service.service.name);
        }
    }

    return Array.from(uniqueServiceNames); // Convert the Set back to an array
}

export default uniqueStreamingServices;