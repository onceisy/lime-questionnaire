import { OptionDicType } from '@/views/Config/OptionsConfig/OptionEdit';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const initialState: OptionDicType[] = [];

const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    // 重置所有字典，会导致所有字典options丢失
    resetOption(state: OptionDicType[], action: PayloadAction<OptionDicType[]>) {
      return action.payload;
    },

    // 更新某一项
    updateDicOptions(state: OptionDicType[], action: PayloadAction<OptionDicType>) {
      const index = state.findIndex(i => i._id === action.payload._id);
      if (index < 0) {
        state.push(action.payload);
      } else {
        state[index] = action.payload;
      }
    },
  },
});

export const { resetOption, updateDicOptions } = optionSlice.actions;

export const selectOptions = (state: RootState) => state.options;

export default optionSlice.reducer;
