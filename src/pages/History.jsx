import _ from 'lodash'
import { useEffect, useState } from "react";
import { getDocuments } from "../firebase/firestore";
import { useOutletContext } from "react-router-dom";

export default function History() {
  const [queries, setQueries] = useState([]);

  const {user} = useOutletContext()

  useEffect(() => {
    getDocuments({
      path: "/queries",
      getData: setQueries,
    });
  }, []);


  const filterQuery = () => {
    // query to be deleted...
    if (user?.role !== "Admin"){
      return _.filter(queries, (query) => query.department === user?.department)
    }

    return queries
  };

  return (
    <div className="flex flex-col p-10">
      <div className="w-full mb-5">
        <input
          className="p-3 rounded bg-gray-300 text-white w-full"
          type="search"
          name="search"
          id="search"
          placeholder="Search for Query..."
        />
      </div>
      <table className="w-full table-auto">
        <thead className="bg-black ">
          <tr className="text-gray-100">
            <th className="p-3 text-left">Query ID</th>
            <th className="p-3 text-left">Student ID</th>
            <th className="p-3 text-left">Message</th>
            <th className="p-3 text-left">Date Submitted</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filterQuery()?.map((q, idx) => (
            <tr className="border-b text-md" key={q.id}>
              <td className="p-3">#{idx + 1}</td>
              <td className="p-3">{q.name}</td>
              <td className="p-3">{q.message?.trim(0,30)}</td>
              <td className="p-3">{q.date}</td>
              <td className="p-3">{q.status} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
