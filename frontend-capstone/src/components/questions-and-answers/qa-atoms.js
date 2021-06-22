import { atom, selector } from 'recoil';

const displayAmountState = atom({
  key: 'displayAmountState',
  default: 4,
});

const allQuestionsState = atom({
  key: 'allQuestionsState',
  default: [],
});

const quesitonIdState = atom({
  key: 'quesitonIdState',
  default: null,
});

const addAnswerState = atom({
  key: 'addAnswerState',
  default: false,
});

const searchState = atom({
  key: 'searchState',
  default: '',
});

const questionBody = atom({
  key: 'questionBody',
  default: 'Question Body',
});

const showSearchState = selector({
  key: 'showSearchState',
  get: ({ get }) => {
    const legnth = get(searchState).length;

    if (legnth > 2) {
      return true;
    } else {
      return false;
    }
  },
});

export {
  displayAmountState,
  allQuestionsState,
  quesitonIdState,
  addAnswerState,
  searchState,
  showSearchState,
  questionBody,
};
