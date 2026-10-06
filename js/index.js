
document.addEventListener("DOMContentLoaded", () => {
const launchButtons = document.querySelectorAll(".launch-btn");
const iframeWrapper = document.getElementById("iframe-wrapper");
const appIframe = document.getElementById("app-iframe");
const iframeOverlay = document.getElementById("iframe-overlay");

let activeTargetUrl = "";

launchButtons.forEach(button => {
    button.addEventListener("click", () => {
    activeTargetUrl = button.getAttribute("data-url");
    appIframe.src = activeTargetUrl;
    iframeWrapper.classList.remove("hidden");
    iframeWrapper.scrollIntoView({ behavior: "smooth" });
    });
});

iframeOverlay.addEventListener("click", () => {
    if (activeTargetUrl) {
    window.open(activeTargetUrl, "_blank", "noopener,noreferrer");
    }
});
});
