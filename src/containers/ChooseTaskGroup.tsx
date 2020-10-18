import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { EducationModule } from "../entities/education";
import { resolveEducationModules } from "../entities/education/resolvers";
import { colors } from "../utils/theme";

const StyledChoose = styled.div`
  h4,
  h5 {
    color: ${colors.gray4};
  }
  .module {
    padding: 20px;

    position: static;
    width: 340px;

    background: #ffffff;
    box-shadow: 0px 24px 28px rgba(52, 58, 69, 0.1);
    border-radius: 16px;
  }
  .topic {
    margin-left: 1em;
    margin-bottom: 8px;
  }
  .group {
    margin-left: 1em;
    display: inline-block;
    padding: 0.5em;
    border: 1px solid ${p => p.theme.gray6};
    appearance: none;
    text-decoration: none;
    color: ${p => p.theme.gray6};
    border-radius: 12px;
  }
  button {
    width: 100%;
  }
`;

const HeadWrapper = styled.div`
  position: relative;
  padding-left: 60px;
  margin-top: 30px;
  h2 {
    margin-bottom: 0;
  }
  p {
    margin-top: 0;
    color: ${colors.gray6};
  }
`;

const ModulesWrapper = styled.div`
  position: relative;
  padding-left: 40px;
`;

export default () => {
  const [modules, setModules] = useState<EducationModule[]>([]);
  useEffect(() => {
    resolveEducationModules().then(res => setModules(res.result));
  }, []);

  return (
    <StyledChoose>
      {/* <code>{JSON.stringify(modules, null, 2)}</code> */}
      {/* <code>{typeof modules}</code> */}
      <HeadWrapper>
        <h2>Математика</h2>
        <p>Список модулей</p>
      </HeadWrapper>

      <ModulesWrapper>
        {modules.map(m => (
          <div key={m._id} className="module">
            <div>
              <h3>{m.name}</h3>
            </div>
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
            <hr />

            <Link to={"/release/" + m._id} style={{ textDecoration: "none" }}>
              <Button theme={"accent"}>Редактировать модуль</Button>
            </Link>
          </div>
        ))}
      </ModulesWrapper>
    </StyledChoose>
  );
};
