new Vue({
        el: '#app',
        data: {
          tag: "",
          page: "main",
          curVideo: "",
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
            this.page = pag
            this.tempList = JSON.parse(JSON.stringify(this.perguntas[pag].pergunta)) //limpa reatividade
            this.curVideo = this.perguntas[pag].video
          },
          navigation: function(index) {
            this.curVideo = this.tempList[index].video
            this.tempList.splice(index, 1)
          }
        },
        computed: {
          toggleSobre: function () {
            return this.isActive ? "X" : "?";
          }
        }
    })
