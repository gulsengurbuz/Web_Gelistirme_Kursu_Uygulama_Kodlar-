class Muzik {
  constructor(baslik, sarkici, img, dosya) {
    this.baslik = baslik;
    this.sarkici = sarkici;
    this.img = img;
    this.dosya = dosya;
  }

  getIsim() {
    return this.baslik + " - " + this.sarkici;
  }
}

const muzikListesi = [
  new Muzik("Duman ", "Senden Daha Güzel ", "duman.jpg", "duman.mp4"),
  new Muzik(
    "Seksendört",
    "Kendime Yalan Söyledim ",
    "seksendört.jpg",
    "seksendört.mp4"
  ),
  new Muzik(
    "Mor ve Ötesi",
    "bir derdim var",
    "birderdimvar.jpg",
    "birderdimvar.mp4"
  ),
];
