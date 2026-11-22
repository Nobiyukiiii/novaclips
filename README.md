# NovaClip Studio

NovaClip Studio adalah aplikasi AI untuk mengubah video YouTube, Google Drive, atau file lokal menjadi klip pendek untuk TikTok, YouTube Shorts, dan Instagram Reels.

Nama proyek: **NovaClip Studio**  
Nama repository: **novaclips**

## Fitur

- Analisis momen viral dengan Gemini atau layanan AI yang didukung
- Dukungan YouTube, Google Drive, dan unggahan video lokal
- Deteksi wajah serta pemusatan subjek secara otomatis
- Rasio 9:16, 1:1, 16:9, dan layout split-screen
- Subtitle animasi, caption karaoke, font, dan warna
- Watermark, musik latar, dan efek audio
- Hardware acceleration untuk NVIDIA, AMD, Intel, dan Apple/CPU
- Preview, render batch, dan unduhan hasil dalam ZIP

## Teknologi

- Frontend: React, TypeScript, dan Vite
- Backend: Python, FastAPI, dan FFmpeg
- Video dan AI: OpenCV, Whisper, yt-dlp, dan provider AI

## Persyaratan

- Git
- Node.js 18 atau lebih baru
- Python 3.10–3.12
- FFmpeg
- yt-dlp

Python 3.13 atau lebih baru belum direkomendasikan untuk dependency video dan machine-learning.

## Instalasi

```bash
git clone https://github.com/Nobiyukiiii/novaclips.git
cd novaclips
npm install
```

Buat virtual environment Python:

**Windows**

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r backend/requirements.txt
```

**macOS/Linux**

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

## Menjalankan aplikasi

```bash
npm run dev
```

Aplikasi tersedia pada:

- Web app: http://localhost:27888
- Backend API: http://localhost:27889
- Dokumentasi API: http://localhost:27889/docs

Untuk Docker:

```bash
docker compose up --build
```

Buka http://localhost:8000.

## Konfigurasi

Salin template environment:

**Windows**

```powershell
Copy-Item backend\.env.template backend\.env
```

**macOS/Linux**

```bash
cp backend/.env.template backend/.env
```

API key Gemini dapat dimasukkan melalui antarmuka aplikasi atau disetel sebagai default server:

```dotenv
GEMINI_API_KEY=your_gemini_api_key
```

Konfigurasi opsional:

```dotenv
SUPADATA_API_KEYS=key1,key2
WEBSHARE_USERNAME=username
WEBSHARE_PASSWORD=password
WEBSHARE_LOCATIONS=US,GB,DE
WEBSHARE_RETRIES=5
WEBSHARE_PROXY=http://user:password@host:port
REQUESTS_CA_BUNDLE=/path/to/cacert.pem
EMOJI_FONT_PATH=/path/to/NotoColorEmoji.ttf
```

Jangan commit file `.env` atau credential aktif.

## Cara penggunaan

1. Masukkan URL YouTube atau Google Drive, atau unggah video lokal.
2. Pilih durasi klip.
3. Jalankan analisis untuk menemukan momen paling menarik.
4. Sesuaikan rasio, crop, face tracking, subtitle, font, watermark, dan audio.
5. Pilih encoder yang sesuai dengan perangkat.
6. Jalankan render batch dan unduh hasil sebagai klip individual atau ZIP.

## FFmpeg dan yt-dlp

**Windows**

```powershell
winget install Gyan.FFmpeg
winget install yt-dlp.yt-dlp
```

**macOS**

```bash
brew install ffmpeg-full yt-dlp
```

`ffmpeg-full` dibutuhkan untuk filter subtitle libass.

**Linux**

```bash
sudo apt update
sudo apt install ffmpeg
python3 -m pip install --user --upgrade yt-dlp
```

Jika YouTube meminta verifikasi bot, gunakan tombol **Cookies** dan impor cookie browser dalam format Netscape.

Jika `pip install` gagal, buat ulang virtual environment dengan Python 3.11 atau 3.12.

## Pembaruan

```bash
git pull
npm install
pip install -r backend/requirements.txt
npm run dev
```

## Lisensi

Dilindungi oleh [MIT License](LICENSE).
