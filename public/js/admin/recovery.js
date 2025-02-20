const handleRecovery = () => {
  const btnRecoveryAcess = document.querySelector("[data-admin='recuperar-acesso']");

  if (btnRecoveryAcess) {
    const recoveryPopup = document.getElementById("popup-recuperar-acesso");
    const recoveryForm = document.getElementById("recovery-form");
    const recoveryFeedback = document.querySelector(".recovery-feedback");
    const btnSend = document.querySelector(".recovery-send");

    const sendRecoveryMail = async (popupEvent) => {
      popupEvent.preventDefault();

      if (popupEvent.target === recoveryPopup) {
        recoveryFeedback.innerHTML = "";
        recoveryForm.reset();
        recoveryPopup.classList.remove("active");
        return;
      }

      if (popupEvent.target === btnSend) {
        const emailRecoveryEl = popupEvent.target.form[0];

        const urlBaseRequest = `${window.location.protocol}//${window.location.host}`;

        try {
          btnSend.setAttribute("disabled", "disabled");
          emailRecoveryEl.setAttribute("disabled", "disabled");
          recoveryFeedback.innerHTML = "<div class='loading'></div>";

          const request = await fetch(urlBaseRequest + "/admin/recovery", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: emailRecoveryEl.value })
          });

          const dataResponse = await request.json();

          if (!request.ok || dataResponse.msgError) throw dataResponse.msgError;

          recoveryFeedback.innerHTML = `<p style='color: #18860e'>${dataResponse.msgSucess}</p>`;

        } catch (err) {
          console.log(err);
          recoveryFeedback.innerHTML = `<p style='color: #e41717'>${err}</p>`;

        } finally {
          recoveryForm.reset();
          btnSend.removeAttribute("disabled");
          emailRecoveryEl.removeAttribute("disabled");
        }
      }
    }

    btnRecoveryAcess.addEventListener("click", (btnRecEvent) => {
      btnRecEvent.preventDefault();
      recoveryPopup.classList.add("active");

      recoveryPopup.addEventListener("click", sendRecoveryMail);

    });
  }
}

export default handleRecovery;
