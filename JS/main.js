const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []              // array criada //getItam vai consutar o lstorg 
//                                                             //JSON.parse()vai tranform de string para o javascpt construind um valor ou um obj


itens.forEach( (elemento) => {                                // forEach vai fazer um loop na array
    criaElemento(elemento)                                    // chamei a função criar elemento toda vez que carrego a página

} )


form.addEventListener("submit", (evento) => {                  // adicionar evento 
    evento.preventDefault()                                    // prevenir o evento ===> interronpeu o envio do formulario

    const nome = evento.target.elements['nome']                // array posiçao [0] ====> melhor forma é buscar por elements(objeto) ['nome']
    const quantidade = evento.target.elements['quantidade']    //  array posiçao [1] ====> melhor forma é buscar por elements(objeto) ['quantidade']
    
    const existe = itens.find( elemento => elemento.nome === nome.value) // find vai  busrcar no array itens o elemento nome e vai definir o element
    console.log(existe) //                                               // se ja existe ou não.... se ele nao existe vai dá andefine
    
    const itemAtual = {                                         // vai transformar em um objeto. e vai mandar apenas uma informaçao
        "nome": nome.value,
        "quantidade": quantidade.value
   }

    if (existe) {                                             // se "existe" for diferente de andefine. vai ficar o mesmo
        itemAtual.id = existe.id                              // id elemento de controle para a busca
        console.log(existe.id)

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual // Atualizando meu local storage

    } else{                                                   // senão... se ele não existe eu vou cria esse elemento e                                       
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0;    // o id atual vai ser do tamanho do meu array (length)

        criaElemento(itemAtual)

        itens.push(itemAtual)                                       //uma array foi criada para NÃO sobrescrever o item anterior
    //                                                          // push vai inserir um elemento nesse array
    }

    localStorage.setItem("itens", JSON.stringify(itens))         // JSON.stringify() vai transformar o elemento em uma string

    nome.value = ""
    quantidade.value = ""

})

function criaElemento(item) {
    //                                                           <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li')               // cria um elemento
    novoItem.classList.add("item")                              // adiciona uma classe 

    const numeroItem = document.createElement('strong')         // cria um elemento
    numeroItem.innerHTML = item.quantidade                      // vai receber o valor de 'quantidade' dentro de numeroItem
    // acessei o objeto item na posição quantidade
    numeroItem.dataset.id = item.id                             // coloquei um atributo daset no meu strong.
    // o item tem que ter uma propriedade id
    novoItem.appendChild(numeroItem)                            // appendChild vai inserir um elemento criado dentro do outro
    novoItem.innerHTML += item.nome                             // vai receber 'nome' dentro de novoItem
    // acessei o objeto item na posição nome
    
    novoItem.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novoItem)                                 // appendChild vai inserir um elemento criado dentro do outro

    /*localStorage.setItem("nome", nome)                        // vai registrar no localStorage/ setItem vei inserir / é passado ("chave", 'valor')
    localStorage.setItem("quantidade", quantidade)*/

   
}
function atualizaElemento(item) {
   document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade 
   // vai encontrar o strong para atualiza-lo 
}

function botaoDeleta(id) {                                  // criei a funcionalidade
   const elementobotao = document.createElement("button")  // criei um elemento botao
   elementobotao.innerText = "X"                          // adicinei a letra x nesso botao 

   elementobotao.addEventListener("click", function() {   // evento de click
    deletaElemento(this.parentNode, id)                       // selecionein o elemento pelo this que era o elemento PAI(parantnode)
   })

   return elementobotao                                   // retornei 
}

function deletaElemento(tag, id) {                           // funcionalidade para deletar o elemento 
    tag.remove()                                         // vai remover
    console.log(id)
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)  // splice() remove um elmento da array ou se precsr inserir
    console.log(itens)                                                // findIndex vai procurar o item no meu array
    localStorage.setItem("itens", JSON.stringify(itens))              // vai escrever no localstorage
}
