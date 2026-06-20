export async function exportToPdf() {
  const { default: html2pdf } = await import('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js');

  const el = document.querySelector('.portfolio-page');
  if (!el) return;

  const opt = {
    margin: 0,
    filename: 'resume-portfolio.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'px', format: [el.offsetWidth, el.offsetHeight], orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all'] },
  };

  await html2pdf().set(opt).from(el).save();
}
