//importando biblioteca
const http = require('http')
const queryString = require('query-string')
const url = require('url')
const fs = require('fs')

// Definição de endereço / URL
const hostname = '127.0.0.1' //localhost
const port = 3000

// implementação da regra de negócio

const server = http.createServer((req, res) => {
  var resposta
  const urlparse = url.parse(req.url, true)
  //criar usuario / atualizar usuario
  //receber informacoes dos usuarios
  const params = queryString.parse(url.parse(urlparse).search)

  if (urlparse.pathname == '/criar-atualizar-usuario') {
    //salvar as informacoes
    fs.writeFile(
      'users/' + params.id + '.txt',
      JSON.stringify(params),
      function (err) {
        if (err) throw err
        console.log('Saved!')

        resposta = 'Usuario criado e atualizado com sucesso!'

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(resposta)
      }
    )

    resposta = 'Usuario criado com sucesso!'

    //buscar usuario pelo id
  } else if (urlparse.pathname == '/selecionar-usuario') {
    fs.readFile('users/' + params.id + '.txt', function (err, data) {
      resposta = data

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(resposta)
    })
  }

  //remover usuario
  else if (urlparse.pathname == '/remover-usuario') {
    fs.unlink('users/' + params.id + '.txt', function (err) {
      console.log('Removido com sucesso!')

      resposta = err
        ? 'Usuario nao encontrado.'
        : 'Usuario removido com sucesso!'

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end(resposta)
    })
  }
})

// execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

//127.0.0.1:3000/?nome=mari&idade=35&id=1
//3000/criar-atualizar-usuario?nome=mari&idade=35&id=1
//3000/selecionar-usuario?id=1
//3000/remover-usuario?id=1
