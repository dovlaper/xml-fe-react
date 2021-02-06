const appealRoutes = {
    'zalbeCutanje': 'silenceappeal',
    'zalbe': 'decisionappeal',
}

const portMapper = {
    'requests': 8083,
    'silenceappeal': 8080,
    'decisionappeal': 8080,
}

const routes = (type) => ({
    '/silenceappeal': 'requests',
    '/decisionappeal': 'requests',
    '/rescript': appealRoutes[type],
})

const createRefMapper = (node, route) => {
    const urlArray = node?.getAttribute("href")?.split('/');
    if (urlArray && urlArray.length === 4) {
        const id = urlArray[3]
        const type = urlArray[2];
        const refRoute = routes(type)[route]
        console.log("ROUTE", route, "REFROUTE", refRoute)
        const port = portMapper[refRoute]
        return {route: refRoute, id, port}
    }
    return null;
}
export default createRefMapper