var municipio_nome;
var preencherForm = false;
var bool_Carousel = false;
var cidades_carrosel = [];

function getMunicipiosJson (callback) {
  //$.getJSON("https://raw.githubusercontent.com/kleytonmr/ES-municipios/master/munic/banco.min.json?token=AHNGKJ76U73FCUWASQXOPAK5DHRMY",
  $.getJSON("https://raw.githubusercontent.com/kleytonmr/ES-municipios/developer/munic/banco.min.json",
  function (data) {
      callback(data.municipios);
    });
}

function initMunicipioSelect(data) {
  $('.cc-select-municipio').each(function() {
    var input = $(this);
    $(data).each(function(i, value){
      input.append($('<option>', { value: value.key, text: value.munic }));
    });
  });
}

function initClusterMap(idMunicipio) {

  var munic_current = municipio_nome = idMunicipio;
  if (!munic_current) return;

  // selectMunicipioOption(munic_current);
  // populeMunicipioData(munic_current);

  var buildMunicSelector = function (id) {
    return "#cluster-map g[data-municipio='" + id + "']";
  }

  getMunicipiosJson(function(data) {
    for (var i in data){
      $(buildMunicSelector(data[i].key)).css("fill", "#e7e8ea");
    }

    for (var i in data){
      $(buildMunicSelector(data[i].key)).css("fill", "#e7e8ea");
    }

    for (var i in data){
      if (data[i].key == munic_current) {
        for (var j in data){
          if (data[i].cluster == data[j].cluster) {
            $(buildMunicSelector(data[j].key)).css("fill", "#a1a1a1");
            $(buildMunicSelector(munic_current)).css("fill", "#c9a471");
          }
        }
      }
    }
  });
}

function initFilterMap(idMunicipio) {
  var buildMunicSelector = function (id) {
    return "#filter-map g[data-municipio='" + id + "']";
  }

  var selectedValueRadio = $("input[name='options']:checked").val();
  var munic_current = idMunicipio;

  // selectMunicipioOption(munic_current);
  // populeMunicipioData(munic_current);
  getMunicipiosJson(function (data) {
    for (var i in data){
      $(buildMunicSelector(data[i].key)).css("fill", "#e7e8ea");
      $("#agrupamentos").find('li').remove()
    }

    for (var i in data){
      if (data[i].key == munic_current) {
        if(selectedValueRadio == "cluster"){
          for (var j in data){
            if (data[i].cluster == data[j].cluster) {
              $(buildMunicSelector(data[j].key)).css("fill", "#a1a1a1");
              $(buildMunicSelector(munic_current)).css("fill", "#c9a471");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
            }
          }
        }else if(selectedValueRadio == "regional"){
          for (var j in data){
            if (data[i].regional == data[j].regional) {
              $(buildMunicSelector(data[j].key)).css("fill", "#a1a1a1");
              $(buildMunicSelector(munic_current)).css("fill", "#c9a471");
              $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
            }
          }
        }else if(selectedValueRadio == "estadual"){
          for (var j in data){
            $(buildMunicSelector(data[j].key)).css("fill", "#a1a1a1");
            $(buildMunicSelector(munic_current)).css("fill", "#c9a471");
          }
        }else{
          // alert("Escolha um grupo primeiro!")
        }
      }
    }
  });
}

function selectMunicipioOption(idMunicipio) {
  if (idMunicipio) {
    $(".cc-select-municipio").each(function (i, input) {
      getMunicipiosJson(function (data) {
        var result = data.find(obj => {
          return obj.key === idMunicipio
        });
        $(input).val(result.key);
      });
    });
  }
}

function populeMunicipioData(idMunicipio) {

  getMunicipiosJson(function(data) {
    var municipio = data.find(obj => {
      return obj.key === idMunicipio
    });

    if (municipio) {
      $('img#img_cidade').attr("src","assets/img/img-" + municipio.key + ".jpg");
      $('span#doc-pdf-municipio').html(municipio.munic);

      if(preencherForm){
        var getClassDocLinks = document.getElementsByClassName("cc-link-box-conteudo");
        getClassDocLinks[4].href = "assets/documentos/ideies-documento-diagnostico-personalizado-de-"+municipio.key+".pdf";
      }
      populateMainRulerValues(municipio);

      var keys = Object.keys(municipio);

      $(keys).each(function (i, keyName) {
        buildCategoriesSliderRuler(keyName);
        //detecta se a variavel está vazia
        if (municipio.keyName === undefined) {
          //altera o ideb_med_15_19y em especifico
          $("span[id*='ideb_med_15_19y']").each(function (i, e) {
            $(this).text(' - ');
          });
          //altera o texto2 em especifico
          $("p[class*='texto2']").each(function (i, e) {
            $(this).text(' ');
          });
        }
        var keyTerms = keyName.toString().split('_');
        if (keyTerms[0] === 'pr') {
          keyTerms.shift();
          keyTerms = keyTerms.join('_');
          setCategoriesSliderRuler(keyTerms, municipio);
        }
      });

      $(keys).each(function (i, name) {
        var value = municipio[name];

        if (isNumeric(value)) {
          $('#' + name).html(parseFloat(value).toFixed(2));
          var nValue;          
          nValueData = parseFloat(value).toFixed(1);
          var prefix = name.toString().split('_')[0];
          
          if ((prefix === 'gestfin') || (prefix === 'caph') || (prefix === 'merc') || (prefix === 'infra') || (prefix === 'ian')) {    
            nValue = parseFloat(value).toFixed(2);
          } else {
            nValue = parseFloat(value).toFixed(1);
          }

          if (prefix === 'cpos'){
            nValue = parseInt(nValue).toString() + '\u00BA';
          }

          //indicadores com 2 casas decimais
          $('span[data-'+ name +']').html(nValue.replace(".", ","));

          //inicio indicadores com 1 casa decimal (ultimo card)
          $('span[data-i-'+ name +']').html(nValueData.replace(".", ","));

        } else {
          $('#' + name).html(value);
          if (name === 'munic'){
            $('span[data-municipio]').html(municipio.munic);
          }
        }
      });


      $("span[id*='ran_']").each(function (i, e) {
        $(this).text(parseInt($(e).text()));
      });

    }
  });
}

// Verifica a sessão atual do menu e popula a regua principal.
function populateMainRulerValues(municipio) {

  var session = $('#menu-session').data('session');

  if (session === 'ian') {
    // TODO: Add variáveis texto ian
    setMainRuler(
      municipio.cmin_ian,
      municipio.cmed_ian,
      municipio.ian,
      municipio.cmax_ian
    )
  } else if (session === 'infraestrutura') {
    setMainRuler(
      municipio.cmin_infra,
      municipio.cmed_infra,
      municipio.infra,
      municipio.cmax_infra
    )
  } else if (session === 'potencial de mercado' ) {
    setMainRuler(
      municipio.cmin_merc,
      municipio.cmed_merc,
      municipio.merc,
      municipio.cmax_merc
    )
  } else if (session === 'capital humano' ) {
    setMainRuler(
      municipio.cmin_caph,
      municipio.cmed_caph,
      municipio.caph,
      municipio.cmax_caph
    )
  } else if (session === 'gestão fiscal' ) {
    setMainRuler(
      municipio.cmin_gestfin,
      municipio.cmed_gestfin,
      municipio.gestfin,
      municipio.cmax_gestfin
    )
  }
}

