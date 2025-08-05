from flask import Flask, render_template, json, Response # Response'u ekledik

app = Flask(__name__)

# Tüm hizmetlerimizi tek bir katalog altında topluyoruz.
hizmet_katalogu = {
    "bina": {
        "baslik": "Bina & Apartman Temizliği",
        "birim": "Aylık", # Fiyatlandırma birimi
        "frekanslar": [
            # label: Ekranda görünecek yazı, carpan: Fiyatı çarpacağımız sayı
            {"label": "Haftada 1 Kez (Ayda 4 Temizlik)", "carpan": 4, "varsayilan": True},
            {"label": "15 Günde 1 Kez (Ayda 2 Temizlik)", "carpan": 2, "varsayilan": False}
        ],
        # Bunlar, yukarıdaki frekansla çarpılacak olan "ziyaret başı" hizmetlerdir.
        "hizmetler": [
            { "id": 1, "aciklama": "Merdiven ve sahanlıkların süpürülüp silinmesi", "fiyat": 250.00 },
            { "id": 2, "aciklama": "Asansör ve kapıların temizliği", "fiyat": 200.00 },
            { "id": 3, "aciklama": "Giriş kapısı ve bina camlarının silinmesi", "fiyat": 200.00 },
            { "id": 4, "aciklama": "Merdiven korkulukları ve posta kutularının silinmesi", "fiyat": 300.00 }
        ],
        # Bunlar, frekanstan bağımsız, aylık fiyata eklenecek sabit hizmetlerdir.
        "eklentiler": [
            # Bu fiyat aylık fiyattır. (Örn: 30 gün * 25 TL/gün = 750 TL)
            { "id": 101, "aciklama": "Günlük Çöp Toplama Hizmeti", "fiyat": 1800.00 }
        ]
    },
    "ev": {
        "baslik": "Ev Temizliği",
        "birim": "Tek Seferlik",
        "frekanslar": [
            {"label": "Tek Seferlik Detaylı Temizlik", "carpan": 1, "varsayilan": True}
        ],
        "hizmetler": [
            { "id": 1, "aciklama": "Detaylı Mutfak (Dolap içleri Dahil)", "fiyat": 1800.00 },
            { "id": 2, "aciklama": "Banyo ve Tuvalet Temizliği", "fiyat": 700.00 },
            { "id": 3, "aciklama": "Tüm Odaların Genel Temizliği", "fiyat": 500.00 },
            { "id": 4, "aciklama": "Camların İçten Silinmesi", "fiyat": 500.00 }
        ]
    },
    "ofis": {
        "baslik": "Ofis & İş Yeri Temizliği",
        "birim": "Aylık",
        "frekanslar": [
            {"label": "Haftada 2 Kez (Ayda 8 Temizlik)", "carpan": 8, "varsayilan": True},
            {"label": "Haftada 1 Kez (Ayda 4 Temizlik)", "carpan": 4, "varsayilan": False}
        ],
        "hizmetler": [
            { "id": 1, "aciklama": "Çalışma Alanları ve Masaların Temizliği", "fiyat": 700.00 },
            { "id": 2, "aciklama": "Zeminlerin Süpürülüp Silinmesi", "fiyat": 250.00 },
            { "id": 3, "aciklama": "Mutfak ve Dinlenme Alanı Temizliği", "fiyat": 450.00 },
            { "id": 4, "aciklama": "WC ve Lavabo Temizliği", "fiyat": 250.00 }
        ]
    }
}

@app.route('/')
def anasayfa():
    # Hizmet katalogunu şablona gönderiyoruz.
    return render_template('index.html', hizmet_katalogu_json=json.dumps(hizmet_katalogu))

# robots.txt dosyası için yeni bir route ekliyoruz
@app.route('/robots.txt')
def robots():
    # robots.txt içeriği: Tüm arama motorlarına tüm siteyi tarama izni verir
    robots_content = "User-agent: *\nAllow: /"
    return Response(robots_content, mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True)
