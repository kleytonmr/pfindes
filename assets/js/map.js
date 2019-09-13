
// $(document).ready(function(){
//   $(".cc-select-municipio").on('change', function () {
//     $(".cc-select-municipio").val(this.value);
//   });

//   getData(municipios);
//   getData(clicked);
//   getData(selected);
// });

// function getData (callback) {
//   $.ajax({
//     url: "https://raw.githubusercontent.com/kleytonmr/ES-municipios/master/munic/banco.min.json?token=AHNGKJ76U73FCUWASQXOPAK5DHRMY",
//     dataType: "json",
//     success: callback(data)
//   });
// }

// function municipios(data){
//   $(data).each(function(index, value){
//     $('.cc-select-municipio').each(function() {
//       this.append('<option/>', value.key,  value.munic);
//     })
//   });
// }

// function selected(data){
//   var selectedValueRadio = "cluster";
//   $("#radio").on('change', function () {
//     selectedValueRadio = $("input[name='options']:checked").val();
//     $('#list-munic option:first').prop('selected', true);
//     for (var i in data){
//       $("#" + data[i].key).css("fill", "#e7e8ea");
//       $("#agrupamentos").find('li').remove()
//     }
//     console.log(selectedValueRadio);
//   });

//   $('#list-munic').on('change', function(event) {
//     event.stopPropagation();
//     var selectGroup = false;
//     var munic_current = $( "#list-munic option:selected" ).val()

//     for (var i in data){
//       $("#" + data[i].key).css("fill", "#e7e8ea");
//       $("#agrupamentos").find('li').remove()
//     }

//     for (var i in data){
//       if (data[i].key == munic_current) {
//         if(selectedValueRadio == "cluster"){
//           for (var j in data){
//             if (data[i].cluster == data[j].cluster) {
//               $("#" + data[j].key).css("fill", "#a1a1a1");
//               $("#" + munic_current).css("fill", "#ffba5a");
//               $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
//             }
//           }
//         } else if(selectedValueRadio == "regional"){
//           for (var j in data){
//             if (data[i].regional == data[j].regional) {
//               $("#" + data[j].key).css("fill", "#2d3091");
//               $("#" + munic_current).css("fill", "#ffba5a");
//               $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
//             }
//           }
//         } else if(selectedValueRadio == "estadual"){
//           for (var j in data){
//             $("#" + data[j].key).css("fill", "#a1a1a1");
//             $("#" + munic_current).css("fill", "#ffba5a");
//           }
//         } else{
//           // alert("Escolha um grupo primeiro!")
//           selectGroup = true;
//         }
//       }
//     }

//     // if (selectGroup) {
//     //   alert("Escolha um grupo primeiro!")
//     // }
//   });
// }

// function clicked(data){
//   var selectedValueRadio = "cluster";
//   $("#radio").on('change', function () {
//     selectedValueRadio = $("input[name='options']:checked").val();
//     $('#list-munic option:first').prop('selected', true);
//     for (var i in data){
//       $("#" + data[i].key).css("fill", "#e7e8ea");
//       $("#agrupamentos").find('li').remove()
//     }
//     console.log(selectedValueRadio);
//   });

//   $('g').on('click', function(event) {
//     event.preventDefault()
//     event.stopPropagation();

//     var selectGroup = false;
//     var munic_current = $(this).attr("id")
//     $("#list-munic").val($(this).attr("id")).change();
//     console.log(munic_current)

//     for (var i in data){
//       $("#" + data[i].key).css("fill", "#e7e8ea");
//       $("#agrupamentos").find('li').remove()
//     }

//     for (var i in data){
//       if (data[i].key == munic_current) {
//         if(selectedValueRadio == "cluster"){
//           for (var j in data){
//             if (data[i].cluster == data[j].cluster) {
//               $("#" + data[j].key).css("fill", "#a1a1a1");
//               $("#" + munic_current).css("fill", "#ffba5a");
//               $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].cluster+ "</li>");
//             }
//           }
//         }else if(selectedValueRadio == "regional"){
//           for (var j in data){
//             if (data[i].regional == data[j].regional) {
//               $("#" + data[j].key).css("fill", "#2d3091");
//               $("#" + munic_current).css("fill", "#ffba5a");
//               $("#agrupamentos").append("<li>" + data[j].munic +": "+ data[j].regional+ "</li>");
//             }
//           }
//         }else if(selectedValueRadio == "estadual"){
//           for (var j in data){
//             $("#" + data[j].key).css("fill", "#a1a1a1");
//             $("#" + munic_current).css("fill", "#ffba5a");
//           }
//         }else{
//           // alert("Escolha um grupo primeiro!")
//           selectGroup = true;
//         }
//       }
//     }
//   });
// }







