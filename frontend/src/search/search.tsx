import React, { useEffect, useState } from "react";
import { Data } from "../types";
import { searchData } from "../services/search";
import { toast } from "sonner";
import { useDebounce } from "@uidotdev/usehooks";

const DEBOUNCE_TIME = 500;
export const Search = ({ initialData }: { initialData: Data }) => {
  const [data, setData] = useState<Data>(initialData);
  const [search, setSearch] = useState<string>(() => {
    const serachParams = new URLSearchParams(window.location.search);
    return serachParams.get("q") ?? "";
  });

  const debaunceSearch = useDebounce(search, DEBOUNCE_TIME);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const newPathname =
      debaunceSearch === "" ? window.location.pathname : `?q=${debaunceSearch}`;

    window.history.pushState({}, "", newPathname);
  }, [debaunceSearch]);

  // Call API
  useEffect(() => {
    if (!debaunceSearch) {
      setData(initialData);
      return;
    }
    searchData(debaunceSearch).then((response) => {
      const [err, newData] = response;
      if (err) {
        toast.error(err.message);
        return;
      }

      if (newData) {
        setData(newData);
      }
    });
  }, [debaunceSearch, initialData]);
  return (
    <div>
      <h1>Search</h1>
      <form>
        <input
          onChange={handleSearch}
          type="search"
          placeholder="Search info..."
          defaultValue={search}
        />
      </form>
      <ul>
        {data.map((row) => (
          <li key={row.id}>
            <article>
              {Object.entries(row).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}: </strong>
                  {value}
                </p>
              ))}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};
