export function setButtonText(
  buttonEl,
  isLoading,
  loadingText = "Saving...",
  defaultText = "Save"
) {
  if (isLoading) {
    buttonEl.textContent = loadingText;
  } else {
    buttonEl.textContent = defaultText;
  }
}