// inicializa os valores da Regua principal
function setMainRuler(menorVal, medVal, municVal, maiorVal) {
  var mainslider = document.getElementById('main-slider');

  $('#menor-val-cl').text(parseFloat(menorVal).toFixed(2));
  $('#media-val-cl').text(parseFloat(medVal).toFixed(2));
  $('#munic-val-cl').text(parseFloat(municVal).toFixed(2));
  $('#maior-val-cl').text(parseFloat(maiorVal).toFixed(2));

  var vf_min = 0.5;
  var vf_max = 9.5;

  var vf_med = (((medVal - menorVal) / (maiorVal - menorVal)) * 9 ) + 0.5;
  var vf_mun = (((municVal - menorVal) / (maiorVal - menorVal)) * 9 ) + 0.5;

  vf_med = parseFloat(vf_med).toFixed(1);
  vf_mun = parseFloat(vf_mun).toFixed(1);


  mainslider.noUiSlider.set([vf_min, vf_med, vf_mun, vf_max]);
}

// valida valores numericos
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function setClusterMapSelected(idMunicipio) {
  var cluster = "#cluster-map g[data-municipio='" + idMunicipio + "']";
  $(cluster).click();
}

function setFilterMapSelected(idMunicipio) {
  var filter = "#filter-map g[data-municipio='" + idMunicipio + "']";
  $(filter).click();
}

function clickFilterMap(idMunicipio) {
  if (idMunicipio) {
    getMunicipiosJson(function(data) {
      var municipio = data.find(obj => {
        return obj.key === idMunicipio;
      });

      var selectedValueRadio = $("input[name='options']:checked").val();
      var getClassSelectedValueRadio = document.getElementsByClassName("op_selectedValueRadio");

      for (var i = 0; i < 4; i++) {
        if (selectedValueRadio === 'cluster') {
          // cluster
          getClassSelectedValueRadio[i].innerHTML = "Média do Cluster";
          setClusterMapValues(municipio);

        } else if (selectedValueRadio === 'regional') {
          // regional
          getClassSelectedValueRadio[i].innerHTML = "Média da Regional";
          setRegionalMapValues(municipio);

        } else {
          // estadual
          getClassSelectedValueRadio[i].innerHTML = "Média do Estado";
          setEstadualMapValues(municipio);
        }
      }
    });
  }
}

function setEstadualMapValues(municipio) {
  if (municipio) {

    //  variável: ian
    $('#map-ian')         .html(parseFloat(municipio.ian,).toFixed(2));
    //  variável: pos_ian
    $('#ranking')         .html(parseInt(municipio.pos_ian,));

    //  variável: pos_infra
    $('#infra-ranking')   .html(parseInt(municipio.pos_infra,).toString() + '\u00BA');
    //  variável: infra
    $('#infra-pos')       .html(parseFloat(municipio.infra,).toFixed(2));
    //  variável: med_infra
    $('#infra-media')     .html(parseFloat(municipio.med_infra,).toFixed(2));

    //  variável: pos_merc
    $('#pmercado-ranking').html(parseInt(municipio.pos_merc,).toString() + '\u00BA');
    //  variável: merc
    $('#pmercado-pos')    .html(parseFloat(municipio.merc,).toFixed(2));
    //  variável: med_merc
    $('#pmercado-media')  .html(parseFloat(municipio.med_merc,).toFixed(2));

    //  variável: pos_caph
    $('#chumano-ranking') .html(parseInt(municipio.pos_caph,).toString() + '\u00BA');
    //  variável: caph
    $('#chumano-pos')     .html(parseFloat(municipio.caph).toFixed(2));
    //  variável: med_caph
    $('#chumano-media')   .html(parseFloat(municipio.med_caph,).toFixed(2));

    //  variável: pos_gestfin
    $('#gfiscal-ranking') .html(parseInt(municipio.pos_gestfin,).toString() + '\u00BA');
    //  variável: gestfin
    $('#gfiscal-pos')     .html(parseFloat(municipio.gestfin,).toFixed(2));
    //  variável: med_gestfin
    $('#gfiscal-media')   .html(parseFloat(municipio.med_gestfin,).toFixed(2));

    setMediaSliderRulers(

      municipio.med_infra,
      municipio.infra,

      municipio.med_merc,
      municipio.merc,

      municipio.med_caph,
      municipio.caph,

      municipio.med_gestfin,
      municipio.gestfin

      )
  }
}

function setRegionalMapValues(municipio) {
  if (municipio) {

    //  variável: ian
    $('#map-ian')         .html(parseFloat(municipio.ian,).toFixed(2));
    //  variável: rpos_ian
    $('#ranking')         .html(parseInt(municipio.rpos_ian,));

    //  variável: rpos_infra
    $('#infra-ranking')   .html(parseInt(municipio.rpos_infra,).toString() + '\u00BA');
    //  variável: infra
    $('#infra-pos')       .html(parseFloat(municipio.infra,).toFixed(2));
    //  variável: rmed_infra
    $('#infra-media')     .html(parseFloat(municipio.rmed_infra,).toFixed(2));

    //  variável: rpos_merc
    $('#pmercado-ranking').html(parseInt(municipio.rpos_merc,).toString() + '\u00BA');
    //  variável: merc
    $('#pmercado-pos')    .html(parseFloat(municipio.merc,).toFixed(2));
    //  variável: rmed_merc
    $('#pmercado-media')  .html(parseFloat(municipio.rmed_merc,).toFixed(2));

    //  variável: rpos_caph
    $('#chumano-ranking') .html(parseInt(municipio.rpos_caph,).toString() + '\u00BA');
    //  variável: caph
    $('#chumano-pos')     .html(parseFloat(municipio.caph).toFixed(2));
    //  variável: rmed_caph
    $('#chumano-media')   .html(parseFloat(municipio.rmed_caph,).toFixed(2));

    //  variável: rpos_gestfin
    $('#gfiscal-ranking') .html(parseInt(municipio.rpos_gestfin,).toString() + '\u00BA');
    //  variável: gestfin
    $('#gfiscal-pos')     .html(parseFloat(municipio.gestfin,).toFixed(2));
    //  variável: rmed_gestfin
    $('#gfiscal-media')   .html(parseFloat(municipio.rmed_gestfin,).toFixed(2));

    setMediaSliderRulers(

      municipio.rmed_infra,
      municipio.infra,

      municipio.rmed_merc,
      municipio.merc,

      municipio.rmed_caph,
      municipio.caph,

      municipio.rmed_gestfin,
      municipio.gestfin

      )
  }
}

