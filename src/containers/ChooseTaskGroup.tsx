import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EducationModule } from "../entities/education";
import { resolveEducationModules } from "../entities/education/resolvers";

export default () => {
  const [modules, setModules] = useState<EducationModule[]>([]);
  useEffect(() => {
    resolveEducationModules().then(res => setModules(res.result));
  }, []);

  return (
    <div>
      Chose
      {/* <code>{JSON.stringify(modules, null, 2)}</code> */}
      {/* <code>{typeof modules}</code> */}
      {modules.map(m => (
        <div key={m._id}>
          <h3>Module</h3>
          <div>{m.name}</div>
          {m.topics.map(t => (
            <div key={t._id}>
              <h4>Topic</h4>
              <div>{t.name}</div>
              {t.taskGroups.map(g => (
                <Link
                  to={`/edit-task-group/${m._id}/${t._id}/${g._id}`}
                  key={g._id}
                >
                  {g.name} {g._id}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
