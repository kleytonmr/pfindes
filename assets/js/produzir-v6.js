jQuery(document).ready(function() {
    $(document).on('click', '.button-js', function(event) {
        $(this).find(".minus").toggle();
        $(this).find(".plus").toggle();
        $(this).parent().find(".descricao").toggleClass("descricao-show");
    });
    $(document).on('click', '.button-categorias', function(event) {
        $(this).find(".minus").toggle();
        $(this).find(".plus").toggle();
        $(this).parent().parent().find(".categoria").toggleClass("categoria-show");
    });
    $(document).on('click', '.button-cluster', function(event) {
        $(this).find(".minus").toggle();
        $(this).find(".plus").toggle();
        $(this).parent().parent().find(".cluster-content").toggleClass("cluster-content-show");
    });

    $(document).on('click', '.button-cases', function(event) {
        $(this).find(".minus").toggle();
        $(this).find(".plus").toggle();
        $(this).parent().find(".more").toggleClass("show-more");
    });


        console.log(municipios)
    $.each(municipios, function (key, item) {
        $('select#municipio').append($("<option/>", {
            value: item.id,
            text: item.munic
        }));
    });

    $('select#municipio').on('change', function() {
        municID = parseInt(this.value);
        municipio = municipios.find(x => x.id === municID)
        $('img#mapa-json').attr("src","assets/img/mapa-cluster-" + municipio.cluster + ".png");

        $( "#top-nota" ).text(municipio.merc);
        $( "#merc-nota" ).text(municipio.merc);

        $( "#right-nota" ).text(municipio.caph);
        $( "#caph-nota" ).text(municipio.caph);

        $( "#bottom-nota" ).text(municipio.gestfin);
        $( "#gestfin-nota" ).text(municipio.gestfin);

        $( "#left-nota" ).text(municipio.infra);
        $( "#infra-nota" ).text(municipio.infra);

        $( "#ian-nota-escolha" ).text(municipio.ian);
        $( "#ian-nota" ).text(municipio.ian);

        $( "#top-ranking" ).text(municipio.cpos_merc + 'º' );
        $( "#cpos_merc-ranking" ).text(municipio.cpos_merc + 'º' );
        $( "#right-ranking" ).text(municipio.cpos_caph + 'º' );
        $( "#cpos_caph-ranking" ).text(municipio.cpos_caph + 'º' );
        $( "#bottom-ranking" ).text(municipio.cpos_gestfin + 'º' );
        $( "#cpos_gestfin-ranking" ).text(municipio.cpos_gestfin + 'º' );
        $( "#left-ranking" ).text(municipio.cpos_infra + 'º' );
        $( "#cpos_infra-ranking" ).text(municipio.cpos_infra + 'º' );
        $( "#cpos_infra-ranking" ).text(municipio.cpos_infra + 'º' );
        $( "#ian-nota-ranking" ).text(municipio.cpos_ian + 'º' );
        $( "#cpos_ian-ranking" ).text(municipio.cpos_ian + 'º' );

        $( "#notaReguaPrincipaCaph" ).text(municipio.caph);
        $( "#notaReguaPrincipaMerc" ).text(municipio.merc);
        $( "#notaReguaPrincipaGestfin" ).text(municipio.gestfin);
        $( "#notaReguaPrincipaInfra" ).text(municipio.infra);
        $( "#notaReguaPrincipaIan" ).text(municipio.ian);


        $( "#notaReguacmed_merc" ).text(municipio.cmed_merc);
        $( "#notaReguacmin_merc" ).text(municipio.cmin_merc);
        $( "#notaReguacmax_merc" ).text(municipio.cmax_merc);


        $( "#notaReguacmed_caph" ).text(municipio.cmed_caph);
        $( "#notaReguacmin_caph" ).text(municipio.cmin_caph);
        $( "#notaReguacmax_caph" ).text(municipio.cmax_caph);

        $( "#notaReguacmed_infra" ).text(municipio.cmed_infra);
        $( "#notaReguacmin_infra" ).text(municipio.cmin_infra);
        $( "#notaReguacmax_infra" ).text(municipio.cmax_infra);

        $( "#notaReguacmed_gestfin" ).text(municipio.cmed_gestfin);
        $( "#notaReguacmin_gestfin" ).text(municipio.cmin_gestfin);
        $( "#notaReguacmax_gestfin" ).text(municipio.cmax_gestfin);

        //Capital Humano - educaçao
        $( "#n_ideb_fund_1_59y" ).text(municipio.n_ideb_fund_1_59y);
        $( "#n_ideb_fund_2_1014y" ).text(municipio.n_ideb_fund_2_1014y);





        $( ".municipioName" ).text(municipio.munic);
        $(".municipioNameLimit").text(municipio.munic.substr(0, 11)+'..');


    });

    $(document).on('click', '#card-potencialMercado', function(event) {
        $("#content-potencialMercado").show();
        $("#content-capitalHumano").hide();
        $("#content-gestaoFiscal").hide();
        $("#content-infraEstrutura").hide();

        $("#card-potencialMercado").removeClass("active");
        $("#card-capitalHumano").removeClass("active");
        $("#card-gestaoFiscal").removeClass("active");
        $("#card-infraEstrutura").removeClass("active");
        $(this).addClass("active");

    });
    $(document).on('click', '#card-capitalHumano', function(event) {
        $("#content-capitalHumano").show();
        $("#content-potencialMercado").hide();
        $("#content-gestaoFiscal").hide();
        $("#content-infraEstrutura").hide();

        $("#card-potencialMercado").removeClass("active");
        $("#card-capitalHumano").removeClass("active");
        $("#card-gestaoFiscal").removeClass("active");
        $("#card-infraEstrutura").removeClass("active");
        $(this).addClass("active");

    });
    $(document).on('click', '#card-gestaoFiscal', function(event) {
        $("#content-gestaoFiscal").show();
        $("#content-potencialMercado").hide();
        $("#content-capitalHumano").hide();
        $("#content-infraEstrutura").hide();
        $("#card-potencialMercado").removeClass("active");
        $("#card-capitalHumano").removeClass("active");
        $("#card-gestaoFiscal").removeClass("active");
        $("#card-infraEstrutura").removeClass("active");
        $(this).addClass("active");

    });
    $(document).on('click', '#card-infraEstrutura', function(event) {
        $("#content-infraEstrutura").show();
        $("#content-potencialMercado").hide();
        $("#content-gestaoFiscal").hide();
        $("#content-capitalHumano").hide();
        $("#card-potencialMercado").removeClass("active");
        $("#card-capitalHumano").removeClass("active");
        $("#card-gestaoFiscal").removeClass("active");
        $("#card-infraEstrutura").removeClass("active");
        $(this).addClass("active");

    });


    $(document).on('scroll', function() {
        if($(this).scrollTop()>=$('#imgbg-final').position().top){
            $(".sidebar.fixed").css("display", "none");
        } else {
            $(".sidebar.fixed").css("display", "block");
        }
    });


    $(document).on('click', '#radio #option1', function(event) {
        $("label#label1").addClass("active");
        $("label#label2").removeClass("active");
        $("label#label3").removeClass("active");
    });
    $(document).on('click', '#radio #option2', function(event) {
        $("label#label2").addClass("active");
        $("label#label1").removeClass("active");
        $("label#label3").removeClass("active");
    });
    $(document).on('click', '#radio #option3', function(event) {
        $("label#label3").addClass("active");
        $("label#label2").removeClass("active");
        $("label#label1").removeClass("active");
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 1500) {
            $(".sidebar").addClass("fixed");
            $("#imgbg-final").css("z-index", "1");
        } else {
            $(".sidebar").removeClass("fixed");
        }
    });
});

