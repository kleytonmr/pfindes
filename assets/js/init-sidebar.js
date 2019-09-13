$(document).ready(function() {
  var sidebar = document.getElementById('sidebar');
  window.stickySidebar = new StickySidebar(sidebar, {
    topSpacing: 0,
    bottomSpacing: 0
  });
});
