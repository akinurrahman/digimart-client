"use client";
import { useQueryNavigation } from "@/hooks/use-query-navigation";
import React, { useEffect } from "react";

const Example = () => {
  const { updateQuery } = useQueryNavigation();

  const handleClick = () => {
    updateQuery({
      redirectPath: "/products/add/basic-info",
      params: { id: "452", page: "99" },
    });
  };

  useEffect(() => {
    updateQuery({ params: { id: "123", page: "4" } });
  }, [updateQuery]);
  return (
    <div>
      <button onClick={handleClick}>click here</button>
    </div>
  );
};

export default Example;
