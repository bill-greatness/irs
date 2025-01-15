import { useState, useEffect } from "react";
import { Card } from "../components/Cards";
import _ from "lodash";
import search from "../assets/search.png";
import ResponseCard from "../components/ResponseCard";
import { getDocuments } from "../firebase/firestore";
import { useOutletContext } from "react-router-dom";
import { COLORS } from "../assets/data";

export default function Dashboard() {
  const [queries, setQueries] = useState([]);
  const [query, setQuery] = useState({ open: false });
  let {user} = useOutletContext()

  useEffect(() => {
    // make a request to get all queries.
    getDocuments({
      path:"queries", 
      getData: setQueries
    })
  }, []);



const queriedStatus = () => {
    // get filtered by current admin...
    let target = user?.role !== "Admin" ? _.filter(queries, q => q.department === user.department) : queries
    let grouped = _.groupBy(target, qr => qr.queryType)
    let results = []
    Object.entries(grouped).forEach(([key, value]) => {
        results.push({
            description:key,
            number: value.length, 
            data: value
        })
    })

    
    return results;
}


   const rq = user?.role !== "Admin" ? _.filter(queries, q => q.department === user.department) : queries
    

  return (
    <div className="flex-1 mx-2">
      <div className="w-full flex gap-3  p-3">
        {queriedStatus().map((info, idx) => (
          <Card key={idx + 1} description={info.description} number={info.number} background={COLORS[idx]}/>
        ))}
      </div>

      <div className="flex flex-1 gap-3 h-[90vh]">
        <div className="w-4/6 border-x flex flex-col  p-3">
          {/* Recent updates... */}
          <h3 className="font-bold text-2xl py-3 leading-relaxed">
            Recent Incidents...
          </h3>
          <table className="w-full table-auto">
            <thead className="bg-gray-400">
              <tr className="text-left text-white border-y">
                <th className="p-3">#</th>
                <th className="p-3">Message</th>
                <th className="p-3">Type</th>
                <th className="p-3">Student</th>
              </tr>
            </thead>
            <tbody>
              {rq.map((r, idx) => (
                <tr
                key={idx}
                onClick={() => setQuery({ open: true, ...r })}
                className="text-left cursor-pointer border-b border-b-gray-200"
              >
                <td className="p-3">#{idx + 1}</td>
                <td className="p-3">{r.message?.trim(0, 50)}</td>
                <td className="p-3">{r.queryType}</td>
                <td className="p-3">{r.name}</td>
              </tr>
              ))}
              
            </tbody>
          </table>
        </div>

        {!query.open && (
          <div className="flex-1 flex border-l flex-col items-center justify-center">
            <img src={search} alt="search" className="w-28 object-contain"/>
            <div className="text-center">
              <h3 className="text-xl font-normal text-red-800">No Query selected!</h3>
              <p>Select query to see details...</p>
            </div>
          </div>
        )}

        {query.open && <ResponseCard query={query}  user={user}/>}
      </div>
    </div>
  );
}