function setClusterMapValues(municipio) {
  if (municipio) {

    //  variável: ian
    $('#map-ian')         .html(parseFloat(municipio.ian,).toFixed(2));
    //  variável: cpos_ian
    $('#ranking')         .html(parseInt(municipio.cpos_ian,));

    //  variável: cpos_infra
    $('#infra-ranking')   .html(parseInt(municipio.cpos_infra,).toString() + '\u00BA');
    //  variável: infra
    $('#infra-pos')       .html(parseFloat(municipio.infra,).toFixed(2));
    //  variável: cmed_infra
    $('#infra-media')     .html(parseFloat(municipio.cmed_infra,).toFixed(2));

    // variável: cpos_merc
    $('#pmercado-ranking').html(parseInt(municipio.cpos_merc,).toString() + '\u00BA');
    // variável: merc
    $('#pmercado-pos')    .html(parseFloat(municipio.merc,).toFixed(2));
    //  variável: cmed_merc
    $('#pmercado-media')  .html(parseFloat(municipio.cmed_merc,).toFixed(2));

    // variável: cpos_caph
    $('#chumano-ranking') .html(parseInt(municipio.cpos_caph,).toString() + '\u00BA');
    // variável: caph
    $('#chumano-pos')     .html(parseFloat(municipio.caph).toFixed(2));
    // variável: cmed_caph
    $('#chumano-media')   .html(parseFloat(municipio.cmed_caph,).toFixed(2));

    // variável: cpos_gestfin
    $('#gfiscal-ranking') .html(parseInt(municipio.cpos_gestfin,).toString() + '\u00BA');
    // variável: gestfin
    $('#gfiscal-pos')     .html(parseFloat(municipio.gestfin,).toFixed(2));
    // variável: cmed_gestfin
    $('#gfiscal-media')   .html(parseFloat(municipio.cmed_gestfin,).toFixed(2));

    setMediaSliderRulers(

      municipio.cmed_infra,
      municipio.infra,

      municipio.cmed_merc,
      municipio.merc,

      municipio.cmed_caph,
      municipio.caph,

      municipio.cmed_gestfin,
      municipio.gestfin

      )
  }
}

function setMediaSliderRulers(infra_media, infra_pos, pmercado_media, pmercado_pos, chumano_media, chumano_pos, gfiscal_media, gfiscal_pos) {
  var slider_infra_media = document.getElementById('slider_infra_media');
  slider_infra_media.noUiSlider.set([infra_media, infra_pos]);

  var slider_pmercado_media = document.getElementById('slider_pmercado_media');
  slider_pmercado_media.noUiSlider.set([pmercado_media, pmercado_pos]);

  var slider_chumano_media = document.getElementById('slider_chumano_media');
  slider_chumano_media.noUiSlider.set([chumano_media, chumano_pos]);

  var slider_gfiscal_media = document.getElementById('slider_gfiscal_media');
  slider_gfiscal_media.noUiSlider.set([gfiscal_media, gfiscal_pos]);
}

function buildMembrosCluster(idMunicipio) {
  if (idMunicipio) {
    getMunicipiosJson(function(data) {
      var selected = data.find(munic => {
        return munic.key === idMunicipio
      });
      var cClusters = data.map(function (munic) {
        if (munic.cluster === selected.cluster) {
          return munic;
        }
      }).filter(function(item) {
        return item != undefined
      });

      $('#membros-cluster').empty();
      var ul = document.createElement('ul');
      ul.classList.add('list-group', 'list-group-flush','row');
      $(cClusters).each(function(i,item) {
        var li = document.createElement('li');
        li.classList.add('list-group-item','col-md-6');
        $(li).html(item.munic);
        $(ul).append(li);
        $('#membros-cluster').append(ul);
      });
    });
  }
}

function populateTexts(data) {
  var municipioSelected = $(".cc-select-municipio").val();
  var municipio
  if (municipioSelected) {
    municipio = data.find(obj => {
      return obj.key === municipioSelected
    });
  } else {
    municipio = data[0];
  }

  var keys = Object.keys(municipio);
  $(keys).each(function (i, name) {
    $('.'+ name).html(municipio[name]);
  });

  var session = $('#menu-session').data('session');
  var texto1 = $('.texto1');
  var texto2 = $('.texto2');

  var pop = $('.pop');
  var idhm = $('.idhm');
  var pib = $('.pib');

  var pop_formatado = municipio['pop'];
  var idhm_formatado = municipio['idhm'];
  var pib_formatado = municipio['pib'];

  pop_formatado = parseFloat(pop_formatado).toFixed(0);
  idhm_formatado = parseFloat(idhm_formatado).toFixed(2);
  pib_formatado = parseFloat(pib_formatado).toFixed(0);

  //substitui os pontos por vírgulas
  idhm_formatado = idhm_formatado.replace('.',',');

  //põe a variável população na página
  pop.html(pop_formatado);
  //põe a variável idhm na página
  idhm.html(idhm_formatado);
  //põe a variável pib na página
  pib.html(pib_formatado);

  if (session === 'ian') {
    // TODO: Add variáveis texto ian
    texto1.html(municipio['texto1_ian']);    
    texto2.html(municipio['texto2_ian']);

    //att boas praticas
    populaCarousel(session, vitoria_es, cachoeiro_de_itapemirim_es, vila_pavao_es, juazeiro_do_norte_ce, niteroi_rj);
  }
  if (session === 'infraestrutura') {
    texto1.html(municipio['texto1_infra']);
    texto2.html(municipio['texto2_infra']);

    //att boas praticas
    populaCarousel(session, vitoria_es, cachoeiro_de_itapemirim_es, belo_horizonte_mg, curvelo_mg, parcerias_publico_privadas);
  }
  if (session === 'potencial de mercado') {
    texto1.html(municipio['texto1_potencial_de_mercado']);
    texto2.html(municipio['texto2_potencial_de_mercado']);

    //att boas praticas
    populaCarousel(session, sao_paulo_sp, fortaleza_ce, recife_pe, caruaru_pe, juazeiro_do_norte_ce);
  }
  if (session === 'capital humano') {
    texto1.html(municipio['texto1_capital_humano']);
    texto2.html(municipio['texto2_capital_humano']);

    //att boas praticas
    populaCarousel(session, sobral_ce, participacao_da_sociedade, vitoria_es, vila_pavao_es, oeiras_pi);
  }
  if (session === 'gestão fiscal') {
    texto1.html(municipio['texto1_gestao_fiscal']);
    texto2.html(municipio['texto2_gestao_fiscal']);

    //att boas praticas
    populaCarousel(session, niteroi_rj, espirito_santo_es, transparencia, consorcios_intermunicipais, regulacao);    
  }
}
//inicio da segunda regua
function buildCategoriesSliderRuler(keyName) {
  var slider = document.getElementById('slider_' + keyName);

  if (slider && !slider.classList.contains('noUi-target')) {

    noUiSlider.create(slider, {
      start: [0.0, 0.0],
      behaviour: 'unconstrained-tap',
      range: {
        'min': [0.0],
        'max': [10.0]
      }

    });

    slider.setAttribute('disabled', true);

    var media = document.createElement('span');
    media.innerHTML = "Média do Cluster";

    var municipio = document.createElement('span');
    municipio.innerHTML = "Vitória";
    municipio.setAttribute('data-municipio', 'Vitória');

    media.classList.add('cc-legenda-cluster', 'cc-cor-cinza');
    municipio.classList.add('cc-legenda-cluster', 'cc-cor-marrom', 'cc-municipio');

    var selector = '#slider_' + keyName + ' .noUi-handle';

    $($(selector)[0]).parent().prepend(media);
    $($(selector)[1]).parent().prepend(municipio);

    // TODO: remover indicadores fundo preto
    // $(selector).each(function () {
    //   this.style = 'background-color: black;';
    // });

    var mediaValor = document.createElement('span');
    mediaValor.id = "med_" + keyName;

    var municipioValor = document.createElement('span');
    municipioValor.id = keyName;

    mediaValor.classList.add('cc-valor', 'cc-color-cinza');
    municipioValor.classList.add('cc-color-marrom', 'cc-valor-municipio');

    $($(selector)[0]).parent().append(mediaValor);
    $($(selector)[1]).parent().append(municipioValor);
  }
}

