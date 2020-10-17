import React from "react";

export const View = () => {
  return <div style={{ background: "green" }}>{/* sasai */}</div>;
};

export default {
  view: View,
  triggerStart: null,
  triggerEnd: null,
  triggerError: null,
};
