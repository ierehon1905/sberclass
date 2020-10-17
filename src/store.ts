import {
  combineReducers,
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { FlowLessonPageTree, LessonPage } from "./containers/Flow";
import { ConfiguredWidget, widgetMap, WidgetProps } from "./containers/Widget";
import { CmsBlock, CmsBlockTypes } from "./entities/cms";
import { EducationModule, TaskGroup } from "./entities/education";
import { resolveUpdateTaskGroup } from "./entities/education/resolvers";

export const DEV_data: FlowLessonPageTree = {
  pages: [
    {
      title: "Test1",
      path: "/",
      id: "1",
      flowChildren: ["2", "3", "4", "6"],
      triggers: [
        {
          goToPageId: "2",
          id: "1289379",
          title: "Событие №1",
        },
        {
          goToPageId: "3",
          id: "2834792",
          title: "Событие №2",
        },
      ],
      hierarchyChildren: ["2", "3", "4", "6"],
      isRoot: true,
      row: 1,
      column: 1,
    },
    {
      title: "Test2",
      path: "/Test2",
      id: "2",
      flowParent: "1",
      flowChildren: ["5"],
      hierarchyChildren: ["5"],
      row: 1,
      column: 2,
    },
    {
      title: "Test5",
      path: "/Test2/Test5",
      id: "5",
      flowParent: "2",
      flowChildren: [],
      hierarchyChildren: [],
      row: 1,
      column: 3,
    },
    {
      title: "Test3",
      path: "/Test3",
      id: "3",
      flowParent: "1",
      flowChildren: [],
      hierarchyChildren: [],
      row: 2,
      column: 2,
    },
    {
      title: "Test4",
      path: "/Test4",
      id: "4",
      flowParent: "1",
      flowChildren: [],
      hierarchyChildren: [],
      row: 3,
      column: 2,
    },
    {
      title: "Test6",
      path: "/Test6",
      id: "6",
      flowParent: "1",
      flowChildren: [],
      hierarchyChildren: [],
      row: 4,
      column: 2,
    },
  ],
};

export const flowSlice = createSlice({
  name: "pages",
  initialState: DEV_data.pages,
  reducers: {
    removePage: (state, action: { payload: string; type: string }) => {
      const indexToRemove = state.findIndex(p => p.id === action.payload);
      const pageToRemove = state[indexToRemove];
      const parentPage = state.find(p =>
        p.hierarchyChildren?.includes(action.payload)
      );
      if (parentPage && pageToRemove.hierarchyChildren?.length) {
        parentPage!.hierarchyChildren!.push(...pageToRemove.hierarchyChildren);
      }
      state.splice(indexToRemove, 1);
    },
    addPage: (
      state,
      action: {
        payload: Partial<LessonPage> & { hierarchyParent?: string };
        type: string;
      }
    ) => {
      const column =
        action.payload.column ?? action.payload.hierarchyParent
          ? state.find(p => p.id === action.payload.hierarchyParent)!.column + 1
          : 1;

      const row =
        action.payload.row ??
        (state
          .filter(p => p.column === column)
          .reduce((max, cur) => Math.max(max, cur.row), 1) + 1 ||
          1);

      const path =
        action.payload.path ??
        (action.payload.flowParent
          ? state.find(p => p.id === action.payload.flowParent)?.path +
            (action.payload.title ?? "")
          : "");

      const id = Math.trunc(Math.random() * 1000).toString();

      if (action.payload.hierarchyParent) {
        console.log("Finding parent and adding children");
        const parent = state.find(
          p => p.id === action.payload.hierarchyParent
        )!;

        if (!Array.isArray(parent.hierarchyChildren)) {
          parent.hierarchyChildren = [];
        }

        console.log("Found parent ", JSON.stringify(parent, null, 2));
        console.log("with children ", parent.hierarchyChildren?.length);

        parent.hierarchyChildren?.push(id);

        console.log("new children ", parent.hierarchyChildren?.length);
      }

      state.push({
        ...action.payload,
        id,
        title: action.payload.title ?? "Page " + id,
        path,
        row,
        column,
      });
    },
  },
});

export const workSlice = createSlice({
  name: "work",
  initialState: {
    selectedPages: [] as string[],
  },
  reducers: {
    selectPages: (
      state,
      action: {
        payload: string[];
        type: string;
      }
    ) => {
      // state.selectedPages = Array.from(
      //   new Set(state.selectedPages.concat(action.payload))
      // );
      state.selectedPages = [action.payload[0]];
    },
    deselectPages: (
      state,
      action: {
        payload: string[];
        type: string;
      }
    ) => {
      state.selectedPages = state.selectedPages.filter(
        p => !action.payload.includes(p)
      );
    },
  },
});

// const taskUpdate = createAsyncThunk(
//   "taskGroup/taskUpdate",
//   async (params: Parameters<typeof resolveUpdateTaskGroup>, thunkAPI) => {
//     const res = await resolveUpdateTaskGroup(
//       params[0],
//       params[1],
//       params[2],
//       params[3]
//     );
//   }
// );

export const taskGroupSlice = createSlice({
  name: "taskGroup",
  initialState: {} as TaskGroup,
  extraReducers: {},
  reducers: {
    setGroup: (
      state,
      action: {
        payload: TaskGroup;
        type: string;
      }
    ) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },
    addWidget: (
      state,
      action: {
        type: string;
        payload: CmsBlockTypes;
      }
    ) => {
      // const newRawWidget = Object.values(widgetMap).find(
      //   w => w.widgetGuid === action.payload
      // );

      const newWidget: CmsBlock = {
        // ...newRawWidget,
        type: action.payload,
        data: {
          educationMeta: {
            level: 0,
            required: false,
          },
        },
        _id: Math.trunc(Math.random() * 100000000000).toString(),
      };

      Object.keys(newWidget).forEach(key => {
        if (typeof newWidget[key] === "function") {
          delete newWidget[key];
        }
      });

      state.content.blocks.push(newWidget);
    },
    removeWidget: (
      state,
      action: {
        type: string;
        payload: CmsBlock["_id"];
      }
    ) => {
      const indexToRemove = state.content.blocks.findIndex(
        w => w._id === action.payload
      );
      state.content.blocks.splice(indexToRemove, 1);
    },
    editWidget: (
      state,
      action: {
        type: string;
        payload: {
          _id: CmsBlock["_id"];
          params: CmsBlock["data"];
        };
      }
    ) => {
      if (!state.content?.blocks) {
        console.log("Did not found state to edit", action);
        return;
      }

      const widgetToEdit = state.content?.blocks?.find(
        w => w._id === action.payload._id
      );

      widgetToEdit.data = action.payload.params;
    },
  },
});

export const moduleSlice = createSlice({
  name: "module",
  initialState: {} as EducationModule,
  reducers: {
    setModule: (
      state,
      action: {
        payload: EducationModule;
        type: string;
      }
    ) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
});

const rootReducer = combineReducers({
  flow: flowSlice.reducer,
  work: workSlice.reducer,
  taskGroup: taskGroupSlice.reducer,
  module: moduleSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
