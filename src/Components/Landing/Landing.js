import React from "react";
import Clock from 'react-live-clock';
import useTitle from "../../Hooks/useTitle";
import ManageTask from "../ManageTask/ManageTask";

const Home = () => {
  useTitle("Home");


  return (
    <>
      <div className="body-font bg-base-100 py-0 lg:py-12">
        <div className="container mx-auto flex px-5 pt-28 lg:pt-28 items-center justify-center flex-col">
          {/* <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded-2xl"
            alt="todo"
            src="https://k-task-todo.web.app/static/media/todo.a960c118a13331c16f31.jpg"
          /> */}
          <div className="text-center lg:w-2/3 w-full">
            <div className="container mx-auto flex px-5 pt-12 items-center justify-center flex-col">

              <div className="text-center lg:w-2/3 w-full">
                <div className="container">
                  <h1 className="text-center font-bold font-mono text-xl" id="heading">Seems it's 🤗
                    <span>
                      <Clock
                        className="pl-4 font-mono"
                        format={'h:mm:ssa'}
                        style={{ fontSize: '1.5em' }}
                        ticking={true} />
                    </span>
                  </h1>
                </div>
                <h2 className="text-center font-mono">Make Your Plan And Add Some To-Do's Now!</h2>
              </div>
              <p className="mt-4">
                Task Management Application is a kind of app that generally used to maintain
                our day-to-day tasks or list everything that we have to do, with
                the most important tasks at the top of the list, and the least
                important tasks at the bottom. It is helpful in planning our
                daily schedules.
              </p>
              <ManageTask />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;