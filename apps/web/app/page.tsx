import { prisma } from "@repo/db/client";

export default async function Home() {
  const todo = await prisma.user.findMany();
  console.log(todo);
  return (
    <div>
      <h1>Todos</h1>
      {todo.map((todo) => (
        <h3 key={todo.id}>todo</h3>
      ))}
    </div>
  );
}
export const revalidate = 60;
