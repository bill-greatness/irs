import _ from 'lodash'
import { useEffect, useState } from "react";
import { getDocuments } from "../firebase/firestore";
import { useOutletContext } from "react-router-dom";

export default function History() {
  const [queries, setQueries] = useState([]);
  const [searchText, setSearchText] = useState('')

  const {user} = useOutletContext()

  useEffect(() => {
    getDocuments({
      path: "/queries",
      getData: setQueries,
    });
  }, []);


  const filterQuery = () => {
    // query to be deleted...
    if (searchText) {
      return _.filter(queries, (query) =>
        query.message.toLowerCase().includes(searchText.toLowerCase()) || query.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }


    // filter by current admin...
    if (user?.role === "Admin"){
      return queries
    }


    // filter by department...
    if (user?.role === "Department"){
      return _.filter(queries, (query) => query.department === user?.department)
    }


    // filter by attendedToBy..
    // filter by department and attendedToBy...

    if (user?.role !== "Admin"){
      return _.filter(queries, (query) => query.department === user?.department)
    }



    return queries
  };

  const findStatus = (status) => {
    if (status === "completed"){
      return 'bg-green-400/50'
    }
    if(status === 'open'){
      return 'bg-blue-400/50'
    }
    if (status === 'ignored'){
      return 'bg-orange-500/50'
    }
    return 'bg-red-500/100 text-white'
  }

  return (
    <div className="flex flex-col p-10">
      <div className="w-full mb-5">
        <div className='mb-3'>
          <h1 className='font-bold text-2xl'>All Query History</h1>
          <p className='text-base'>Search with message or status</p>
        </div>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          className="p-3 rounded bg-gray-500 text-white w-full"
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
        <tbody >
          {filterQuery()?.map((q, idx) => (
            <tr className={`border-b text-md my-1 ${findStatus(q.status)}`} key={q.id}>
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
