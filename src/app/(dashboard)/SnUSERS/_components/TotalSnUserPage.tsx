import React from "react";
import SnCard from "./SnCard";
import SnUserList from "./SnUserList";

function TotalSnUserPage() {
  return (
    <div>
      <div>
        <SnCard />
      </div>
      <div className="mt-10">
        <SnUserList />
      </div>
    </div>
  );
}

export default TotalSnUserPage;
