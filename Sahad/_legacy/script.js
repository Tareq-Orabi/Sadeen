document.addEventListener("DOMContentLoaded", () => {
    // 1. Landing Page to Dashboard Transition
    const enterBtn = document.getElementById("enter-btn");
    const landingPage = document.getElementById("landing-page");
    const dashboard = document.getElementById("dashboard");

    enterBtn.addEventListener("click", () => {
        landingPage.style.opacity = '0';
        setTimeout(() => {
            landingPage.classList.add("hidden");
            dashboard.classList.remove("hidden");
        }, 500); // Wait for fade out
    });

    // 2. Modals Logic
    const giftCards = document.querySelectorAll(".glass-card");
    const modals = document.querySelectorAll(".modal");
    const closeBtns = document.querySelectorAll("[data-close]");
    const songVideo = document.getElementById("songVideo");

    // Open Modal
    giftCards.forEach(card => {
        card.addEventListener("click", () => {
            const modalId = card.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove("hidden");
                // Trigger typewriter if letter modal
                if (modalId === "modal-letter") {
                    startTypewriter();
                }
            }
        });
    });

    // Close Modal
    closeBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const modal = this.closest(".modal");
            if (modal) {
                modal.classList.add("hidden");
                // Stop video if closing song modal
                if (modal.id === "modal-song" && songVideo) {
                    songVideo.pause();
                }
            }
        });
    });

    // 3. Typewriter Effect for the Letter
    const letterText = "My dearest Sedeen,\n\nEvery moment with you feels like a beautiful dream. I wanted to make something unique just to show you how much you mean to me. You are my moon, my artist, and my forever.\n\nWith all my love ❤️";
    const typewriterElement = document.getElementById("typewriter-text");
    let isTyping = false;

    function startTypewriter() {
        if (isTyping) return; // Prevent restarting if already typed
        isTyping = true;
        typewriterElement.innerHTML = "";
        let i = 0;

        function type() {
            if (i < letterText.length) {
                if (letterText.charAt(i) === '\n') {
                    typewriterElement.innerHTML += "<br>";
                } else {
                    typewriterElement.innerHTML += letterText.charAt(i);
                }
                i++;
                setTimeout(type, 50); // Speed of typing (50ms)
            }
        }
        type();
    }
});