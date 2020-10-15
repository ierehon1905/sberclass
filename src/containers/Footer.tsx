import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";

const ExportButton = styled.button`
  appearance: none;

  background-color: ${p => p.theme.blue};
`;

function downloadString(text: string, fileType: any, fileName: string) {
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement("a");
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 1500);
}

export default () => {
  const state = useSelector((state: RootState) => state);
  const json = JSON.stringify(state, null, 2);

  return (
    <footer style={{ display: "flex", justifyContent: "space-between" }}>
      <h2>Footer</h2>
      <ExportButton
        onClick={() => {
          downloadString(json, "application/json", "lesson");
        }}
      >
        Экспортировать
      </ExportButton>
    </footer>
  );
};
