---
blog: true
title: "Bit Manipulation : Contoh Sederhana"
description: Demonstrasi sederhana penggunaan bit manipulation dalam masalah Kattis.
author: mkamadeus
date: 2019-06-17
duration: 7
---

::TableOfContents
::

## Latar Belakang

Saya (tidak) sering memeriksa situs seperti Codeforces dan Kattis untuk meningkatkan logika dan keterampilan programming saya. Suatu hari, saya menemukan masalah yang menarik bagi saya. Pada awalnya, masalah ini terlihat cukup menantang, jadi saya mencoba menyelesaikannya (masalah akan dijelaskan di bagian selanjutnya). Pada awalnya, saya tidak bisa menyelesaikannya — saya tidak bisa menemukan pola apa pun yang berkaitan dengan masalah tersebut. Saya tidak terburu-buru, jadi saya meninggalkan masalah itu karena sudah tengah malam.

Ketika saya tidak melakukan apa-apa di mall. Saya kembali melihat masalah itu, dan saya mendapat ide tentang cara melakukannya - yaitu dengan menggunakan _bit manipulation_!

## Apa itu Bitmask?

Untuk memahami bit manipulation, pertama-tama kita perlu memahami bitmask karena digunakan dalam operasi bit manipulation.
Bit adalah singkatan dari _"binary digits"_ - digit yang berisi nol dan satu. 
Variabel integer biasanya memiliki batas 32 bit, yang berarti terdiri dari 32 bit dengan rentang $2^{32}$ (2 berasal dari state bit — 0 atau 1 yang merupakan 2 kemungkinan).

Bitmask, di sisi lain, hanyalah integer yang digunakan sebagai set boolean.
Karena boolean hanya memiliki state `False` atau `True`, itu juga dapat direpresentasikan oleh $0$ dan $1$, dan itulah mengapa disebut bitmask!
Merangkum:

> Bitmask memanfaatkan bagaimana integer dapat direpresentasikan dalam bentuk binernya, yang berarti dapat digunakan sebagai set boolean yang kompak.

## Operator Bitwise

Bit manipulation adalah teknik yang digunakan untuk, well, memanipulasi bit yang merepresentasikan integer. 
Saya akan menunjukkan beberapa operator bitwise yang umum digunakan dalam C++.
Ini hanya menunjukkan operator bit dan cara kerjanya; penggunaannya akan ditunjukkan dalam contoh.
Tidak umum menggunakannya secara murni seperti dalam contoh (kecuali Anda bekerja dalam low-level programming mungkin).

## Shift Left dan Shift Right (`<<` dan `>>`)

Operasi ini menggeser bentuk biner dari integer ke kiri/kanan dengan nilai yang diberikan.

Perhatikan bahwa shift left setara dengan mengalikan dengan 2, dan shift right adalah membagi dengan 2 dan membulatkannya. Umumnya lebih cepat daripada operasi pembagian biasa meskipun compiler mungkin sudah mengkompilasinya untuk menggunakan operasi shift.

```cpp
int x=5; // 101 dalam biner

x=5;
x=x<<1; //10 = 2 dalam desimal

x=5;
x=x<<3; //0 = 0 (dapat dilihat sebagai 0101)

x=5;
x=x>>1; //1010 = 10 dalam desimal

x=5;
x=x>>2; //10100 = 20 dalam desimal
```

### Bitwise OR (`|`)

Melakukan operasi OR pada bentuk biner dari dua integer bit demi bit.

```cpp
int x=5; // 101 dalam biner
int y=9; // 1001 dalam biner
int z=x|y;

/*
x = 0101
y = 1001
--------- OR
z = 1101 = 13 dalam desimal
*/
```

### Bitwise AND (`&`)

Melakukan operasi AND pada bentuk biner dari dua integer bit demi bit.

```cpp
int x=5; // 101 dalam biner
int y=9; // 1001 dalam biner
int z=x&y;

/*
x = 0101
y = 1001
--------- AND
z = 0001 = 1 dalam desimal
*/
```

### Bitwise NOT (`~`)

Operator ini membalik bit dari bentuk biner integer.
Operasi ini biasanya digunakan bersama dengan operator lain; misalnya untuk membuat operasi NAND atau NOR.

> Tidak ada contoh yang diberikan di sini karena tergantung pada tipe data.

### Bitwise XOR (`^`)

Menerapkan operasi XOR dari bentuk biner dua integer bit demi bit.
Berguna untuk toggle bit; lihat contoh di bawah.

```cpp
int x=5; // 101 dalam biner
int y=9; // 1001 dalam biner
int z=x^y;

/*
x = 0101
y = 1001
--------- XOR
z = 1100 = 12 dalam desimal
*/
```

Anda mungkin melihat trik rapi untuk menukar dua integer menggunakan XOR.
Ini menggunakan properti XOR untuk mencapainya.

```cpp
int a=3;
int b=5;

a=a^b; // a=6, b=5
b=a^b; // a=6, b=3
a=a^b; // a=5, b=3
```

## Contoh Masalah

