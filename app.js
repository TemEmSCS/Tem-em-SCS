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
            {name: "discriminação", img: "img/img_1.jpg", video: "MI8U5rQXUQs",
                  pergunta: [{ name: "teste", video: "3YbOkb5Sxi0" },
                            { name: "teste2", video: "hHu1FwaooEs" },
                            { name: "vai caralho!", video: "OjNVNLGH2kU" }]
            },
            {name: "capoeira", img: "img/img_2.jpg", video: "3YbOkb5Sxi0",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "história", img: "img/img_3.jpg", video: "hHu1FwaooEs",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "verticalização", img: "img/img_4.jpg", video: "OjNVNLGH2kU",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "cultura popular", img: "img/img_5.jpg", video: "scAman4qeXo",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "nordestinos", img: "img/img_6.jpg", video: "9acozs8E3ds",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "memória", img: "img/img_7.jpg", video: "hTffqEO37pQ",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "presença indígena", img: "img/img_8.jpg", video: "aG9e8L5rtgw",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "religiões afro", img: "img/img_9.jpg", video: "fRyxu2GBXc0",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "racismo", img: "img/img_10.jpg", video: "32iuclrqm9A",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "resistência", img: "img/img_11.jpg", video: "6P-umSJgVlQ",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
            },
            {name: "negritude", img: "img/img_12.jpg", video: "d7ZreTV_lNo",
                  pergunta: [{ name: "", video: "" },
                            { name: "", video: "" },
                            { name: "", video: "" }]
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
