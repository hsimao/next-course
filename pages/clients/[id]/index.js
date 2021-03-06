import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();

  function handleLoadProject() {
    router.push(`/clients/${router.query.id}/project`);
  }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={handleLoadProject}>Load Project A</button>
    </div>
  );
}