function setCategoriesSliderRuler(keyName, objMunic) {
  var slider = document.getElementById('slider_' + keyName);
  if (slider) {
    var keyMedia = 'prm_' + keyName;
    var pr_keyName = 'pr_' + keyName;

    var medVal = objMunic[keyMedia];
    var municVal = objMunic[pr_keyName];

    medVal = parseFloat(medVal).toFixed(1);
    municVal = parseFloat(municVal).toFixed(1);

    slider.noUiSlider.set([medVal, municVal]);
  }
}

function buildMainSliderRuler() {
  var slider = document.getElementById('main-slider');

  noUiSlider.create(slider, {
    start: [2, 4, 6, 8],
    behaviour: 'unconstrained-tap',
    range: {
      'min': [0.0],
      'max': [10.0]
    }
  });

  slider.setAttribute('disabled', true);

  var menor = document.createElement('span');
  menor.innerHTML = "Menor do Cluster";

  var media = document.createElement('span');
  media.innerHTML = "Média do Cluster";

  var municipio = document.createElement('span');
  municipio.innerHTML = "Vitoria";
  municipio.setAttribute('data-municipio', 'Vitoria');

  var maior = document.createElement('span');
  maior.innerHTML = "Maior do Cluster";

  menor.classList.add('cc-legenda-cluster', 'cc-cor-roxo');
  media.classList.add('cc-legenda-cluster', 'cc-cor-cinza');
  municipio.classList.add('cc-legenda-cluster', 'cc-cor-marrom', 'cc-municipio');
  maior.classList.add('cc-legenda-cluster', 'cc-cor-roxo');

  var selector = '#main-slider .noUi-handle';

  $($(selector)[0]).parent().prepend(menor);
  $($(selector)[1]).parent().prepend(media);
  $($(selector)[2]).parent().prepend(municipio);
  $($(selector)[3]).parent().prepend(maior);

  var menorValor = document.createElement('span');
  menorValor.innerHTML = "0,0";
  menorValor.id = "menor-val-cl";

  var mediaValor = document.createElement('span');
  mediaValor.innerHTML = "0,0";
  mediaValor.id = "media-val-cl";

  var municipioValor = document.createElement('span');
  municipioValor.innerHTML = "0,0";
  municipioValor.id = "munic-val-cl";

  var maiorValor = document.createElement('span');
  maiorValor.innerHTML = "0,0";
  maiorValor.id = "maior-val-cl";

  menorValor.classList.add('cc-valor', 'cc-color-roxo');
  mediaValor.classList.add('cc-valor', 'cc-color-cinza');
  municipioValor.classList.add('cc-valor', 'cc-color-marrom', 'cc-valor-municipio');
  maiorValor.classList.add('cc-valor', 'cc-color-roxo');

  $($(selector)[0]).parent().append(menorValor);
  $($(selector)[1]).parent().append(mediaValor);
  $($(selector)[2]).parent().append(municipioValor);
  $($(selector)[3]).parent().append(maiorValor);
}

function buildMediaSliderRulers() {
  var sliderIds = [
    'slider_infra_media',
    'slider_pmercado_media',
    'slider_chumano_media',
    'slider_gfiscal_media'
  ]
//início da terceira régua
  $(sliderIds).each(function (i, id) {
    var slider = document.getElementById(id);

    noUiSlider.create(slider, {
      start: [3.5, 6.5],
      behaviour: 'unconstrained-tap',
      range: {
        'min': [0.0],
        'max': [10.0]
      }
    });

    slider.setAttribute('disabled', true);

    var media = document.createElement('span');
    media.className = "op_selectedValueRadio";
    media.innerHTML = "Média do Cluster";

    var municipio = document.createElement('span');
    municipio.innerHTML = "Vitória";
    municipio.setAttribute('data-municipio', 'Vitória');

    media.classList.add('cc-legenda-cluster', 'cc-cor-cinza');
    municipio.classList.add('cc-legenda-cluster', 'cc-cor-marrom', 'cc-municipio');

    var selector = '#' + id + ' .noUi-handle';

    $($(selector)[0]).parent().prepend(media);
    $($(selector)[1]).parent().prepend(municipio);

    var mediaValor = document.createElement('span');
    var municipioValor = document.createElement('span');

    switch (id) {
      case 'slider_infra_media':
        mediaValor.id = "infra-media";
        municipioValor.id = "infra-pos";
        break;
      case 'slider_pmercado_media':
        mediaValor.id = "pmercado-media";
        municipioValor.id = "pmercado-pos";
        break;
      case 'slider_chumano_media':
        mediaValor.id = "chumano-media";
        municipioValor.id = "chumano-pos";
        break;
      case 'slider_gfiscal_media':
        mediaValor.id = "gfiscal-media";
        municipioValor.id = "gfiscal-pos";
        break;
    }

    mediaValor.classList.add('cc-valor', 'cc-color-cinza');
    municipioValor.classList.add('cc-valor', 'cc-color-marrom', 'cc-valor-municipio');

    $($(selector)[0]).parent().append(mediaValor);
    $($(selector)[1]).parent().append(municipioValor);
  });

}

