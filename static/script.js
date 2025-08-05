document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('fiyatModal');
    const modalTetikleyiciler = document.querySelectorAll('.modal-tetikleyici');
    const span = document.getElementsByClassName('close')[0];
    
    const modalBaslik = document.getElementById('modalBaslik');
    const modalFrekansSecenekleri = document.getElementById('modalFrekansSecenekleri');
    const modalHizmetListesi = document.getElementById('modalHizmetListesi');
    const modalEklentiBolumu = document.getElementById('modalEklentiBolumu');
    const modalEklentiListesi = document.getElementById('modalEklentiListesi');
    const toplamFiyatElementi = document.getElementById('toplamFiyat');
    const fiyatBirimElementi = document.getElementById('fiyatBirim');
    const teklifGonderBtn = document.getElementById('teklifGonderBtn');

    let aktifHizmetTipi = '';

    modalTetikleyiciler.forEach(button => {
        button.addEventListener('click', function() {
            aktifHizmetTipi = this.dataset.hizmetTipi;
            const katalog = hizmetKatalogu[aktifHizmetTipi];

            modalBaslik.textContent = katalog.baslik + " Fiyat Teklifi";
            
            modalFrekansSecenekleri.innerHTML = '';
            katalog.frekanslar.forEach((frekans, index) => {
                const checked = frekans.varsayilan ? 'checked' : '';
                const option = `
                    <div class="custom-radio">
                        <input type="radio" id="frekans${index}" name="frekans" value="${frekans.carpan}" data-label="${frekans.label}" ${checked}>
                        <label for="frekans${index}">${frekans.label}</label>
                    </div>`;
                modalFrekansSecenekleri.innerHTML += option;
            });

            modalHizmetListesi.innerHTML = '';
            katalog.hizmetler.forEach((hizmet, index) => {
                const item = `
                    <label class="service-item" for="hizmet${index}">
                        <input type="checkbox" id="hizmet${index}" class="hizmet-sec" data-fiyat="${hizmet.fiyat}">
                        <span class="custom-checkbox"></span>
                        <span class="service-desc">${hizmet.aciklama}</span>
                        <span class="service-price">${hizmet.fiyat.toFixed(2)} TL</span>
                    </label>`;
                modalHizmetListesi.innerHTML += item;
            });
            
            if (katalog.eklentiler && katalog.eklentiler.length > 0) {
                modalEklentiListesi.innerHTML = '';
                katalog.eklentiler.forEach((eklenti, index) => {
                    const eklenti_item = `
                        <label class="service-item" for="eklenti${index}">
                            <input type="checkbox" id="eklenti${index}" class="eklenti-sec" data-fiyat="${eklenti.fiyat}">
                            <span class="custom-checkbox"></span>
                            <span class="service-desc">${eklenti.aciklama}</span>
                            <span class="service-price">+${eklenti.fiyat.toFixed(2)} TL/Ay</span>
                        </label>`;
                    modalEklentiListesi.innerHTML += eklenti_item;
                });
                modalEklentiBolumu.style.display = 'block';
            } else {
                modalEklentiBolumu.style.display = 'none';
                modalEklentiListesi.innerHTML = '';
            }
            
            document.querySelectorAll('.modal-content input').forEach(element => {
                element.addEventListener('change', hesaplaVeGuncelle);
            });

            hesaplaVeGuncelle();
            modal.style.display = 'block';
        });
    });

    span.onclick = function() { modal.style.display = 'none'; }
    window.onclick = function(event) { if (event.target == modal) { modal.style.display = 'none'; } }

    function hesaplaVeGuncelle() {
        const seciliFrekansInput = document.querySelector('input[name="frekans"]:checked');
        if (!seciliFrekansInput) return;
        const carpan = parseFloat(seciliFrekansInput.value);
        const frekansLabel = seciliFrekansInput.dataset.label;

        let periyodikToplam = 0;
        let secilenHizmetlerAciklama = [];
        document.querySelectorAll('.hizmet-sec:checked').forEach(checkbox => {
            periyodikToplam += parseFloat(checkbox.dataset.fiyat);
            let aciklama = checkbox.closest('.service-item').querySelector('.service-desc').textContent;
            secilenHizmetlerAciklama.push("- " + aciklama);
        });
        const periyodikFiyat = periyodikToplam * carpan;

        let eklentiToplami = 0;
        let secilenEklentilerAciklama = [];
        document.querySelectorAll('.eklenti-sec:checked').forEach(checkbox => {
            eklentiToplami += parseFloat(checkbox.dataset.fiyat);
            let aciklama = checkbox.closest('.service-item').querySelector('.service-desc').textContent;
            secilenEklentilerAciklama.push("- " + aciklama);
        });

        const nihaiToplam = periyodikFiyat + eklentiToplami;

        fiyatBirimElementi.textContent = hizmetKatalogu[aktifHizmetTipi].birim;
        toplamFiyatElementi.textContent = nihaiToplam.toFixed(2);

        if (nihaiToplam > 0) {
            teklifGonderBtn.style.display = 'inline-block';
            const telefonNumarasi = '905458744502'; // BURAYA KENDİ NUMARANIZI YAZIN
            const baslik = hizmetKatalogu[aktifHizmetTipi].baslik;
            let mesaj = `Merhaba, ${baslik} için fiyat teklifi almak istiyorum.\n\n`;
            if (secilenHizmetlerAciklama.length > 0) {
                mesaj += `*Temizlik Planı:* ${frekansLabel}\n*Seçilen Periyodik Hizmetler:*\n${secilenHizmetlerAciklama.join('\n')}\n\n`;
            }
            if (secilenEklentilerAciklama.length > 0) {
                mesaj += `*Seçilen Sabit Eklentiler:*\n${secilenEklentilerAciklama.join('\n')}\n\n`;
            }
            mesaj += `*Hesaplanan ${hizmetKatalogu[aktifHizmetTipi].birim} Toplam: ${nihaiToplam.toFixed(2)} TL*`;
            teklifGonderBtn.href = `https://wa.me/${telefonNumarasi}?text=${encodeURIComponent(mesaj)}`;
        } else {
            teklifGonderBtn.style.display = 'none';
        }
    }
});