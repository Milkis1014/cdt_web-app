import dashboardConfig from "../config/dashboardConfig.json";
import dashboardDataCache from "../state/dashboard-cache"; // Import cache

export const getDashboardMapping = () =>
  Object.fromEntries(dashboardConfig.map(dashboard => [dashboard.id, dashboard]));

export async function fetchAndCacheAllDashboards() {
  const dashboardMapping = getDashboardMapping();

  const fetchPromises = Object.entries(dashboardMapping).map(async ([id, { uid }]) => {
    const url = `${window.location.origin}/grafana/api/dashboards/uid/${uid}`;
    console.log(`Fetching dashboard: ${url}`);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${id}: ${response.status}`);

      dashboardDataCache[id] = await response.json();
    } catch (error) {
      console.error(`Error fetching ${id}:`, error);
      dashboardDataCache[id] = null;
    }
  });

  await Promise.all(fetchPromises);
  console.log("✅ All dashboards fetched and cached:", dashboardDataCache);
}

export const getDashboardData = id => dashboardDataCache[id] || null;

export function getPanelId(dashboardId, groupPanelTitle, panelTitle) {
  const dashboardData = getDashboardData(dashboardId)?.dashboard;
  if (!dashboardData?.panels) {
    console.error("Invalid dashboard data or missing panels.");
    return null;
  }

  for (const panel of dashboardData.panels) {
    if (panel.type === "row" && panel.title === groupPanelTitle) {
      return panel.panels?.find(subPanel => subPanel.title === panelTitle)?.id || null;
    }
    if (!groupPanelTitle && panel.title === panelTitle) return panel.id;
  }

  console.warn(`Panel with title "${panelTitle}" not found.`);
  return null;
}