$(document).ready(function() {
  var inputSelectMunicipio = $(".cc-select-municipio");
  buildMainSliderRuler();
  buildMediaSliderRulers();
  getMunicipiosJson(initMunicipioSelect);
  getMunicipiosJson(populateTexts);

  inputSelectMunicipio.on('change', function () {
    var that = $(this)
    inputSelectMunicipio.each(function (i, input) {
      $(input).val(that.val());
    });
    setClusterMapSelected(that.val());
    setFilterMapSelected(that.val());
    buildMembrosCluster(that.val());
    selectMunicipioOption(that.val());
    populeMunicipioData(that.val());
  });

  $("g[data-municipio]").on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var munic_current = $(this).data("municipio");
    initClusterMap(munic_current);
    initFilterMap(munic_current);
    clickFilterMap(munic_current);
    buildMembrosCluster(munic_current);
    selectMunicipioOption(munic_current);
    populeMunicipioData(munic_current);
    getMunicipiosJson(populateTexts);
  });

  $(".cc-custom-radio").on('click', function () {
    setFilterMapSelected(inputSelectMunicipio.val())
  });

  $('a[data-toggle="pill"]').on('click', function (e) {
    var idMunicipio = inputSelectMunicipio.val();
    populeMunicipioData(idMunicipio);
    getMunicipiosJson(populateTexts);
  });

  setTimeout(function () {
    inputSelectMunicipio.val('vitoria');
    populeMunicipioData('vitoria');
    setClusterMapSelected('vitoria');
    setFilterMapSelected('vitoria');
    buildMembrosCluster('vitoria');
  }, 1000);

});

/* inicio validação formulario # eric */
function checkFilled() {
  validation();
}

// função para capturar o envio do formulário e liberar os arquivos para download
function submit_doc_form() {

  var nome = document.getElementById("doc_form_nome").value;
  var email = document.getElementById("doc_form_email").value;
  var telefone = document.getElementById("doc_form_telefone").value;

if (validation()) // chama a função de validação do formulário
  {
  preencherForm = true;
  var getClassDocIconForm = document.getElementsByClassName("doc-icon");
  var getClassDocLinks = document.querySelectorAll('.cc-link-box-conteudo');
  var getTextDocLinks = document.querySelectorAll('.pdf-text');

  for (var i = 0; i < getClassDocIconForm.length; i++) {

    getClassDocIconForm[i].classList.add("flip-vertical-left");

    if(getClassDocIconForm[i].src.indexOf("xls") != -1) {
      getClassDocIconForm[i].src = "assets/img/xls-icon.png";
    } else {
      getClassDocIconForm[i].src = "assets/img/pdf-icon.png";
    }

    getClassDocIconForm[i].style.opacity = '1';
    getTextDocLinks[i].style.color = '#fff';

    switch (getClassDocLinks[i].id) {
      case "doc-link-fichamento" :
          getClassDocLinks[i].href = "assets/documentos/ideies-documento-fichamento-dos-indicadores.pdf";
        break;
        case "doc-link-referencial" :
          getClassDocLinks[i].href = "assets/documentos/ideies-documento-referencial-teorico-estatistico.pdf";
        break;
        case "doc-link-plano-melhoria" :
          getClassDocLinks[i].href = "assets/documentos/ideies-documento-plano-melhoria-ambiente-negocios-municipios-es-fase-1-diagnostico.pdf";
        break;
        case "doc-link-base-dados" :
          getClassDocLinks[i].href = "assets/documentos/ideies-documento-base-de-dados.xlsx";
        break;
        case "doc-link-diagnostico-personalizado" :
          getClassDocLinks[i].href = "assets/documentos/ideies-documento-diagnostico-personalizado-de-"+municipio_nome+".pdf";
        break;
    }
  }

  //document.getElementById("doc_form").submit(); //disparo do form caso esteja tudo correto
  }
}

// função pra validar email e nome
function validation() {
  var nome = document.getElementById("doc_form_nome");
  var email = document.getElementById("doc_form_email");
  //var emailReg = /^([w-.]+@([w-]+.)+[w-]{2,4})?$/;

  if (nome.value !== '') {
    nome.style.borderBottom = '2px solid #009fe3';
  }
  if (email.value !== '') {
    email.style.borderBottom = '2px solid #009fe3';
  }

  if (nome.value === '' || email.value === '') {
  //nome ou email vazios

  if (nome.value === '') {
    nome.style.borderBottom = '2px solid #dc3545';
    nome.placeholder = 'Nome é obrigatório';
    document.getElementById("nomeHelp").style.display = 'none';
  }
  if (email.value === '') {
    email.style.borderBottom = '2px solid #dc3545';
    email.placeholder = 'E-mail é obrigatório';
    document.getElementById("emailHelp").style.display = 'none';
  }

  return false;
  //} else if (!(email).match(emailReg)) {
  //email inválido
  //alert("email inválido")
  //return false; //se estiver algo errado
  } else {
  return true; //se estiver tudo certo
  }
}
/* fim validação formulario # eric */

/* inicio exibição carrosel dos temas # eric */
//inicia o array com as cidades
//att boas praticas

var vitoria_es = {
  id: 'vitoria_es',
  nome:'Vitória - ES',
  resumo_comp:'Com a finalidade de reduzir a alta taxa de homicídios, Vitória passou por uma reestruturação. A cidade criou um arranjo institucional que fosse capaz de coordenar os projetos de segurança pública. Além disso, obteve êxito nos programas preventivos, reduzindo a taxa de homicídios de 81 por 100 mil habitantes no início dos anos 2000 para 17 por 100 mil habitantes, em 2016.',
  resumo_caph:'Em Vitória/ES o plano de educação infantil possui como base três ferramentas fundamentais: a participação da sociedade em conselhos escolares, a formação continuada dos profissionais e a infraestrutura das escolas. Os conselhos escolares da capital capixaba possuem uma atuação com característica deliberativa e fiscalizadora, o que promove maior participação da sociedade nas decisões dos centros infantis.',
  src:'assets/img/carousel-vitoria-es.jpg'
}

var espirito_santo_es = {
  id: 'espirito_santo_es',
  nome:'Espírito Santo',
  resumo:'O Espírito Santo é um dos estados que melhor vem cumprindo todos os limites estabelecidos.',
  resumo_comp:'O Espírito Santo é um dos estados que melhor vem cumprindo todos os limites estabelecidos na Lei de Responsabilidade Fiscal, tanto que na última avaliação anual do Tesouro Nacional, foi a única unidade da federação a ser avaliado com nota A.',
  src:'assets/img/carousel-es.jpg'
}

var vila_pavao_es = {
  id: 'vila_pavao_es',
  nome:"Vila Pavão - ES",
  resumo:"O município de Vila Pavão/ES obteve destaque na rápida evolução da nota do IDEB para o ensino fundamental (anos iniciais 1º ao 5º ano).",
  resumo_comp:"O município de Vila Pavão/ES obteve destaque na rápida evolução da nota do IDEB para o ensino fundamental (anos iniciais 1º ao 5º ano). Em 2009, o município ocupava a posição 2010º no ranking dos municípios brasileiros e a 38º entre os municípios do estado. Já em 2017, o município alcançou a posição 573º no ranking nacional e a 1º colocação no ranking estadual. Além disso, o município possui a nota média de 6,8 pontos, superior à meta nacional para 2021, de 5,8 pontos.",
  src:"assets/img/carousel-vila-pavao-es.jpg"
}

