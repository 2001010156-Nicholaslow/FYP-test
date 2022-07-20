import { useParams } from "react-router-dom";

function User() {
  let { userId } = useParams();
  console.log(userId);
  //let params=useParams().userId
  return (
    <div className="App">
      <h1>User {userId}</h1>
    </div>
  );
}

export default User;
