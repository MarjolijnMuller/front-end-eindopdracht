function uniqueStreamingServices(services) {
    if (!services || !Array.isArray(services)) {
        return [];
    }

    const uniqueServiceNames = new Set();

    for (const service of services) {
        if (service && service.service && service.service.name) {
            uniqueServiceNames.add(service.service.name);
        }
    }

    return Array.from(uniqueServiceNames);
}

export default uniqueStreamingServices;