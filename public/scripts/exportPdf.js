export async function exportToPdf() {
  const el = document.querySelector('.pf-page');
  if (!el) {
    console.error('Export PDF: .pf-page not found');
    return;
  }

  const { default: html2pdf } = await import('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js');

  const styleEl = el.querySelector('style');
  const styles = styleEl ? styleEl.textContent : '';

  const container = document.createElement('div');
  container.style.cssText = 'position:absolute;left:-9999px;top:0;width:800px;';
  container.innerHTML = `<style>${styles}</style>${el.innerHTML}`;
  document.body.appendChild(container);

  const opt = {
    margin: 0,
    filename: 'resume-portfolio.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true, width: 800, windowWidth: 800 },
    jsPDF: { unit: 'px', format: [800, container.scrollHeight], orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all'] },
  };

  await html2pdf().set(opt).from(container).save();
  container.remove();
}
