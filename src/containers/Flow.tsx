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
  flowParent?: string;
  flowChildren?: string[];
  isRoot?: boolean;
  hierarchyChildren?: string[];
  row: number;
  column: number;
  selected?: boolean;
};

export type FlowLessonPageTree = {
  pages: LessonPage[];
};

const CardWrapper = (props: PageCardProps) => {
  return (
    <div
      style={{
        gridRow: `${props.row} / span 1`,
        gridColumn: `${props.column} / span 1`,
        zIndex: 2,
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
  width: fit-content;
`;

const Connections = (props: FlowLessonPageTree) => {
  const [elMap, setElMap] = useState<{ [key: string]: HTMLElement }>({});
  const self = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const newElMap: typeof elMap = {};
    props.pages.forEach(p => {
      // console.log("searching for el ", "card-" + p.id);
      const el = document.getElementById("card-" + p.id);
      // console.log("found el ", el);
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
    p.flowChildren?.forEach(c => {
      // console.log("p.id, c ", p.id, c, elMap);
      if (!elMap[c]) return;
      const parentPos = elMap[p.id].getBoundingClientRect();
      const childPos = elMap[c].getBoundingClientRect();
      const conn = (
        <path
          stroke="red"
          strokeWidth="3"
          fill="none"
          key={p.id + "_" + c}
          d={`M${parentPos.x - selfPos.x} ${parentPos.y - selfPos.y} L${
            childPos.x - selfPos.x
          } ${childPos.y - selfPos.y}`}
        />
      );
      conEl.push(conn);
    });
  });

  // console.log("conns", conEl);

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
        zIndex: 1,
      }}
      ref={self}
    >
      {conEl}
    </svg>
  );
};

export default () => {
  const data = useSelector<RootState, RootState["flow"]>(state => state.flow);
  const dataSelected = useSelector((state: RootState) => state.work)
    .selectedPages;
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  return (
    <div
      style={{
        flexGrow: 2,
        display: "flex",
        flexDirection: "column",
        // overflow: "scroll",
      }}
    >
      <h2>Flow</h2>
      <div
        style={{
          flexGrow: 2,
          overflow: "scroll",
          width: ref?.clientWidth,
          height: ref?.clientHeight,
        }}
        ref={ref => setRef(ref)}
      >
        {ref && (
          <StyledGrid id="flow-creator">
            <Connections pages={data} />
            {data.map(p => (
              <CardWrapper
                {...p}
                key={p.id}
                selected={dataSelected.includes(p.id)}
              ></CardWrapper>
            ))}
          </StyledGrid>
        )}
      </div>
    </div>
  );
};
