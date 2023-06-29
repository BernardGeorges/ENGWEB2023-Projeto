
function showContent(tipo,data,week,type){
    event.stopPropagation();
    var ficheiro1=`
    <div class="w3-margin w3-padding-large w3-white">
    <h2 class="w3-center">Preencha o Formulário</h2>

    <form class="w3-container" method="POST" action="/add/form">
      <input type="hidden" name="tipo" value="${type}">
      <div class="w3-row w3-section">
        <label class="w3-col input-label" for="preco">Preco:</label>
        <input class="w3-col" type="number" id="preco" name="preco">
      </div>

      <div class="w3-row w3-section">
        <label class="w3-col input-label" for="marca">Marca:</label>
        <input class="w3-col" type="text" id="marca" name="marca">
      </div>

      <div class="w3-row w3-section">
        <label class="w3-col input-label" for="tipo">Tipo:</label>
        <input class="w3-col" type="text" id="tipo" name="tipo">
      </div>
        <div class="w3-center w3-margin-top">
          <button class="w3-button w3-black" type="submit">Submit</button>
        </div>
      </form>
      </div>
      `
    $("#display").empty()
    $("#display").append(ficheiro1)
    $("#display").modal() 
}