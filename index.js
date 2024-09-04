import express from "express";
import database from "./src/database/database.js"
import "./src/database/tables/comments.js"

const app = express()
const port = 3000
  
app.use(express.json())

app.get('/', (request, response) => {
    const query = "SELECT * FROM comments ORDER BY date DESC"
    database.all(query, [], (error, rows) => {
      if (error) {
        return response.status(500).json("Houve um erro ao listar os comentários!", error.message)
      }
      return response.status(200).json(rows)
    })
})

app.post('/', (request, response) =>{
    const { name, comment, date } = request.body
    if (comment.length < 10 || comment.length > 145) {
      return response.status(400).json("Comentário precisa ter pelo menos 10 caracteres e menor que 145 caracteres!")
    }
    const query = "INSERT INTO comments (name, comment, date) VALUES (?, ?, ?)" // ?: name, ?: comment, ?: date
    database.run(query, [name, comment, date], (error) => {
      if (error) {
        return response.status(500).json("Houve um erro ao cadastrar o comentário!", error.message)
      }
      return response.status(201).json("Comentário cadastrado com sucesso!")
    })
                  
})

app.delete('/:id', (request, response) =>{
    const commentId = parseInt(request.params.id)
    const query = "DELETE FROM comments WHERE id = ?"
    database.run(query, [commentId], (error) => {
      console.log(error, commentId)
      if (error) {
        return response.status(500).json("Houve um erro ao deletar o comentário!", error.message)
      }
      return response.status(201).json("Deletado com sucesso!")
    })
})

app.put('/:id', (request, response) =>{
    const commentId = parseInt(request.params.id)
    const {name, comment, date} = request.body // destruct só funciona em objetos
    if (comment.length < 10 || comment.length > 145) {
      return response.status(400).json("Comentário precisa ter pelo menos 10 caracteres e menor que 145 caracteres!")
    }
    const query = "UPDATE comments SET name = ?, comment = ?, date = ? WHERE id = ?"
    database.run(query, [name, comment, date, commentId], (error) => {
      if (error) {
        return response.status(500).json("Houve um erro ao atualizar o comentário!", error.message)
      }
      return response.status(201).json("Comentário atualizado com sucesso!")
    })
   
})


app.listen(port, () => {
    console.log(`Oi!!!!`)
})