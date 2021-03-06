import Link from "next/link";

export default function ClientsPage() {
  const clients = [
    { id: "max", name: "Maximilian" },
    { id: "manu", name: "Manuel" }
  ];

  return (
    <div>
      <h1>ClientPage</h1>
      <ul>
        {clients.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/clients/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
