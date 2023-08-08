import {AppOperation} from './../../index';
import {CUSTOMER_TYPE} from '../../types';

export default appOperation => ({
  log_out: data => appOperation.post(`client_logout`, data, CUSTOMER_TYPE),
  get_profile: () =>
    appOperation.get(`user/profile`, undefined, undefined, CUSTOMER_TYPE),
  get_wallet: () =>
    appOperation.get(`wallet/user-wallet`, undefined, undefined, CUSTOMER_TYPE),
  walletcreate: id =>
    appOperation.post(`wallet/create-wallet?user=${id}`, {}, CUSTOMER_TYPE),
  getKycDetails: () =>
    appOperation.get(`user/kyc-details`, undefined, undefined, CUSTOMER_TYPE),
  sendKycOtp: data =>
    appOperation.post(`user/send-kyp-otp`, data, CUSTOMER_TYPE),
  verifyKycOtp: data =>
    appOperation.post(`user/verify-kyc-otp`, data, CUSTOMER_TYPE),
  updateKyc: data => appOperation.post(`user/update-kyc`, data, CUSTOMER_TYPE),
  uploadImg: data => appOperation.post(`upload`, data, CUSTOMER_TYPE),
  getSeriesData: () =>
    appOperation.post('TeamData/Serieslist', {}, CUSTOMER_TYPE),
  getContestList: data =>
    appOperation.post(
      `match/contests/${data?.matchid}`,
      data?.object,
      CUSTOMER_TYPE,
    ),
  deposit_tran: () =>
    appOperation.get(
      `user/transactions/deposit`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  editProfile: (data, id) =>
    appOperation.put(`user/update-profile?user=${id}`, data, CUSTOMER_TYPE),
  contest_tran: () =>
    appOperation.get(
      `user/transactions/contests`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  withdrawal_tran: () =>
    appOperation.get(
      `user/transactions/withdrawl`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  getAllContest: (matchId, contestId) =>
    appOperation.get(
      `match/contests/${matchId}/${contestId}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  getIntro: () =>
    appOperation.get('intro', undefined, undefined, CUSTOMER_TYPE),
  getMyTeam: id =>
    appOperation.get(
      `match/my-teams/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  getAllPlayers: id =>
    appOperation.get(
      `match/all-players/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  player_detail: id =>
    appOperation.get(
      `match/player-profile/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  match_reminder: data =>
    appOperation.post(`user/save-match-reminders`, data, CUSTOMER_TYPE),
  share_url: id =>
    appOperation.get(
      `match/share-team/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  getMyJoinedContest: id =>
    appOperation.get(
      `match/my-contests/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  saveTeam: data => appOperation.post(`match/create-team`, data, CUSTOMER_TYPE),
  editTeam: data => appOperation.put(`match/update-team`, data, CUSTOMER_TYPE),
  refresh_token: () =>
    appOperation.get(`user/refresh-token`, undefined, undefined, CUSTOMER_TYPE),
  fcm_token: data =>
    appOperation.post(`user/save-firebase-token`, data, CUSTOMER_TYPE),
  getPrizeList: id =>
    appOperation.get(
      `match/winner-prizes/${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  joinContest: data =>
    appOperation.post(`match/join-contest`, data, CUSTOMER_TYPE),

  getMyMatchesData: status =>
    appOperation.get(
      `match/list?status=${status}&limit=100&skip=0`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
});