var juazeiro_do_norte_ce = {
  id: 'juazeiro_do_norte_ce',
  nome:"Juazeiro do norte - CE",
  resumo:"A primeira lei municipal de inovação e Smart Cities foi sancionada em Juazeiro/CE com a pretensão de tornar o município uma cidade inteligente.",
  resumo_comp:"A primeira lei municipal de inovação e Smart Cities foi sancionada em Juazeiro/CE. Com a pretensão de tornar o município uma cidade inteligente, a lei garante segurança jurídica para as ações que vem sendo desenvolvidas na área de inovação, representando um grande passo para o fomento de iniciativas inovadores e modernização dos serviços públicos.",
  src:"assets/img/carousel-juazeiro-ce.jpg"
}

var niteroi_rj = {
  id: 'niteroi_rj',
  nome:"Niterói - RJ",
  resumo:"De acordo com o Índice Firjan de Gestão Fiscal (IFGF), a cidade de Niterói ficou em 6º no ranking nacional de gestão fiscal.",
  resumo_comp:"De acordo com o Índice Firjan de Gestão Fiscal (IFGF), a cidade de Niterói ficou em 6º no ranking nacional de gestão fiscal. O que mais impressiona é que em 2012, o município ocupava a posição 2.188º. A gestão da prefeitura promoveu 67 medidas de ajustes fiscal, implantou sistema de monitoramento para ampliar as receitas provenientes de ICMS, além de aumentar a capacidade de investimento via Parcerias Público Privadas (PPPs).",
  src:"assets/img/carousel-niteroi-rj.jpg"
}

var cachoeiro_de_itapemirim_es = {
  id: 'cachoeiro_de_itapemirim_es',
  nome:"Cachoeiro de Itapemirim - ES",
  resumo:"A cidade foi a pioneira no Brasil a conceder os serviços de abastecimento de água e tratamento de esgoto para a iniciativa privada.",
  resumo_comp:"A cidade foi a pioneira no Brasil a conceder os serviços de abastecimento de água e tratamento de esgoto para a iniciativa privada. Hoje, o município é referência no país em saneamento. Em 2003 o município tratava 9,7% do esgoto, e, em 2017, passou a tratar 98,6%.",
  src:"assets/img/carousel-cachoeiro-de-itapemirim-es.jpg"
}

var belo_horizonte_mg = {
  id: 'belo_horizonte_mg',
  nome:"Belo Horizonte - MG",
  resumo:"A cidade de Belo Horizonte foi a primeira capital a formalizar um contrato de PPP de iluminação pública.",
  resumo_comp:"A cidade de Belo Horizonte foi a primeira capital a formalizar um contrato de PPP de iluminação pública, prevendo a substituição de 182 mil pontos de luz da cidade por luminárias LED. A troca ocorrerá primeiro nas regiões de maior vulnerabilidade social, com previsão de conclusão em três anos.",
  src:"assets/img/carousel-belo-horizonte-mg.jpg"
}

var curvelo_mg = {
  id: 'curvelo_mg',
  nome:"Curvelo - MG",
  resumo:"O tema mobilidade urbana também está presente nas políticas públicas das cidades de pequeno porte.",
  resumo_comp:"O tema mobilidade urbana também está presente nas políticas públicas das cidades de pequeno porte. Com um diagnóstico diferente de grandes cidades, o município de Curvelo/MG planejou sua mobilidade urbana para reduzir o tempo de espera pelos coletivos, ampliar a qualidade e diminuir a falta de acesso ao transporte público. A cidade foi premiada com o primeiro lugar na categoria mobilidade da pesquisa Connected Smart Cities.",
  src:"assets/img/carousel-curvelo-mg.jpg"
}

var parcerias_publico_privadas = {
  id: 'parcerias_publico_privadas',
  nome:"Parcerias Público Privadas",
  resumo:"Como viabilizar projetos de parcerias público privadas em nível municipal? A melhoria do ambiente de negócios...",
  resumo_comp:"Como viabilizar projetos de parcerias público privadas em nível municipal? A melhoria do ambiente de negócios dos municípios passa pelo investimento em infraestrutura e maior aproximação com a iniciativa privada.",
  src:"assets/img/carousel-ppp.jpg"
}

var sobral_ce = {
  id: 'sobral_ce',
  nome:"Sobral - CE",
  resumo:"Sobral/CE possui o melhor ensino fundamental (anos iniciais 1º ao 5º ano) do país. Em 2017, o município alcançou a média 9,1 pontos na avaliação do IDEB.",
  resumo_comp:"Sobral/CE possui o melhor ensino fundamental (anos iniciais 1º ao 5º ano) do país. Em 2017, o município alcançou a média 9,1 pontos na avaliação do IDEB. O município apostou na melhoria do seu capital humano com fortalecimento da gestão escolar, da ação pedagógica e da valorização do magistério.",
  src:"assets/img/carousel-sobral-ce.jpg"
}

var participacao_da_sociedade = {
  id: 'participacao_da_sociedade',
  nome:"Participacao da Sociedade",
  resumo:"A administração pública conta com um importante instrumento no processo de elaboração, gestão e avaliação de políticas públicas.",
  resumo_comp:"A administração pública conta com um importante instrumento no processo de elaboração, gestão e avaliação de políticas públicas. Apesar de pouco explorado, a participação da sociedade pode direcionar a gestão na implantação das atividades da vida pública, e coloca o cidadão no centro das decisões estratégicas da gestão pública, além de garantir um sentimento de pertencimento da sociedade com as diretrizes da administração pública.",
  src:"assets/img/carousel-participacao.jpg"
}

var oeiras_pi = {
  id: 'oeiras_pi',
  nome:"Oeiras - PI",
  resumo:"Oeiras, no Piauí, obteve destaque no campo educacional devido a rápida evolução na avaliação do ensino fundamental (anos iniciais 1º ao 5º ano) no IDEB.",
  resumo_comp:"Oeiras, no Piauí, obteve destaque no campo educacional devido a rápida evolução na avaliação do ensino fundamental (anos iniciais 1º ao 5º ano) no IDEB. Em 2013 a nota da cidade foi de 4,1 pontos e em 2017 subiu para 7,1 pontos. Nota-se que a nota de Oeiras está acima da meta nacional para a rede pública em 2021, de 5,8 pontos. A gestão do município apostou no sistema de avaliação, além de criar uma sinergia entre professores, alunos e a comunidade.",
  src:"assets/img/carousel-oeiras-pi.jpg"
}

