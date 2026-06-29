// DAY 2: TO-DO LIST
// Goal: tambah task, tandai selesai, hapus task

// KONSEP BARU dibanding Day 1:
// - Kamu butuh nyimpen LEBIH dari 1 nilai sekaligus (banyak task), jadi pakai ARRAY, bukan 1 variabel string
// - Setiap kali array berubah (nambah/hapus task), tampilan HARUS di-render ulang dari awal
//   Ini disebut konsep "render": baca data dari array -> ubah jadi HTML -> tampilkan

// 1. Ambil elemen input, button "Add", dan container list dari HTML
const input = document.querySelector('input')
const Add = document.querySelector('button');

// 2. Siapkan array kosong untuk nyimpen semua task
let tasks = [];
// Setiap task bisa berupa object, contoh: { text: "Belajar JS", done: false }

// 3. Buat function render() yang:
//    - Mengosongkan container list (innerHTML = '')
//    - Looping (forEach/map) lewat array tasks
//    - Untuk setiap task, buat elemen <li> baru dan masukkan ke container
//    - Kasih tombol "hapus" dan checkbox/tombol "selesai" di tiap <li>
function render(){

};

// 4. Saat button "Add" diklik:
//    - Ambil value dari input
//    - Kalau tidak kosong, push object baru ke array tasks
//    - Kosongkan input
//    - Panggil render() lagi supaya tampilan update

// 5. Saat tombol "hapus" di salah satu task diklik:
//    - Hapus task itu dari array (pakai .filter() atau .splice())
//    - Panggil render() lagi

// 6. Saat checkbox/tombol "selesai" diklik:
//    - Ubah properti `done` task itu jadi true/false (toggle)
//    - Panggil render() lagi (biar bisa kasih style coret/strikethrough kalau done)

// TANTANGAN: gimana cara tau task mana yang mau dihapus/ditandai kalau semuanya di-generate dari array?
// Hint: kasih setiap task index/id, simpan di elemen HTML pakai data attribute, baca lagi pakai event delegation
