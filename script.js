console.clear();

/* --------------------------------------
      EFECTO DE MÁSCARA AL MOVER MOUSE
---------------------------------------*/
const cursorMask = document.querySelector(".cursor-mask");

window.addEventListener("mousemove", (e) => {
    cursorMask.style.opacity = 1;
    cursorMask.style.setProperty("--x", e.clientX + "px");
    cursorMask.style.setProperty("--y", e.clientY + "px");
    cursorMask.style.setProperty("--mask-size", "140px");
});

/* --------------------------------------
            ANIMACIÓN SCROLL
---------------------------------------*/
gsap.from(".hero-content", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power3.out"
});

gsap.to(".hero-content", {
  opacity: 0,
  y: -80,
  scrollTrigger: {
    trigger: "#pdf-section",
    start: "top bottom",
    scrub: true
  }
});

/* --------------------------------------
        VISUALIZAR PDF CON pdf.js
---------------------------------------*/

const pdfUrl = "TU_PDF.pdf";  // URL RAW de GitHub
const canvas = document.getElementById("pdf-canvas");
const ctx = canvas.getContext("2d");

pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
    pdf.getPage(1).then((page) => {

        const viewport = page.getViewport({ scale: 1.6 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        page.render(renderContext);
    });
});
