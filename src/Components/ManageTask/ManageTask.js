import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import useTitle from "../../Hooks/useTitle";
import Loader from "../../Components/General/Spinner/Spinner";
import auth from "../../firebase.init";
import TaskList from "./TaskList";
import { MdAddCircleOutline } from "react-icons/md";



const ManageTask = () => {
  useTitle("Manage Tasks");
  const [modalTask, setModalTask] = useState({});
  const [user] = useAuthState(auth);
  const {
    data: tasksData,
    isLoading,
    refetch,
  } = useQuery("tasks", () =>
    fetch(`https://crave-tasks.herokuapp.com/myTasks?email=${auth?.currentUser?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const handleToCreateTasks = (e) => {
    e.preventDefault();
    const createTask = {
      email: user?.email,
      title: e.target.title.value,
      description: e.target.description.value,
      createdAt:
        new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      addedBy: {
        name: auth?.currentUser?.displayName,
        uid: auth?.currentUser?.uid,
        email: auth?.currentUser?.email,
      },
    };
    fetch(`https://crave-tasks.herokuapp.com/createTask?uid=${auth?.currentUser?.uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(createTask),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          refetch();
          e.target.reset();
        }
      });
  };

  // submit form with enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleToCreateTasks(e);
    }
  };

  const [titleField, setTitleField] = useState("");
  const [descriptionField, setDescriptionField] = useState("");

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    await fetch(`https://crave-tasks.herokuapp.com/task/updateTask/${modalTask._id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: titleField || modalTask?.title,
        description: descriptionField || modalTask?.description,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          toast.success(`Task updated successfully`);
          setModalTask(null);
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="bg-base-100 h-screen">
      <div className="bg-base-100 py-12 mt-16 lg:pt-24">
        <div className="card-actions justify-center">
          {tasksData?.length > 0 && (
            <label
              htmlFor="tasksModal"
              className="btn btn-md btn-primary text-white uppercase"
            >
              <MdAddCircleOutline className="mr-1 text-lg" /> Add Tasks
            </label>
          )}
        </div>
        <form
          onSubmit={handleToCreateTasks}
          onKeyPress={handleKeyPress}
          className="grid grid-cols-1 gap-3 justify-items-center mt-2"
        >
          <input type="checkbox" id="tasksModal" className="modal-toggle" />
          <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box text-center">
              <label
                htmlFor="tasksModal"
                className="btn btn-sm btn-circle absolute right-2 top-2 text-white"
              >
                ✕
              </label>
              <h3 className="font-semibold text-xl mb-6">
                Input Your Task Details
              </h3>

              <input
                type="text"
                name="title"
                className="input input-bordered w-full max-w-sm mb-5"
                placeholder="Title"
                required
              />
              <textarea
                type="text"
                name="description"
                className="input input-bordered w-full max-w-sm"
                placeholder="Description"
                style={{ resize: "none", height: "10rem" }}
                required
              />
              <input
                type="submit"
                value="Add Task"
                className="btn btn-md mt-3 text-white"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="container w-full mx-auto">
        <div className="overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : tasksData?.length > 0 ? (
            <>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Complete</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Full Details</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksData?.map((task, ind) => (
                    <TaskList
                      key={task._id}
                      {...task}
                      serialize={ind}
                      refetch={refetch}
                      setModalProduct={setModalTask}
                    />
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div>
              <div className="flex justify-center items-center mx-auto pb-7">
                <label
                  htmlFor="tasksModal"
                  className="btn btn-md btn-primary text-white uppercase"
                >
                  <MdAddCircleOutline className="mr-1 text-lg" /> Add New Tasks
                </label>
              </div>
              <tr className="flex items-center justify-center mx-auto rounded">
                <td>
                  <div className="alert alert-warning shadow-lg" role="alert">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span>You don't have any task in your list</span>
                    </div>
                  </div>
                </td>
              </tr>
            </div>
          )}
        </div>
        {modalTask && (
          <>
            <input type="checkbox" id="updateModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box relative">
                <label
                  htmlFor="updateModal"
                  className="btn btn-sm btn-circle absolute right-2 top-2 text-white"
                >
                  ✕
                </label>
                <p className="font-semibold">
                  Update Your Task Details From Here
                </p>
                <form onSubmit={handleUpdateTask} action="" className="my-2">
                  <div className="my-4">
                    <label htmlFor="stock">Title</label>
                    <input
                      type="text"
                      placeholder="Put Your Product Name"
                      className="input input-bordered w-full my-3"
                      value={titleField || modalTask?.title}
                      onChange={(event) => setTitleField(event.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="stock">Description</label>
                    <textarea
                      type="text"
                      value={descriptionField || modalTask?.description}
                      className="input input-bordered w-full my-3"
                      placeholder="Description"
                      style={{ resize: "none", height: "8rem" }}
                      onChange={(event) =>
                        setDescriptionField(event.target.value)
                      }
                    />
                  </div>
                  <div className="text-right">
                    <button className="btn text-white">Update Task</button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
        {modalTask && (
          <>
            <input type="checkbox" id="detailsModal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box relative overflow-x-hidden">
                <label
                  htmlFor="detailsModal"
                  className="btn btn-sm btn-circle absolute right-2 top-2 text-white"
                >
                  ✕
                </label>
                <div className="my-4">
                  <p className="text-2xl text-center">{modalTask?.title}</p>
                </div>
                <div className="my-4 p-4">
                  <p className="text-center">{modalTask?.description}</p>
                </div>
                <div className="card-actions justify-end">
                  Added By -{" "}
                  <div className="badge badge-outline badge-success">
                    {modalTask?.addedBy?.name}
                  </div>
                </div>
                <div className="card-actions justify-end mt-2">
                  Added On -{" "}
                  <div className="badge badge-outline badge-neutral">
                    {modalTask?.createdAt}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ManageTask;