      // Google API

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          videoId: 'xxx',
          playerVars: {rel: 0, showinfo: 0, controls:0, fs: 0, iv_load_policy: 3, modestbranding: 1},
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
      }
      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        switch (event.data) {
          case YT.PlayerState.PLAYING:
              document.getElementById('perguntas').classList.remove('show');
              break;
          case YT.PlayerState.PAUSED:
          case YT.PlayerState.ENDED:
              document.getElementById('perguntas').classList.add('show');
              break;
        }
      }

      // Automação Perguntas -- Videos
      document.addEventListener('keypress', function(e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
          // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
          e.preventDefault();
          player.getPlayerState() == 1 ? player.pauseVideo() : player.playVideo();
        }
      })


//meu app
new Vue({
        el: '#app',
        data: {
          tag: "",
          mainPage: true,
          isActive: false,
          tempList: [],
          perguntas: [
            {name: "discriminação", img: "img/img_1b.png", video: "S_aodABI058",
                  pergunta: [{ name: "Descolonização das narrativas", video: "j1vZYKoDvKg" },
                            { name: "Trabalho e Desigualdade", video: "6M731B42le4" },
                            { name: "Territórios e Preconceito", video: "A2pOshRMYMk" },
                            { name: "Naturalização da discriminação", video: "GuGh8Q6yv14" }]
            },
            {name: "capoeira", img: "img/img_2.jpg", video: "xkCpGuvCqbA",
                  pergunta: [{ name: "Libertações da Capoeira", video: "IXfevBYHpqA" },
                            { name: "Capoeiras", video: "PPu7i0LyEtY" },
                            { name: "Luta por direitos", video: "ArERs_qKDhY" }]
            },
            {name: "história", img: "img/img_3.jpg", video: "hHu1FwaooEs",
                  pergunta: [{ name: "História de si", video: "9qXEeREQd_8" },
                            { name: "História na boca do povo", video: "zTGZAWNt0ww" },
                            { name: "Onde mora a história", video: "Aqn7X3yamHw" }]
            },
            {name: "verticalização", img: "img/img_4.jpg", video: "OjNVNLGH2kU",
                  pergunta: [{ name: "Mudanças sensíveis; impactos", video: "Yk7kGLofkMI" },
                            { name: "A percepção do antes e do depois", video: "lusltIobEVo" },
                            { name: "De onde vem a verticalização", video: "YHQhz0ODkgk" }]
            },
            {name: "cultura popular", img: "img/img_5.jpg", video: "scAman4qeXo",
                  pergunta: [{ name: "Reconhecimento da Cultura Popular", video: "cQlCMgT2jxs" },
                            { name: "Cultura popular e Preconceito", video: "romJ5kqljNA" },
                            { name: "Expressões populares e a rua", video: "6st3jYM6KZQ" }]
            },
            {name: "nordestinos", img: "img/img_6.jpg", video: "9acozs8E3ds",
                  pergunta: [{ name: "Diversidade nordestina", video: "u7TzRkFsc5E" },
                            { name: "Migração e solidariedade", video: "CuNh-B0YFc8" },
                            { name: "Território migrante", video: "XTETFClPB7k" }]
            },
            {name: "memória", img: "img/img_7b.png", video: "V-bxD1h8_tY",
                  pergunta: [{ name: "Importância da Memória", video: "hTffqEO37pQ" },
                            { name: "Memohistória", video: "lxOl2QtrvJc" },
                            { name: "Cultura é memória", video: "6a6rpBC6I_k" },
                            { name: "Mapas de memória", video: "zOh4RP-7q4c" }]
            },
            {name: "presença indígena", img: "img/img_8.jpg", video: "aG9e8L5rtgw",
                  pergunta: [{ name: "Trajetórias originárias", video: "bGfk0UmktxI" },
                            { name: "Auto reconhecimento", video: "Jzx1alpSFIk" },
                            { name: "Indígenas em contexto urbano", video: "55WSDuBLpf4" }]
            },
            {name: "religiões afro", img: "img/img_9.jpg", video: "fRyxu2GBXc0",
                  pergunta: [{ name: "tania 8", video: "w2-PchRYHrs" },
                            { name: "Um pouco da presença dos orixás no Brasil", video: "E3oALvB26pI" },
                            { name: "A roupa que nos cobre", video: "_t_xiWDTLbQ" }]
            },
            {name: "racismo", img: "img/img_10.jpg", video: "32iuclrqm9A",
                  pergunta: [{ name: "Empretecer", video: "x03apDoPDFs" },
                            { name: "Vestígios da escravidão", video: "DcXP_x-zPsE" },
                            { name: "Reflexões sobre o racismo", video: "yhlHkavzqs8" },
                            { name: "Diálogo e apropriação", video: "F62Q4U-ARRA" }]
            },
            {name: "resistência", img: "img/img_11.jpg", video: "6P-umSJgVlQ",
                  pergunta: [{ name: "Comunidade e Oralidade", video: "_AS33-3LJ1o" },
                            { name: "Memória > Escrita", video: "zPaCQfUrN18" },
                            { name: "Literatura insubmissa", video: "dumTgQPwyKA" },
                            { name: "Cartilha da Resistência", video: "YHVK2drXUU4" },
                            { name: "Porvir", video: "2bXwWMVh_7A" }]
            },
            {name: "negritude", img: "img/img_12.jpg", video: "d7ZreTV_lNo",
                  pergunta: [{ name: "Territórios negros", video: "WmhCpro8pRs" },
                            { name: "Apagamentos da presença negra", video: "P6bu-Wo2joc" },
                            { name: "Ancestralidade", video: "01fH2R55hn4" }]
            }
          ]
        },
        methods: {
          pagina: function(pag) {
            this.mainPage = false
            this.tempList = JSON.parse(JSON.stringify(this.perguntas[pag].pergunta)) //limpa reatividade
            player.loadVideoById(this.perguntas[pag].video)
          },
          navigation: function(index) {
            player.loadVideoById(this.tempList[index].video)
            this.tempList.splice(index, 1)
          },
          toMain: function() {
            player.pauseVideo()
            this.mainPage = true
          }
        },
        computed: {
          toggleSobre: function () {
            return this.isActive ? "X" : "?";
          }
        }
    })
