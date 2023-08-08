import {createSlice} from '@reduxjs/toolkit';
import {appOperation} from '../appOperation';
import {toastAlert} from '../helper/utility';

export const initialState = {
  upcomingMatches: [],
  myTeams: [],
  myContest: [],
  myMatchesData: [],
  isLoading: false,
  contestData: undefined,
  contestList: [],
  isContestEntry: false,
  selectedMatch: undefined,
  allPlayers: [],
  playerDetail: undefined,
  shareLink: undefined,
  walletCreateData: undefined,
  getPlayerTab:undefined,
};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setUpComingMatches: (state, {payload}) => {
      state.upcomingMatches = payload;
    },
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
    },
    setMyTeam: (state, {payload}) => {
      state.myTeams = payload;
    },
    setMyContest: (state, {payload}) => {
      state.myContest = payload;
    },
    setMyMatchesData: (state, {payload}) => {
      state.myMatchesData = payload;
    },
    setContestData: (state, {payload}) => {
      state.contestData = payload;
    },
    setMyMatchesHome: (state, {payload}) => {
      state.myMatchesHome = payload;
    },
    setContestList: (state, {payload}) => {
      state.contestList = payload;
    },
    setIsContestEntry: (state, {payload}) => {
      state.isContestEntry = payload;
    },
    setSelectedMatch: (state, {payload}) => {
      state.selectedMatch = payload;
    },
    setAllPlayers: (state, {payload}) => {
      state.allPlayers = payload;
    },
    setPlayerDetail: (state, {payload}) => {
      state.playerDetail = payload;
    },
    setShareLink: (state, {payload}) => {
      state.shareLink = payload;
    },
    setCreateWallet: (state, {payload}) => {
      state.walletCreateData = payload;
    },
    setTab: (state, {payload}) => {
      state.getPlayerTab = payload;
    },
  },
});

export const {
  setUpComingMatches,
  setMyTeam,
  setMyContest,
  setMyMatchesData,
  setMyMatchesHome,
  setContestData,
  setContestList,
  setIsContestEntry,
  setSelectedMatch,
  setAllPlayers,
  setPlayerDetail,
  setShareLink,
  setCreateWallet,
  setLoading,
  setTab,
} = matchSlice.actions;
export default matchSlice.reducer;

export const getMyTeam = data => async dispatch => {
  try {
    const res = await appOperation.customer.getMyTeam(data);
    if (res.code == 200) {
      dispatch(setMyTeam(res?.data));
    }
  } catch {}
};

export const getMyJoinedContest = data => async dispatch => {
  try {
    const res = await appOperation.customer.getMyJoinedContest(data);
    if (res.code == 200) {
      dispatch(setMyContest(res?.data));
    }
  } catch (e) {
    console.log(e);
  }
};

export const joinContest = data => async dispatch => {
  try {
    const res = await appOperation.customer.joinContest(data);
    if (res.code == 200) {
      toastAlert.showToastError(res?.message);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getContestList = (outputObject, id) => async dispatch => {
  let data = {
    matchid: id,
    object: outputObject,
  };
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.getContestList(data);
    // console.log('res:::::', res);

    if (res?.code === 200) {
      dispatch(setContestList(res.data));
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getMyMatches = status => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.getMyMatchesData(status);
    if (res.code == 200) {
      dispatch(setMyMatchesData(res.data));
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getAllPlayerList = id => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.getAllPlayers(id);

    if (res.code == 200) {
      const players = [];
      res?.data?.forEach(items => {
        items?.players?.forEach(player => {
          let data = {...player};
          data['teamName'] = items?.team?.abbr;
          players.push(data);
        });
      });
      dispatch(setAllPlayers(players));
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getPlayerDetail = id => async dispatch => {
  try {
    dispatch(setPlayerDetail(undefined));
    dispatch(setLoading(true));
    const res = await appOperation.customer.player_detail(id);

    if (res?.success) {
      dispatch(setPlayerDetail(res.data));
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getShareUrl = id => async dispatch => {
  try {
    const res = await appOperation.customer.share_url(id);
    if (res?.success) {
      dispatch(setShareLink(res?.data));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const setMatchRemainder = data => async dispatch => {
  try {
    const res = await appOperation.customer.match_reminder(data);
    console.log('res:::::::::', res);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getTab = data => async dispatch => {
  try {
    dispatch(setTab(data));
  } catch (e) {
    console.log(e);
  }
};
