export function closeModalOnRemoteClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

export function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", (evt) => closeModalOnRemoteClick(evt));
  document.addEventListener("keydown", (evt) => closeModalOnEscape(evt));
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", (evt) => closeModalOnRemoteClick(evt));
  document.removeEventListener("keydown", (evt) => closeModalOnEscape(evt));
}
