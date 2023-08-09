import { OptionDicType } from '@/views/Config/OptionsConfig/OptionEdit';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const initialState: OptionDicType[] = [];

const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    resetOption(state: OptionDicType[], action: PayloadAction<OptionDicType[]>) {
      return action.payload;
    },
  },
});

export const { resetOption } = optionSlice.actions;

export const selectOptions = (state: RootState) => state.options;

export default optionSlice.reducer;