var sao_paulo_sp = {
  id: 'sao_paulo_sp',
  nome:"São Paulo - SP",
  resumo:"O município de São Paulo possui um processo de abertura de empresas totalmente automatizado.",
  resumo_comp:"O município de São Paulo possui um processo de abertura de empresas totalmente automatizado. Os procedimentos para esse fim podem ser realizados por meio de um sistema online, no caso das empresas que desenvolvem atividades de baixo risco. O tempo médio para abertura de uma empresa saiu de 101 dias para 18 dias.",
  src:"assets/img/carousel-sao-paulo-sp.jpg"
}

var fortaleza_ce = {
  id: 'fortaleza_ce',
  nome:"Fortaleza - CE",
  resumo:"Com a finalidade de desburocratizar os processos pertinentes à abertura de empresas, a cidade de Fortaleza/CE implementou medidas simples.",
  resumo_comp:"Com a finalidade de desburocratizar os processos pertinentes à abertura de empresas, a cidade de Fortaleza/CE implementou medidas simples e que fizeram o município subir 30 posições no quesito tempo de processos, no ranking de cidades empreendedoras da Endeavor, em 2017. Entre as mudanças, a cidade implementou a adoção de alvarás de construção online.",
  src:"assets/img/carousel-fortaleza-ce.jpg"
}

var sao_bernardo_do_campo_sp = {
  id: 'sao_bernardo_do_campo_sp',
  nome:"São Bernardo do Campo - SP",
  resumo:"A cidade da região metropolitana de São Paulo desenvolveu uma aproximação maior com o cidadão.",
  resumo_comp:"A cidade da região metropolitana de São Paulo desenvolveu uma aproximação maior com o cidadão. A gestão municipal oferece mais de 150 serviços digitais, entre alvarás de construção e funcionamento, revisão de IPTU e cadastro de locomoção de balsas. A iniciativa tem por finalidade facilitar a interação com os cidadãos, além da promoção dos serviços públicos.",
  src:"assets/img/carousel-sao-bernardo-do-campo-sp.jpg"
}

var recife_pe = {
  id: 'recife_pe',
  nome:"Recife - PE",
  resumo:"A ação coordenada entre governo, academia e empresas transformou Recife em um hub de inovação.",
  resumo_comp:"A ação coordenada entre governo, academia e empresas transformou Recife em um hub de inovação. O Porto Digital tem uma política de atração de recursos humanos qualificados, além de oferecer isenção fiscal para as empresas que deixam a incubadora.",
  src:"assets/img/carousel-recife-pe.jpg"
}

var caruaru_pe = {
  id: 'caruaru_pe',
  nome:"Caruaru - PE",
  resumo:"O Porto Digital em parceria com o Governo de Pernambuco instalou o “Armazém da Criatividade”, em Caruaru/PE.",
  resumo_comp:"O Porto Digital em parceria com o Governo de Pernambuco instalou o “Armazém da Criatividade”, em Caruaru/PE. A unidade possui infraestrutura necessária para auxiliar empreendedores no desenvolvimento de suas ideias. Em 2016 foi considerado como uma das 10 soluções mais inovadoras do mundo, segundo a IASP (Associação Internacional de Parques Tecnológicos e Áreas de Inovação).",
  src:"assets/img/carousel-caruaru-pe.jpg"
}

var transparencia = {
  id: 'transparencia',
  nome:"Transparência",
  resumo:"Os municípios estão sujeitos a exigência legal de serem transparentes com relação às contas públicas.",
  resumo_comp:"Os municípios estão sujeitos a exigência legal de serem transparentes com relação às contas públicas. Mas para além dessa exigência legal, a gestão municipal cada vez mais transparente, com livre acesso aos processos que norteiam a formulação das políticas públicas, induz a sociedade a ser mais participativa, o que promove o engajamento social local.",
  src:"assets/img/carousel-transparencia.jpg"
}

var consorcios_intermunicipais = {
  id: 'consorcios_intermunicipais',
  nome:"Consórcios Intermunicipais",
  resumo:"Os consórcios entre municípios aparecem como uma alternativa aos gestores públicos para viabilizar projetos com escala produtiva e financeira mais ampla do que um município individual poderia suportar.",
  resumo_comp:"Os consórcios entre municípios aparecem como uma alternativa aos gestores públicos para viabilizar projetos com escala produtiva e financeira mais ampla do que um município individual poderia suportar. Os principais consórcios intermunicipais conhecidos são focados em saneamento, construção de estradas e saúde pública.",
  src:"assets/img/carousel-consorcio.jpg"
}

var regulacao = {
  id: 'regulacao',
  nome:"Regulação",
  resumo:"A prefeitura possui competência para regular serviços de alto impacto na economia e no bem-estar da população.",
  resumo_comp:"A prefeitura possui competência para regular serviços de alto impacto na economia e no bem-estar da população. Uma gestão pública alinhada com boas práticas regulatórias possui a capacidade de estimular um ambiente de negócios mais favorável à atividade econômica.",
  src:"assets/img/carousel-regulacao.jpg"
}

