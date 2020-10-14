import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";
import { DEV_data, LessonPage } from "./containers/Flow";

const rootSlice = createSlice({
  name: "pages",
  initialState: DEV_data.pages,
  reducers: {
    addPage: (
      state,
      action: { payload: Partial<LessonPage>; type: string }
    ) => {
      state.push({
        ...action.payload,
        id: Math.trunc(Math.random() * 1000).toString(),
        title: action.payload.title ?? "",
        path:
          action.payload.path ??
          (action.payload.parent
            ? state.find(p => p.id === action.payload.parent)?.path +
              (action.payload.title ?? "")
            : ""),
        row:
          action.payload.row ??
          (action.payload.column
            ? state
                .filter(p => p.column === action.payload.column)
                .reduce((max, cur) => Math.max(max, cur.row), 1) || 1
            : 1),

        column: action.payload.column ?? 1,
      });
    },
  },
});

// const rootReducer = createReducer(DEV_data);

export const store = configureStore({
  reducer: rootSlice.reducer,
});

export type RootState = ReturnType<typeof rootSlice.reducer>;