> Lihat [masalah Kattis](https://open.kattis.com/problems/rationalsequence2) ini.

### Pernyataan Masalah

**Pernyataan masalah yang disingkat**: Diberikan binary tree tak terbatas; setiap node terdiri dari pecahan dengan pembilang $p$ dan penyebut $q$. Node anak kiri sama dengan $\frac{p}{p+q}$, dan node anak kanan sama dengan $\frac{p+q}{q}$. Fungsi $F(n)$ didefinisikan sedemikian rupa sehingga akan mengembalikan pecahan dari node yang bersangkutan. Node diberi nomor seperti yang digambarkan dalam ilustrasi yang diambil dari masalah di bawah ini:

::MarkdownFigure
---
src: "/images/bit-manip-kattis/bit-manip-kattis.png"
alt: "Figure"
width: "571"
height: "279"
caption: "Ilustrasi Masalah Kattis."
---
::
<!-- (Source: <a href="https://open.kattis.com/problems/rationalsequence2">Kattis Rational Sequence 2 -->

Dalam ilustrasi di atas, root node dimulai dari nilai $p=1$ dan $q=1$. Ini berarti bahwa $F(1)=\frac{1}{1}$, $F(2)=\frac{1}{2}$, $F(3)=\frac{2}{1}$, dll. Diberikan $p$ dan $q$, kita diminta untuk mengembalikan nilai $N$ di mana $F(n)$ sesuai dengan $\frac{p}{q}$.

Sekilas, masalah ini mungkin tidak merepresentasikan apa pun yang berkaitan dengan bit manipulation. Jika Anda melihat lebih dekat, itu sebenarnya memiliki dua state - pergi ke node kiri atau kanan (karena binary tree)! Sebelum saya memberikan perspektif saya tentang masalah ini, Anda mungkin ingin mencoba dan menyelesaikannya sendiri 😀

### Wawasan

Masalah ini mungkin menyarankan Anda untuk menggunakan metode breadth first search (BFS), dengan menggunakan queue. 
Untuk pecahan yang terletak di N kecil, ini akan layak. 
Namun, kita tidak tahu di mana pecahan yang diinput akan berada, karena ini adalah binary tree tak terbatas.

Jadi, bagaimana kita bisa menyelesaikan masalahnya? Inilah proses pemikiran saya:

- Entah bagaimana lebih baik menemukan langsung dari setiap testcase dibandingkan dengan pruning, karena akan memakan terlalu banyak waktu dan memori.
- Kita dapat merepresentasikan setiap node dengan bentuk binernya.
- $p < q$ di node kiri, sementara $p > q$ di node kanan.

> **Q**: Apa artinya menggunakan bentuk binernya?

Nah, mari kita ambil node pertama, kedua, dan ketiga dalam bentuk biner mereka (`1`, `10`, `11`). Menganalisis polanya, kita dapat pertama-tama mengasumsikan bahwa di node kiri kita menambahkan `0` dari node pertama, dan di node kanan kita menambahkan `1` dari node pertama.

::MarkdownFigure
---
src: "/images/bit-manip-kattis/bit-manip-kattis-explained.webp"
alt: "Figure"
width: "571"
height: "279"
caption: "Mengilustrasikan penjelasan."
---
::

> **Q**: Mengapa itu bekerja?

*Sederhana* — Ini adalah **binary tree**! Tentu saja N akan mengikuti pola digit biner!

Karena kita menyelesaikan masalah dari atas ke bawah, kita perlu menambahkan digit (jika kiri `0`, jika kanan `1`) dari depan. Bagaimana kita mencapai hasil seperti itu? Kita menggunakan operator OR dengan operator shift left untuk menyalakan bit di lokasi yang ditentukan.

```cpp
int result=0; // 000
int pos=2;
result|=(1<<pos); //menyalakan bit ke-2 dari kanan (0-based)

/*
(1<<pos) = 1 << 2 = 100 (dalam biner)
result = 000

000
100
---- OR
100
*/
```

Ini adalah solusi saya yang ditulis dalam C++:

```cpp
#include<bits/stdc++.h>

using namespace std;

int main() {

  int t;
  scanf("%d", &t);

  while (t--) {
    int k;
    int p, q;
    scanf("%d %d/%d", &k, &p, &q);

    int res = 0, cnt = 0;
    while (!(p == 1 && q == 1)) {
      int tp, tq;
      if (p > q) //kanan
      {
        tp = p - q;
        tq = q;
        res |= (1 << cnt);
      } else //kiri
      {
        tp = p;
        tq = q - p;
      }
      cnt++;
      p = tp;
      q = tq;
    }

    res |= (1 << cnt);
    printf("%d %d\n", k, res);
  }
}
```

Perhatikan bahwa karena kita mulai dari indeks satu, kita menambahkan 1 lagi setelah kita mencapai node awal.

Solusi ini, karena kita melintasi binary tree ke atas, membuat kompleksitas waktu program menjadi $O(\log{n})$.

## Kesimpulan

Contoh masalah ini hanya salah satu penggunaan bit manipulation. 
Beberapa aplikasi lain yang juga menarik dalam programming termasuk:
- Menyimpan nilai boolean dalam `bitset`
- Reverse Backtracking dengan menggunakan Bitmask
- Dynamic Programming dengan Bitmask
- dll.

Saya harap panduan ini dapat menjadi awal yang baik untuk memahami teknik bit manipulation, atau memperkaya pembaca dengan lebih banyak pengetahuan.

Terima kasih telah membaca dan selamat belajar 😀