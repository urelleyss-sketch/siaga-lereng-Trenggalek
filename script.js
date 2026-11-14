// 1. Data Statis (Mock Data) Kerawanan Wilayah di Trenggalek
const dataWilayah = {
  bendungan: {
    nama: "Kecamatan Bendungan",
    tingkat: "Tinggi (Zona Merah)",
    karakter: "Wilayah dataran tinggi dan perbukitan curam (seperti Desa Dompyong & Depok). Sangat rawan longsor saat hujan lebat.",
    titikKumpul: "Lapangan Kecamatan Bendungan / Balai Desa setempat"
  },
  dongko: {
    nama: "Kecamatan Dongko",
    tingkat: "Tinggi (Zona Merah)",
    karakter: "Kontur tanah berbukit di jalur lintas selatan. Waspadai tebing jalan dan pemukiman dekat lereng.",
    titikKumpul: "Alun-alun Kecamatan Dongko"
  },
  panggul: {
    nama: "Kecamatan Panggul",
    tingkat: "Menengah - Tinggi",
    karakter: "Kombinasi perbukitan dan pesisir. Rawan longsor di area perbukitan utara dan genangan di dataran rendah.",
    titikKumpul: "Lapangan Panggul / Kantor Kecamatan"
  },
  tugu: {
    nama: "Kecamatan Tugu",
    tingkat: "Menengah - Tinggi",
    karakter: "Rawan pergerakan tanah di jalur penghubung Trenggalek - Ponorogo (area perbukitan).",
    titikKumpul: "Kantor Kecamatan Tugu / Lapangan Desa"
  },
  kampak: {
    nama: "Kecamatan Kampak",
    tingkat: "Menengah",
    karakter: "Dikelilingi perbukitan kapur dan hutan. Waspadai longsor tebing saat curah hujan ekstrem.",
    titikKumpul: "Lapangan Kecamatan Kampak"
  }
};

// 2. Event Listener untuk Pilihan Kecamatan
const selectKecamatan = document.getElementById("pilih-kecamatan");
const infoWilayah = document.getElementById("info-wilayah");

selectKecamatan.addEventListener("change", function () {
  const nilai = this.value;

  if (nilai && dataWilayah[nilai]) {
    const data = dataWilayah[nilai];
    infoWilayah.innerHTML = `
      <strong>${data.nama}</strong><br>
      <p><strong>Status Kerawanan:</strong> ${data.tingkat}</p>
      <p><strong>Karakteristik:</strong> ${data.karakter}</p>
      <p><strong>Rekomendasi Titik Kumpul:</strong> ${data.titikKumpul}</p>
    `;
    infoWilayah.classList.remove("hidden");
  } else {
    infoWilayah.classList.add("hidden");
  }
});

// 3. Logika Kalkulator Cek Risiko Mandiri
const formRisiko = document.getElementById("form-risiko");
const hasilAnalisis = document.getElementById("hasil-analisis");

formRisiko.addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah halaman reload

  // Mengambil nilai angka dari pilihan pengguna
  const skorHujan = parseInt(document.getElementById("hujan").value);
  const skorTanah = parseInt(document.getElementById("tanah").value);
  const skorTanda = parseInt(document.getElementById("tanda").value);

  const totalSkor = skorHujan + skorTanah + skorTanda;

  // Reset class warna sebelumnya
  hasilAnalisis.className = "result-box";

  // Percabangan penentuan status risiko
  if (totalSkor <= 3) {
    hasilAnalisis.classList.add("status-aman");
    hasilAnalisis.innerHTML = `
      <h3>🟢 STATUS: AMAN (Skor: ${totalSkor})</h3>
      <p>Kondisi sekitar terpantau stabil. Tetap pantau informasi cuaca resmi dan jaga saluran air tetap lancar.</p>
    `;
  } else if (totalSkor <= 7) {
    hasilAnalisis.classList.add("status-waspada");
    hasilAnalisis.innerHTML = `
      <h3>🟡 STATUS: WASPADA (Skor: ${totalSkor})</h3>
      <p>Mulai terlihat tanda-tanda potensi pergerakan tanah. Siapkan tas siaga bencana, amankan dokumen penting, dan hindari tidur di ruangan yang menempel langsung dengan tebing.</p>
    `;
  } else {
    hasilAnalisis.classList.add("status-bahaya");
    hasilAnalisis.innerHTML = `
      <h3>🔴 STATUS: BAHAYA / SIAGA EVAKUASI (Skor: ${totalSkor})</h3>
      <p><strong>SEGERA EVAKUASI!</strong> Tinggalkan rumah menuju titik kumpul aman atau tempat yang lebih datar/jauh dari lereng. Segera hubungi perangkat desa atau BPBD.</p>
    `;
  }
});
