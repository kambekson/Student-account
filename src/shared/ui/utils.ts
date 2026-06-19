export function openInNewTab(url: string): void {
  if (!url) {
    console.error("URL не указан.");
    return;
  }

  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (!newWindow) {
    console.error(
      "Не удалось открыть новую вкладку. Возможно, блокировщик всплывающих окон активен."
    );
  }
}
