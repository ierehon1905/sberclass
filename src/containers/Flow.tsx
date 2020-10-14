import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { PageCard, PageCardProps } from "../components/PageCard";
import { RootState } from "../store";

export type LessonPage = {
  title: string;
  path: string;
  thumbnail?: string;
  id: string;
  parent?: string;
  children?: string[];
  row: number;
  column: number;
};

export type FlowLessonPageTree = {
  pages: LessonPage[];
};

export const DEV_data: FlowLessonPageTree = {
  pages: [
    {
      title: "Test1",
      path: "/",
      id: "1",
      children: ["2", "3", "4", "6"],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 1,
      column: 1,
    },
    {
      title: "Test2",
      path: "/Test2",
      id: "2",
      parent: "1",
      children: ["5"],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 1,
      column: 2,
    },
    {
      title: "Test5",
      path: "/Test2/Test5",
      id: "5",
      parent: "2",
      children: [],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 1,
      column: 3,
    },
    {
      title: "Test3",
      path: "/Test3",
      id: "3",
      parent: "1",
      children: [],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 2,
      column: 2,
    },
    {
      title: "Test4",
      path: "/Test4",
      id: "4",
      parent: "1",
      children: [],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 3,
      column: 2,
    },
    {
      title: "Test6",
      path: "/Test6",
      id: "6",
      parent: "1",
      children: [],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 4,
      column: 2,
    },
  ],
};

const CardWrapper = (props: PageCardProps) => {
  return (
    <div
      style={{
        gridRow: `${props.row} / span 1`,
        gridColumn: `${props.column} / span 1`,
      }}
      id={"card-" + props.id}
    >
      <PageCard {...props}></PageCard>
    </div>
  );
};

const StyledGrid = styled.div`
  position: relative;
  display: grid;
  grid-auto-columns: 320px;
  column-gap: 40px;
  row-gap: 30px;
  background-color: ${p => p.theme.lightLightGray};
  padding: 32px 42px;
  overflow: scroll;
`;

const Connections = (props: FlowLessonPageTree) => {
  const [elMap, setElMap] = useState<{ [key: string]: HTMLElement }>({});
  const self = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const newElMap: typeof elMap = {};
    props.pages.forEach(p => {
      console.log("searching for el ", "card-" + p.id);
      const el = document.getElementById("card-" + p.id);
      console.log("found el ", el);
      if (el) {
        newElMap[p.id] = el;
      }
    });
    setElMap(newElMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pages.length]);

  const conEl: JSX.Element[] = [];

  const selfPos = self.current
    ? self.current.getBoundingClientRect()
    : { x: 0, y: 0 };

  props.pages.forEach(p => {
    if (!elMap[p.id]) return;
    p.children?.forEach(c => {
      console.log("p.id, c ", p.id, c, elMap);
      if (!elMap[c]) return;
      const parentPos = elMap[p.id].getBoundingClientRect();
      const childPos = elMap[c].getBoundingClientRect();
      const conn = (
        <path
          stroke="red"
          strokeWidth="3"
          fill="none"
          d={`M${parentPos.x - selfPos.x} ${parentPos.y - selfPos.y} L${
            childPos.x - selfPos.x
          } ${childPos.y - selfPos.y}`}
        />
      );
      conEl.push(conn);
    });
  });

  console.log("conns", conEl);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        // zIndex: -1,
      }}
      ref={self}
    >
      {conEl}
    </svg>
  );
};

export default () => {
  const data = useSelector<RootState, RootState>(state => state);

  return (
    <div>
      <h1>Flow</h1>
      <StyledGrid id="flow-creator">
        {data.map(p => (
          <CardWrapper {...p} key={p.id}></CardWrapper>
        ))}
        <Connections pages={data} />
      </StyledGrid>
    </div>
  );
};
