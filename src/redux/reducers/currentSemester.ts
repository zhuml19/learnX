import {ISetCurrentSemesterAction} from '../types/actions';
import {SET_CURRENT_SEMESTER} from '../types/constants';

export default function currentSemester(
  state: string = '2020-2021-1',
  action: ISetCurrentSemesterAction,
): string {
  switch (action.type) {
    case SET_CURRENT_SEMESTER:
      return action.payload;
  }
  return state;
}
