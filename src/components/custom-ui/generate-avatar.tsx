export function generateAvatar(name: string, bgColor = "#EB5E00", textColor = "#FFF", size = 48) {
    // Buat elemen canvas
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
  
    if (!ctx) return "";
  
    // Gambar background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
  
    // Ambil huruf pertama dari nama (jika kosong, default ke "?")
    const initial = name.trim() ? `${name.charAt(0).toUpperCase()}${name.charAt(1).toUpperCase()}` : "?";
  
    // Gambar teks
    ctx.fillStyle = textColor;
    ctx.font = `${size * 0.5}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initial, size / 2, size / 2);
  
    // Konversi canvas ke data URL (base64)
    return canvas.toDataURL();
  }
  