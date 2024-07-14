import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./features/counter/counterSlice";
import {
  useUsersQuery,
  useUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "./services/userApi";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching, isSuccess } = useUsersQuery();

  console.log("users", data);

  return (
    <div className="rtk_wrapper">
      <header className="App-header">
        <div>
          <p>Count: {count}</p>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
        <div>
          <h1>RTK Query tuitorial</h1>
          {isLoading && <p>...loading</p>}
          {isFetching && <p>...fetching</p>}
          {error && <p>Something went wrong</p>}
          {data && (
            <div>
              {data.map((user) => {
                return (
                  <div key={user.id}>
                    <h3>{user.name.toUpperCase()}</h3>{" "}
                    <UserEmail id={user.id} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <AddUser />
        </div>
      </header>
    </div>
  );
}

const UserEmail = ({ id }) => {
  const { data } = useUserQuery(id);
  console.log("email_data", data);
  return <p>{data?.email}</p>;
};

const AddUser = () => {
  const [addUser] = useAddUserMutation();
  // const { refetch } = useUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const newUser = {
    name: "Balaram Das",
    email: "balia@gmail.com",
    id: "8",
  };

  const updatedUser = {
    name: "Balia Das",
    email: "balia@gmail.com",
    id: "8",
  };

  const addHandler = async () => {
    await addUser(newUser);
  };

  const updateHandler = async () => {
    await updateUser(updatedUser);
  };

  const deleteHandler = async (id) => {
    await deleteUser(id);
  };

  return (
    <>
      <button onClick={addHandler}>Add User</button>
      <button onClick={updateHandler}>Update User</button>
      <button onClick={() => deleteHandler("2")}>Delete User</button>
    </>
  );
};

export default App;
