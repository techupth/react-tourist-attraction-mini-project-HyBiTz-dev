import React, { useEffect, useState } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";

function Travelcontents() {
  const [location, setLocation] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  const fetchData = async (locationname) => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${locationname}`
    );
    setLocation(result.data.data);
  };

  const handleCatagoryClick = (text) => {
    setSearchLocation((prevText) => (prevText ? `${prevText} ${text}` : text));
  };

  const handleCopyLink = (urllink) => {
    navigator.clipboard.writeText(urllink);
    alert("Copy Link Success");
  };

  useEffect(() => {
    fetchData(searchLocation);
  }, [searchLocation]);
  return (
    <>
      <div className="w-2/5">
        <h1 className="text-xl">ค้นหาที่เที่ยว</h1>
        <DebounceInput
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          debounceTimeout={500}
          onChange={(event) => setSearchLocation(event.target.value)}
          value={searchLocation}
          className="focus:outline-none text-center w-full mt-2 mb-2"
        />
        <hr />
      </div>
      <div className="w-3/5">
        {location.map((item) => (
          <div key={item.eid} className="flex gap-10 mt-16 ">
            <div className="flex-nowrap flex items-center">
              <img src={item.photos[0]} alt="" className="rounded-3xl w-96" />
            </div>
            <div className="flex flex-col gap-2 w-2/4">
              <a
                href={item.url}
                className="text-2xl font-medium"
                target="_blank"
              >
                {item.title}
              </a>
              <div>
                <p>{`${item.description.substring(0, 100)}...`}</p>
                <a
                  href={item.url}
                  target="_blank"
                  className="underline text-sky-500"
                >
                  อ่านต่อ
                </a>
              </div>
              <div className="flex gap-2">
                <span>หมวด</span>
                {item.tags.map((text, index) => (
                  <>
                    <span
                      className="underline cursor-pointer"
                      onClick={() => handleCatagoryClick(text)}
                    >
                      {text}
                    </span>
                    {index !== item.tags.length - 1 ? (
                      index === item.tags.length - 2 ? (
                        <span>และ</span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </div>
              <div className="flex justify-between items-end">
                <div className="flex gap-10 ">
                  {item.photos.slice(1).map((item) => (
                    <img
                      src={item}
                      alt=""
                      className="w-32 h-32 rounded-3xl object-cover"
                    />
                  ))}
                </div>
                <div>
                  <img
                    src="src/img/link.png"
                    alt=""
                    onClick={() => handleCopyLink(item.url)}
                    width={60}
                    height={60}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Travelcontents;
