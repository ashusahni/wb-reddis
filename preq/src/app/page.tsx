import { todo } from "node:test"


export default async function Home(params:any) {
  const response = await fetch("https://dummyjson.com/todos")
  const data = await response.json()
  return(
    <div>
      {data.todos.map((todo:any)=> <div>
        {todo.id}
      </div> )}
    </div>
  )
}