# BAR CLOTHINGS

Erkek giyim üretimi ve toptan satışı için tek sayfalık kurumsal site. HTML, Tailwind CSS ve sade JavaScript ile kuruludur.

## Çalıştırma

Bağımlılıklar yalnızca CSS derlemek için gerekir. Derlenmiş dosya `css/styles.css` içindedir; siteyi açmak için ayrıca bir sunucu şart değildir.

```bash
npm install
npm run build:css
```

Yerelde bakmak için:

```bash
python3 -m http.server 8080
```

Ardından `http://localhost:8080` adresini açın.

## İletişim bilgilerini güncelleme

Tüm kanallar `js/main.js` içindeki `SITE_CONFIG` nesnesinden okunur.

```js
var SITE_CONFIG = {
  email: "barisikoray@gmail.com",
  instagramHandle: "bar.clothings",
  instagramUrl: "https://www.instagram.com/bar.clothings/",
  telegramName: "BAR CLOTHINGS",
  telegramUrl: "",
  mapsQuery: "BAR CLOTHİNG",
  whatsapp: "",
  siteUrl: ""
};
```

- **WhatsApp:** Numara gelince `whatsapp` alanına ülke koduyla yazın. Örnek: `"905321112233"`. Baştaki `+` ve boşluklar yok sayılır. Numara boşken butonlar iletişim bölümüne gider; numara dolunca `https://wa.me/...` açılır.
- **Telegram:** Kullanıcı adı veya davet bağlantısı gelince `telegramUrl` alanına `https://t.me/...` yazın. Boşken yalnızca ad gösterilir, sahte profil açılmaz.
- **Alan adı:** Canlı adres netleşince `siteUrl` değerini `https://alanadiniz.com` biçiminde girin. Canonical ve Open Graph adresi buna göre yazılır.
- **Harita:** `mapsQuery` Google Maps aramasını açar. Konum uydurulmamıştır.

HTML içindeki `href` değerleri, JavaScript kapalıyken yedek olarak durur. JS açıkken `SITE_CONFIG` esas alınır.

## Görselleri değiştirme

Ürün fotoğrafları gelince ilgili `img` etiketinin `src` değerini değiştirin. Kartlar `object-fit: cover` kullanır; çözünürlük sabit olmak zorunda değildir.

| Yer | Dosya | Not |
| --- | --- | --- |
| Hero | `index.html` içindeki `.hero-visual__img` | Fotoğraf koyunca sınıfa `is-cover` ekleyin. Logo dururken bu sınıf olmasın. |
| Eşofman | `assets/images/esofman.svg` | Aynı isimle değiştirilebilir veya `src` güncellenir. |
| Şort | `assets/images/sort.svg` | |
| Tişört | `assets/images/tisort.svg` | |

Yeni kategori için ürünler bölümündeki `article` bloğunu kopyalayın. Fiyat, kumaş veya beden bilgisi verilmeden eklenmemelidir.

Logo dosyaları `assets/logo/` altındadır.

## KVKK

`kvkk.html` resmi unvan ve yasal metin gelene kadar boş bir sayfa olarak durur. Metin uydurulmamıştır. Bilgiler gelince bu sayfanın gövdesine yazılması yeterlidir.