function init(){
  $(document).ready(function(){
    $.ajax({
      url: "https://raw.githubusercontent.com/kleytonmr/ES-municipios/master/munic/banco.min.json?token=AHNGKJ76U73FCUWASQXOPAK5DHRMY",
      dataType: "json",
      success: function(data){
        $(data.municipios).each(function(index,value){
          var $select = $('#list-munic');
          $select.append('<option value=' + value.key + '>' + value.munic + '</option>');
        });
        selected(data.municipios)
        clicked(data.municipios)
      }
    });
  });
}

function selected(data){
  var selectedValueRadio;
  $("#radio").on('change', function () {
    selectedValueRadio = $("input[name='options']:checked").val();
    $('#list-munic option:first').prop('selected', true);
    for (var i in data){
      $("#" + data[i].key).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }
    console.log(selectedValueRadio);
  });

  $('#list-munic').on('change', function() {
    var munic_current = $( "#list-munic option:selected" ).val()

    for (var i in data){
      $("#" + data[i].key).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }

    for (var i in data){
      if (data[i].key == munic_current) {
        if(selectedValueRadio == "cluster"){
          for (var j in data){
            if (data[i].cluster == data[j].cluster) {
              $("#" + data[j].key).css("fill", "#a1a1a1");
              $("#" + munic_current).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
            }
          }
        }else if(selectedValueRadio == "regional"){
          for (var j in data){
            if (data[i].regional == data[j].regional) {
              $("#" + data[j].key).css("fill", "#2d3091");
              $("#" + munic_current).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
            }
          }
        }else if(selectedValueRadio == "estadual"){
          for (var j in data){
            $("#" + data[j].key).css("fill", "#a1a1a1");
            $("#" + munic_current).css("fill", "#ffba5a");
          }
        }else{
          alert("Escolha um grupo primeiro!")
        }
      }
    }
  });
}

function clicked(data){
  var selectedValueRadio;
  $("#radio").on('change', function () {
    selectedValueRadio = $("input[name='options']:checked").val();
    $('#list-munic option:first').prop('selected', true);
    for (var i in data){
      $("#" + data[i].key).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }
    console.log(selectedValueRadio);
  });

  $('g').on('click', function() {
    var munic_current = $(this).attr("id")
    $("#list-munic").val($(this).attr("id")).change();

    for (var i in data){
      $("#" + data[i].key).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }

    for (var i in data){
      if (data[i].key == munic_current) {
        if(selectedValueRadio == "cluster"){
          for (var j in data){
            if (data[i].cluster == data[j].cluster) {
              $("#" + data[j].key).css("fill", "#a1a1a1");
              $("#" + munic_current).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
            }
          }
        }else if(selectedValueRadio == "regional"){
          for (var j in data){
            if (data[i].regional == data[j].regional) {
              $("#" + data[j].key).css("fill", "#2d3091");
              $("#" + munic_current).css("fill", "#ffba5a");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
            }
          }
        }else if(selectedValueRadio == "estadual"){
          for (var j in data){
            $("#" + data[j].key).css("fill", "#a1a1a1");
            $("#" + munic_current).css("fill", "#ffba5a");
          }
        }else{
          alert("Escolha um grupo primeiro!")
        }
      }
    }
  });
}

init();





