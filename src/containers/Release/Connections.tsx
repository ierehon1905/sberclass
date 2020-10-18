import React, { useMemo, useRef } from "react";
import { releaseMock } from ".";
import { colors } from "../../utils/theme";
export default (props: { steps: typeof releaseMock["pipeline"]["steps"] }) => {
  const self = useRef<SVGSVGElement>(null);

  const conns: JSX.Element[] = [];
  const selfPos = self.current
    ? self.current.getBoundingClientRect()
    : { x: 0, y: 0 };
  for (let index = 0; index < props.steps.length - 1; index++) {
    const current = props.steps[index];
    const next = props.steps[index + 1];
    const currentColumn = document.getElementById("step-column__" + index);
    const nextColumn = document.getElementById("step-column__" + (index + 1));
    if (!currentColumn || !nextColumn) return null;

    if (current.tasks.length === 1 && next.tasks.length === 1) {
      const currentCard = currentColumn.querySelector(".task-card");
      const nextCard = nextColumn.querySelector(".task-card");
      const parentPos = currentCard.getBoundingClientRect();
      const childPos = nextCard.getBoundingClientRect();

      const conn = (
        <path
          stroke={colors.gray2}
          strokeWidth="2"
          fill="none"
          d={`M${parentPos.x - selfPos.x + parentPos.width / 2} ${
            parentPos.y - selfPos.y + parentPos.height / 2
          } L${childPos.x - selfPos.x + childPos.width / 2} ${
            childPos.y - selfPos.y + childPos.height / 2
          }`}
        />
      );
      conns.push(conn);
    } else if (current.tasks.length > 1 || next.tasks.length > 1) {
      const currentCards = Array.from(
        currentColumn.querySelectorAll(".task-card")
      );
      const nextCards = Array.from(nextColumn.querySelectorAll(".task-card"));

      const [xSum, Ysum, len, minX, minY, maxX, maxY] = currentCards
        .concat(...nextCards)
        .reduce(
          (acc, cur) => {
            const rect = cur.getBoundingClientRect();
            return [
              acc[0] + rect.x + rect.width / 2,
              acc[1] + rect.y + rect.height / 2,
              acc[2] + 1,
              Math.min(acc[3], rect.x + rect.width / 2),
              Math.min(acc[4], rect.y + rect.height / 2),
              Math.max(acc[5], rect.x + rect.width / 2),
              Math.max(acc[6], rect.y + rect.height / 2),
            ];
          },
          [0, 0, 0, Infinity, Infinity, -Infinity, -Infinity]
        );
      const [avgX, avgY] = [xSum / len, Ysum / len];

      const x = minX + (maxX - minX) / 2 - selfPos.x;
      const y = avgY - selfPos.y;
      const c = (
        <circle
          cx={x}
          cy={y}
          r="5"
          //   stroke="black"
          //   stroke-width="3"
          fill={colors.gray2}
        />
      );
      conns.push(c);

      // eslint-disable-next-line no-loop-func
      currentCards.forEach(cc => {
        conns.push(
          <path
            stroke={colors.gray2}
            strokeWidth="2"
            fill="none"
            d={`M${
              cc.getBoundingClientRect().x -
              selfPos.x +
              cc.getBoundingClientRect().width / 2
            } ${
              cc.getBoundingClientRect().y -
              selfPos.y +
              cc.getBoundingClientRect().height / 2
            } L${x} ${y}`}
          />
        );
      });

      // eslint-disable-next-line no-loop-func
      nextCards.forEach(cc => {
        conns.push(
          <path
            stroke={colors.gray2}
            strokeWidth="2"
            fill="none"
            d={`M${x} ${y} L${
              cc.getBoundingClientRect().x -
              selfPos.x +
              cc.getBoundingClientRect().width / 2
            } ${
              cc.getBoundingClientRect().y -
              selfPos.y +
              cc.getBoundingClientRect().height / 2
            }`}
          />
        );
      });
    }
  }

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
      {conns}
    </svg>
  );
};
