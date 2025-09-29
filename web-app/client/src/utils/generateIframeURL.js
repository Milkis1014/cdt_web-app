import dashboardDataCache from "../state/dashboard-cache";

export function GenerateIframeURL(id, parentRoom) {
    
    if (!dashboardDataCache) {
        console.error(`No dashboard data found for room: ${parentRoom}`);
        return []; // Return an empty array if no dashboard data is found
    }
    if (!dashboardDataCache[parentRoom]) {
        console.error(`No dashboard data found for parent room: ${parentRoom}`);
        return []; // Return an empty array if no dashboard data is found for the specific parent room
    }
    console.log(`dashboardDataCache:, ${dashboardDataCache[parentRoom]}`);
    const uid = dashboardDataCache[parentRoom].dashboard.uid;
    const title = dashboardDataCache[parentRoom].dashboard.title;
    const timeFrom = dashboardDataCache[parentRoom].dashboard.time.from;
    const timeTo = dashboardDataCache[parentRoom].dashboard.time.to;
    const refresh = dashboardDataCache[parentRoom].dashboard.refresh;
    const panels = dashboardDataCache[parentRoom].dashboard.panels;

    if (parentRoom === title) {
        const matchingPanel = panels.find(parentPanel => parentPanel.title === id);
        
        if (matchingPanel && matchingPanel.panels) {
            return matchingPanel.panels.map(panel => 
                //`http://localhost/grafana/d-solo/${uid}/${title}?orgId=1&from=${timeFrom}&to=${timeTo}&timezone=browser&refresh=${refresh}&panelId=${panel.id}`
                `${window.location.origin}/grafana/d-solo/${uid}/${title}?panelId=${panel.id}`
            );

        }
    }
    
    return []; // Return an empty array if no matching panel is found
}
