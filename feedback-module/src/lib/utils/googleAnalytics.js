export function trackFutureResearch(ga) {
  ga.event(
    "future_research",
    "user agreed to participate in research in the future"
  );
}

export function pageTitleAsScreen(ga, screenTitle) {
  ga.pageview(window.location.pathname, window.location, screenTitle);
}

export function pageChange(ga, currentPage, nextPage) {
  ga.gtag("event", "page_change", {
    current_page_title: currentPage,
    next_page: nextPage,
  });
}

export function userViewedModule(ga) {
  ga.event("module_viewed", "module appeared on user screen");
}
