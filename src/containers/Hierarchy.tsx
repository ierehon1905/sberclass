import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Hierarchy as HierarchyComponent,
  HierarchyProps,
  Nested,
} from "../components/HierarchyItem";
import { RootState, workSlice } from "../store";
import { LessonPage } from "./Flow";

export default () => {
  const data: RootState["flow"] = JSON.parse(
    JSON.stringify(useSelector((state: RootState) => state.flow))
  );
  const dataSelected = useSelector((state: RootState) => state.work)
    .selectedPages;

  const flatMap: {
    [id: string]: LessonPage & {
      nestedChildren?: LessonPage[];
      type: "module" | "section" | "page";
      selected: true;
    };
  } = {};
  let nestedMap = {} as Nested;

  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    // @ts-ignore
    flatMap[element.id] = element;
    flatMap[element.id].type = "section";
    const children = data.filter(p =>
      element.hierarchyChildren?.includes(p.id)
    );

    children.forEach(cp => {
      // @ts-ignore
      flatMap[cp.id] = cp;
      // flatMap[cp.id].type = "section";
      if (!flatMap[element.id].nestedChildren) {
        flatMap[element.id].nestedChildren = [];
      }
      flatMap[element.id].nestedChildren!.push(cp);
    });

    if (children.length === 0) {
      flatMap[element.id].type = "page";
    }

    if (element.isRoot) {
      // @ts-ignore
      nestedMap = element;
      flatMap[element.id].type = "module";
    }

    if (dataSelected.includes(element.id)) {
      flatMap[element.id].selected = true;
    }
  }

  // const dispatch = useDispatch();
  // const onSelectPage = (pages: string[]) => {
  //   dispatch(workSlice.actions.selectPages(pages));
  // };

  return <HierarchyComponent hierarchy={nestedMap} />;
};
