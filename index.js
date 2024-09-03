import express from "express";

const app = express()
const port = 3000
let comments = [
    {
      id: 1,
      name: "Alice",
      comment: "This is a great article!",
      date: "2024-09-01"
    },
    {
      id: 2, 
      name: "Bob",
      comment: "I found this information very helpful.",
      date: "2024-09-02"
    },
    {
      id: 3,
      name: "Charlie",
      comment: "Can you explain more about this topic?",
      date: "2024-09-02"
    },
    {
      id: 4, 
      name: "Diana",
      comment: "Interesting point of view!",
      date: "2024-09-01"
    },
    {
      id: 5,
      name: "Evan",
      comment: "I disagree with some of the points made.",
      date: "2024-09-03"
    },
  ];
let nextId = 5
  
app.use(express.json())

app.get('/', (request, response) => {
    response.status(200).json(comments)
})

app.post('/', (request, response) =>{
    const data = request.body
    nextId++
    data.id = nextId
    comments.push(data)
    response.status(201).json("Comentário cadastrado com sucesso!")
                  
})

app.delete('/:id', (request, response) =>{
    const commentId = parseInt(request.params.id)
    comments = comments.filter(comment => comment.id != commentId) // aqui ele está filtrando os comentários que não possuem o id digitado no request.params.id, criando assim um novo array sem esse comentário
    response.status(201).json("Deletado com sucesso!")
})

app.put('/:id', (request, response) =>{
    response.send("Comentário atualizado com sucesso!")
})


app.listen(port, () => {
    console.log(`Oi!!!!`)
})