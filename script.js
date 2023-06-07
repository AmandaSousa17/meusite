const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

//a variavel 'itens' vai armazenar os itens do banco
//a variavel 'id' vai armazenar o index para que possa editar.
let itens
let id

//funçao para abrir a modal
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }
  //quando for um item de ediçao
  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
    //caso nao for uma ediçao, ele vai carregar com os itens em branco
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
  
}
//funçao de editar
function editItem(index) {

  openModal(true, index)
}
//funçao de deletar
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  //conforme cada item for carregado no 'insertItem' para dentro do body e vai ser apresentado em tela.
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  //se algum campo ainda estiver vazio ele ira pedir para preencher
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

//essa função sera executada assim que a tela for aberta
// a 'loadItens' vai pegar os dados do banco 
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

//essas funções vão pegar os itens do banco atraves do 'getItem'. E se caso não tiver, nada ficar vazio.
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()