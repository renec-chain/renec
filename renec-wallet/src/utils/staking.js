import { createContext, useContext, useReducer } from 'react';

const StakingContext = createContext();

const initialState = {
  totalStaked: 0,
  activeStake: 0,
  publicKeys: [],
};

const actions = {
  ADD_ITEM: 'ADD_ITEM',
  SET_ITEM: 'SET_ITEM',
  LIST_STAKES: 'LIST_STAKES',
};

function stakingReducer(state, action) {
  switch (action.type) {
    case actions.ADD_ITEM: {
      const { staking } = action;

      return {
        ...state,
        totalStaked: state.totalStaked + staking.active + staking.inactive,
        activeStake: state.activeStake + staking.active,
      };
    }
    case actions.SET_ITEM: {
      return {
        ...state,
        totalStaked: 0,
        activeStake: 0,
      };
    }
    case actions.LIST_STAKES: {
      const { listStakes } = action;
      return {
        ...state,
        publicKeys: listStakes,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const StakingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stakingReducer, initialState);
  const value = {
    state,
    addItem: (staking) => {
      dispatch({ type: actions.ADD_ITEM, staking });
    },
    setItem: () => {
      dispatch({ type: actions.SET_ITEM });
    },
    listStakes: (listStakes) => {
      dispatch({ type: actions.LIST_STAKES, listStakes });
    },
  };
  return (
    <StakingContext.Provider value={value}>{children}</StakingContext.Provider>
  );
};

export const useStaking = () => useContext(StakingContext);
