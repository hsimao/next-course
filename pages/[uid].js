export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;
  console.log("server side user", userId);

  return {
    props: { id: `userid-${userId}` }
  };
}

export default function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}
