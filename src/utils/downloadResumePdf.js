import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Default paper size: A4 (one page, maximized fit)
const PAGE_FORMAT = [210, 297];

async function buildResumePdf(element) {
  if (!element) {
    throw new Error('Resume element not found.');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: element.scrollWidth,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: PAGE_FORMAT,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 6;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  // Scale resume to maximize usage of one full page.
  const widthRatio = maxWidth / canvas.width;
  const heightRatio = maxHeight / canvas.height;
  const ratio = Math.min(widthRatio, heightRatio);

  const imgWidth = canvas.width * ratio;
  const imgHeight = canvas.height * ratio;
  const offsetX = margin + (maxWidth - imgWidth) / 2;
  const offsetY = margin + (maxHeight - imgHeight) / 2;

  pdf.addImage(imgData, 'JPEG', offsetX, offsetY, imgWidth, imgHeight);

  return pdf;
}

/**
 * Downloads a maximized one-page resume PDF.
 */
export async function downloadResumePdf(
  element,
  filename = 'Janrick_V_Panesa_Resume.pdf',
) {
  const pdf = await buildResumePdf(element);
  pdf.save(filename);
}

/**
 * Prints a maximized one-page resume PDF and cleans up after the dialog closes.
 */
export async function printResumePdf(element) {
  const pdf = await buildResumePdf(element);
  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);

  const iframe = document.createElement('iframe');
  iframe.setAttribute('title', 'Resume print');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.src = url;
  document.body.appendChild(iframe);

  await new Promise((resolve, reject) => {
    const cleanup = () => {
      window.setTimeout(() => {
        iframe.remove();
        URL.revokeObjectURL(url);
      }, 500);
    };

    iframe.onload = () => {
      try {
        const frameWindow = iframe.contentWindow;
        if (!frameWindow) {
          throw new Error('Unable to access print frame.');
        }

        frameWindow.addEventListener(
          'afterprint',
          () => {
            cleanup();
          },
          { once: true },
        );

        frameWindow.focus();
        frameWindow.print();

        // Unlock UI right after the dialog opens.
        resolve();

        // Safety cleanup if afterprint never fires.
        window.setTimeout(cleanup, 120000);
      } catch (error) {
        cleanup();
        reject(error);
      }
    };

    iframe.onerror = () => {
      cleanup();
      reject(new Error('Unable to load resume for printing.'));
    };
  });
}