function populaCarousel(session, tema_1, tema_2, tema_3, tema_4, tema_5) {
  
  let elemId;

  //primeira cidade
  document.getElementById("cc-nome-1").innerHTML = tema_1.nome;
  document.getElementById("cc-resumo-1").innerHTML = tema_1.resumo_comp;
  //document.getElementById("cc-resumo-1").dataset.carouselContent = tema_1.resumo_comp;
  document.getElementById("carousel-img-1").style.backgroundImage = "url('"+tema_1.src+"')";
  
  document.getElementById("cc-link-1").classList.remove("linkIsDisabled");

  if((session=== 'ian') && (tema_1.id === 'vitoria_es')) {
    document.getElementById("cc-link-1").href = 'http://www.portaldaindustria-es.com.br/publicacao/315-seguranca-publica-o-que-podemos-aprender-com-vitoria-e-diadema';
  } else if((session=== 'infraestrutura') && (tema_1.id === 'vitoria_es')) {
    document.getElementById("cc-link-1").href = 'http://www.portaldaindustria-es.com.br/publicacao/315-seguranca-publica-o-que-podemos-aprender-com-vitoria-e-diadema';
  } else if((session=== 'potencial de mercado') && (tema_1.id === 'sao_paulo_sp')) {
    document.getElementById("cc-link-1").href = 'http://www.blogdoideies.org.br/mapa-para-simplificacao-endeavor-mostra-o-caminho-para-cidades-mais-inteligentes/';
  } else if((session=== 'gestão fiscal') && (tema_1.id === 'niteroi_rj')) {
    document.getElementById("cc-link-1").href = 'http://www.blogdoideies.org.br/pacto-federativo-e-gestao-fiscal-desafios-dos-municipios-brasileiros/';
  } else {
    document.getElementById("cc-link-1").classList.add("linkIsDisabled");
    document.getElementById("cc-link-1").href = '';
  }
  
  
  elemId = document.getElementsByClassName("desc-1");
  elemId[0].id = tema_1.id;

  //segunda cidade
  document.getElementById("cc-nome-2").innerHTML = tema_2.nome;
  document.getElementById("cc-resumo-2").innerHTML = tema_2.resumo_comp;
  //document.getElementById("cc-resumo-2").dataset.carouselContent = tema_2.resumo_comp;
  document.getElementById("carousel-img-2").style.backgroundImage = "url('"+tema_2.src+"')";

  document.getElementById("cc-link-2").classList.remove("linkIsDisabled");

  if((session === 'infraestrutura') && (tema_2.id === 'cachoeiro_de_itapemirim_es')) {
    document.getElementById("cc-link-2").href = 'http://www.blogdoideies.org.br/universalizacao-do-saneamento-basico-uma-meta-possivel/';
  } else if((session === 'ian') && (tema_2.id === 'cachoeiro_de_itapemirim_es')) {
    document.getElementById("cc-link-2").href = 'http://www.blogdoideies.org.br/universalizacao-do-saneamento-basico-uma-meta-possivel/';
  } else if((session === 'potencial de mercado') && (tema_2.id === 'fortaleza_ce')) {
    document.getElementById("cc-link-2").href = 'http://www.blogdoideies.org.br/mapa-para-simplificacao-endeavor-mostra-o-caminho-para-cidades-mais-inteligentes/';
  } else {
    document.getElementById("cc-link-2").classList.add("linkIsDisabled");
    document.getElementById("cc-link-2").href = '';
  }

  elemId = document.getElementsByClassName("desc-2");
  elemId[0].id = tema_2.id;

  //terceira cidade
  document.getElementById("cc-nome-3").innerHTML = tema_3.nome;
  document.getElementById("cc-resumo-3").innerHTML = tema_3.resumo_comp;
  document.getElementById("carousel-img-3").style.backgroundImage = "url('"+tema_3.src+"')";

  document.getElementById("cc-link-3").classList.remove("linkIsDisabled");

  if((session=== 'capital humano') && (tema_3.id === 'vitoria_es')) {
    document.getElementById("cc-link-3").href = 'http://www.blogdoideies.org.br/educ-infantil-vitoria/';
    document.getElementById("cc-resumo-3").innerHTML = tema_3.resumo_caph;
  } else if((session=== 'gestão fiscal') && (tema_3.id === 'transparencia')) {
    document.getElementById("cc-link-3").href = 'http://www.portaldaindustria-es.com.br/publicacao/334-transparencia-nas-contas-publicas-marco-legal-e-esforcos-para-melhorar-o-acesso-a-informacao';
  } else if((session=== 'potencial de mercado') && (tema_3.id === 'recife_pe')) {
    document.getElementById("cc-link-3").href = 'http://www.blogdoideies.org.br/quem-e-que-faz-uma-cidade-inovadora/';
  } else {
    document.getElementById("cc-link-3").classList.add("linkIsDisabled");
    document.getElementById("cc-link-3").href = '';
  }

  elemId = document.getElementsByClassName("desc-3");
  elemId[0].id = tema_3.id;

  //quarta cidade
  document.getElementById("cc-nome-4").innerHTML = tema_4.nome;
  document.getElementById("cc-resumo-4").innerHTML = tema_4.resumo_comp;
  //document.getElementById("cc-resumo-4").dataset.carouselContent = tema_4.resumo_comp;
  document.getElementById("carousel-img-4").style.backgroundImage = "url('"+tema_4.src+"')";

  document.getElementById("cc-link-4").classList.remove("linkIsDisabled");

  if((session=== 'infraestrutura') && (tema_4.id === 'curvelo_mg')) { 
    document.getElementById("cc-link-4").href = 'http://www.blogdoideies.org.br/mobilidade-urbana-repensar-o-futuro-e-agora/';
  } else if((session=== 'ian') && (tema_4.id === 'juazeiro_do_norte_ce')) { 
    document.getElementById("cc-link-4").href = 'http://www.blogdoideies.org.br/quem-e-que-faz-uma-cidade-inovadora/';
  } else if((session=== 'potencial de mercado') && (tema_4.id === 'caruaru_pe')) { 
    document.getElementById("cc-link-4").href = 'http://www.blogdoideies.org.br/quem-e-que-faz-uma-cidade-inovadora/';
} else {
    document.getElementById("cc-link-4").classList.add("linkIsDisabled");
    document.getElementById("cc-link-4").href = '';
  }

  

  elemId = document.getElementsByClassName("desc-4");
  elemId[0].id = tema_4.id;

  //quinta cidade
  document.getElementById("cc-nome-5").innerHTML = tema_5.nome;
  document.getElementById("cc-resumo-5").innerHTML = tema_5.resumo_comp;
  //document.getElementById("cc-resumo-5").dataset.carouselContent = tema_5.resumo_comp;
  document.getElementById("carousel-img-5").style.backgroundImage = "url('"+tema_5.src+"')";

  document.getElementById("cc-link-5").classList.remove("linkIsDisabled");

  if((session=== 'infraestrutura') && (tema_5.id === 'parcerias_publico_privadas')) { 
    document.getElementById("cc-link-5").href = 'http://www.blogdoideies.org.br/projetos-de-parcerias-publico-privadas-municipal-p1/';
  } else if((session=== 'ian') && (tema_5.id === 'cachoeiro_de_itapemirim_es')) {
    document.getElementById("cc-link-5").href = 'http://www.blogdoideies.org.br/universalizacao-do-saneamento-basico-uma-meta-possivel/';
  } else if((session=== 'potencial de mercado') && (tema_5.id === 'juazeiro_do_norte_ce')) { 
    document.getElementById("cc-link-5").href = 'http://www.blogdoideies.org.br/quem-e-que-faz-uma-cidade-inovadora/';
  } else {
    document.getElementById("cc-link-5").classList.add("linkIsDisabled");
    document.getElementById("cc-link-5").href = '';
  }

  elemId = document.getElementsByClassName("desc-5");
  elemId[0].id = tema_5.id;
  
}

function active_custom_carousel_1(cidade_num) {
  var getClassCarousel = document.getElementsByClassName("carousel-"+cidade_num+"-boas-praticas");
  if (cidades_carrosel.includes(cidade_num) == false) { //cidade nao esta no array
    cidades_carrosel.push(cidade_num);
    $(getClassCarousel).height(515);
  } else {                                          //cidade esta no array
    for (let i = 0; i < 4; i++) {                   //busca a cidade no array
      if (cidades_carrosel[i] === cidade_num) {         //encontrou a cidade no array
        cidades_carrosel.splice(i, 1);              //remove cidade do array
        $(getClassCarousel).height(375);
      }
    }
  }
}
/* fim exibição carrosel dos temas # eric */
