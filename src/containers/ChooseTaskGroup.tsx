import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { EducationModule } from "../entities/education";
import { resolveEducationModules } from "../entities/education/resolvers";

const StyledChoose = styled.div`
  .module {
  }
  .topic {
    padding-left: 1em;
  }
  .group {
    padding-left: 1em;
    display: inline-block;
    padding: 0.5em;
    border: 1px solid ${p => p.theme.gray6};
    appearance: none;
    text-decoration: none;
    color: ${p => p.theme.gray6};
    border-radius: 12px;
  }
`;

export default () => {
  const [modules, setModules] = useState<EducationModule[]>([]);
  useEffect(() => {
    resolveEducationModules().then(res => setModules(res.result));
  }, []);

  return (
    <StyledChoose>
      Choose
      {/* <code>{JSON.stringify(modules, null, 2)}</code> */}
      {/* <code>{typeof modules}</code> */}
      <h3>Модули</h3>
      {modules.map(m => (
        <div key={m._id} className="module">
          <div>{m.name}</div>
          <h4>Топики</h4>
          {m.topics.map(t => (
            <div key={t._id} className="topic">
              <div>{t.name}</div>
              <h5>Группы заданий</h5>
              {t.taskGroups.map(g => (
                <Link
                  to={`/edit-task-group/${m._id}/${t._id}/${g._id}`}
                  key={g._id}
                  className="group"
                >
                  Название: {g.name}
                  <br />
                  Описание {JSON.stringify(g.description, null, 2)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ))}
    </StyledChoose>
  );
};
