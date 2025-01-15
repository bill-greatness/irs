import { useState } from "react";
import { DEPARTMENTS, ROLES } from "../assets/data";
import { addDocument, uploadFile } from "../firebase/firestore";

// eslint-disable-next-line react/prop-types
export default function AddProfile({ close }) {
  const [profile, setProfile] = useState({});

  const addField = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveDetails = async (e) => {
    e.preventDefault();
    await addDocument({
        path:"users", 
        id: new Date().getTime().toString(), 
        data: {...profile, code: "IRS"},
      })

      close(); // Close the modal when the profile is added successfully.
    } 

  const getImageURL = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      uploadFile({
        path:"/irs/images/user",
        file,
        getLink:(link) => setProfile((prev) => ({ ...prev, photo: link}))
      })
    }

  }
 


  return (
    <div className="absolute top-0 w-full flex bg-black/50 h-full flex-2 items-center justify-center p-5">
      <div className="flex  w-1/3 h-fit p-10 bg-gray-400 rounded">
        <form
          action="#"
          className="flex flex-col w-full gap-2"
          onSubmit={saveDetails}
        >
          <h3 className="text-2xl pb-2">Add New Profile... </h3>
          <input
            className="p-3 outline-none w-full bg-gray-200"
            type="text"
            placeholder="Name..."
            name="name"
            id="name"
            value={profile?.name}
            onChange={addField}
          />
          <input
            className="p-3 outline-none bg-gray-200"
            type="email"
            placeholder="Email"
            name="email"
            id="name"
            value={profile?.email}
            onChange={addField}
          />
          <select
            value={profile?.department}
            name="department"
            className="p-3 outline-none"
            onChange={addField}
            id="department"
          >
            <option value="">-- Select Department -- </option>
            {DEPARTMENTS.map((dep) => (
              <option value={dep} key={dep}>
                {dep}
              </option>
            ))}
          </select>
          <select
            value={profile?.role}
            name="role"
            className="p-3 outline-none"
            onChange={addField}
            id="role"
          >
            <option value="">--Select Role-- </option>
            {ROLES.map((dep) => (
              <option value={dep} key={dep}>
                {dep}
              </option>
            ))}
          </select>
          <div className="flex justify-between items-center">
            <label
              htmlFor="photo"
              className="bg-green-400 w-5/6 cursor-pointer text-md p-3"
            >
              Attach Photo
            </label>
            {profile?.photo && (
              <button
                onClick={() => {}}
                className="bg-green-400 cursor-pointer flex-1 text-md p-3"
              >
                Photo Uploaded
              </button>
            )}
          </div>
          <input onChange={getImageURL} type="file" accept="*.jpg,*.png,*.jpeg" name="photo" id="photo" className="hidden" />

          <div className="mt-2 flex gap-2">
            <button type="submit" className="p-3 bg-yellow-500  w-4/5">
              Save Information
            </button>
            <button
              type="button"
              className="bg-red-700 text-white p-3 flex-1"
              onClick={close}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
