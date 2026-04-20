const barcodeTextInput = document.getElementById("barcode-text");
const barcodeFormatSelect = document.getElementById("barcode-format");
const barcodeWidthInput = document.getElementById("barcode-width");
const barcodeHeightInput = document.getElementById("barcode-height");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");
const barcodeCanvas = document.getElementById("barcode-canvas");
const errorMsg = document.getElementById("error-msg");

function generateBarcode() {
  const value = barcodeTextInput.value.trim();
  const format = barcodeFormatSelect.value;
  const lineWidth = Number(barcodeWidthInput.value) || 2;
  const height = Number(barcodeHeightInput.value) || 100;

  if (!value) {
    errorMsg.textContent = "Input tidak boleh kosong.";
    return;
  }

  try {
    JsBarcode(barcodeCanvas, value, {
      format,
      width: lineWidth,
      height,
      displayValue: true,
      margin: 12,
      fontSize: 18,
      background: "#ffffff",
      lineColor: "#111827",
    });
    errorMsg.textContent = "";
  } catch (error) {
    errorMsg.textContent =
      "Format barcode tidak cocok dengan input. Coba ubah format atau isi teks lain.";
  }
}

function downloadBarcode() {
  const dataUrl = barcodeCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `barcode-${Date.now()}.png`;
  link.click();
}

generateBtn.addEventListener("click", generateBarcode);
downloadBtn.addEventListener("click", downloadBarcode);
barcodeTextInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateBarcode();
  }
});

window.addEventListener("DOMContentLoaded", generateBarcode);
