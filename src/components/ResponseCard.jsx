/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { deleteDocument, updateDocument } from "../firebase/firestore";
import { GoTrash } from "react-icons/go";

export default function ResponseCard({ query, user }) {
  const [info, setInfo] = useState(query);

  useEffect(() => {
    setInfo(query);
  }, [query]);

  const updateQuery = (e) => {
    e.preventDefault();

    let data = {
      ...info,
      attendedToBy: user?.name,
    };

    updateDocument({
      path: "/queries",
      id: data.id,
      data: data,
    })
      .then(() => {
        alert("Query successfully updated");
        setInfo({ response: "" });
      })
      .catch((e) => alert(e.message));
  };
  return (
    <div className="w-2/6  p-3">
      <div className="flex flex-col">
        {/* text-description here... */}
        <div className="flex flex-col">
          <div className="flex justify-between p-2 items-center">
            <h3 className="text-xl py-2 font-bold">Message...</h3>
            {/* Delete Button */}
            <button
              className="bg-black p-2 rounded-full"
              onClick={() =>
                deleteDocument({
                  path: "/queries",
                  id: info.id,
                })
              }
            >
              <GoTrash size={20} color="white" />
            </button>
          </div>
          <p className="font-normal py-4">{info?.message}</p>
          {/* Media */}
          {info.media?.length > 0 && (
            <div className="flex gap-3 my-4 h-32 items-center flex-nowrap overflow-x-auto">
              {info.media?.map((url) => (
                <img
                  key={url}
                  src={url}
                  className="w-28 object-cover shrink-0 h-28 bg-black"
                />
              ))}
            </div>
          )}
        </div>

        <form action="#" onSubmit={updateQuery}>
          <div className="flex flex-col">
            <textarea
              onChange={(e) => setInfo({ ...info, response: e.target.value })}
              className="p-3 resize-none outline-none border bg-gray-200"
              rows={5}
              value={info?.response}
              placeholder="Type response message here..."
              name="response"
              id="response"
            ></textarea>
          </div>
          {/* Status buttons */}

          <p className="py-2 text-sm">Choose Status</p>
          <div className="flex gap-3 my-3">
            <button
              type="button"
              value={"completed"}
              onClick={(e) => setInfo({ ...info, status: e.target.value })}
              className="w-full text-sm  p-2 bg-green-200 text-gray-700"
            >
              Completed
            </button>

            <button
              type="button"
              value={"forwarded"}
              onClick={(e) => setInfo({ ...info, status: e.target.value })}
              className="w-full p-2 text-sm bg-teal-500 text-white"
            >
              Forwarded
            </button>
            <button
              type="button"
              value={"closed"}
              onClick={(e) => setInfo({ ...info, status: e.target.value })}
              className="w-full p-2 text-sm bg-red-500 text-white"
            >
              Closed
            </button>
            <button
              type="button"
              value={"ignored"}
              onClick={(e) => setInfo({ ...info, status: e.target.value })}
              className="w-full p-2 text-sm bg-red-800 text-white"
            >
              Ignored
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-3 py-2 bg-blue-500 text-white"
          >
            Submit Response
          </button>
        </form>
      </div>
    </div>
  );
}
