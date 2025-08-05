// static/particles-config.js (Optimize Edilmiş Hali)

tsParticles.load("particles-js", {
  "particles": {
    "number": {
      "value": 25, // DEĞİŞTİ: Papatya sayısı 40'tan 25'e düşürüldü.
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "shape": {
      "type": "char",
      "character": {
        "value": ["🌸", "🌼", "🏵️", "💮"],
        "font": "Verdana",
        "style": "",
        "weight": "400",
        "fill": true
      }
    },
    "opacity": {
      "value": 0.8,
      "random": true,
    },
    "size": {
      "value": 16,
      "random": {
        "enable": true,
        "minimumValue": 10
      }
    },
    "rotate": {
        "value": 0,
        "random": true,
        "direction": "random",
        "animation": {
            "enable": true,
            "speed": 5,
            "sync": false
        }
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "enable": true,
      "speed": 1.5, // DEĞİŞTİ: Hareket hızı biraz yavaşlatıldı.
      "direction": "bottom",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      // DEĞİŞTİ: Fare etkileşimleri performans için kapatıldı.
      "onhover": {
        "enable": false, 
        "mode": "bubble"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    }
  },
  "retina_detect": true
});