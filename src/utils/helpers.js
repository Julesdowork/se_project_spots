export function renderLoading(
  buttonEl,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    buttonEl.textContent = loadingText;
  } else {
    buttonEl.textContent = defaultText;
  }
}

export function handleSubmit(request, evt, loadingText = "Saving...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(submitButton, true, initialText, loadingText);

  request()
    .then(() => {
      // any form should be reset after a successful response
      // evt.target is the form in any submit handler
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(submitButton, false, initialText);
    });
}
