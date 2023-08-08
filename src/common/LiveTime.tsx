import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {colors} from '../theme/color';
import {AppText, GREEN, POPPINS_SEMI_BOLD, RED, WHITE} from './AppText';

const LiveTime = ({
  details,
  color,
  top,
  view,
  completeMatch,
  type,
  styletext,
}: any) => {
  const getDate = (timeDetails: any) => {
    let a = moment();
    let b = moment(timeDetails?.StartDateTime);
    const duration = moment.duration(b.diff(a));
    const diffInHours = Math.floor(duration.asHours());
    const diffInDays = Math.floor(duration.asDays());
    const diffInMin = duration.minutes();
    const diffInSec = duration.seconds();
    if (diffInHours > 24) {
      let temp = {
        hour: diffInHours,
        time: `${diffInDays}d`,
        minute: 40,
      };
      return temp;
    } else {
      let temp = {
        hour: diffInHours,
        minute: diffInMin,
        time: `${diffInHours > 0 ? `${diffInHours}h` : ''} ${diffInMin}m ${
          diffInHours > 0 ? '' : `${diffInSec}s`
        }`,
      };
      return temp;
    }
  };
  const [time, setTime] = useState({
    time: '',
    hour: 0,
    minute: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getDate(details));
    }, 1000);
    return () => clearInterval(interval);
  }, [details]);
  return (
    <>
      {view ? (
        <>
          <AppText
            weight={POPPINS_SEMI_BOLD}
            color={
              details?.Status === 'Live' ||
              details?.match_details?.status_str === 'Live'
                ? WHITE
                : color
                ? color
                : RED
            }
            type={type ? type : null}
            style={[
              {
                marginTop: top ? 2 : 10,
              },
            ]}>
            {/* {completeMatch == true ? 'Completed' : '3h 29m'} */}
            {details?.Status === 'Live' ||
            details?.match_details?.status_str === 'Live'
              ? 'Live'
              : details?.Status === 'Completed' ||
              details?.match_details?.status_str === 'Completed'
              ? details?.Status ?  details?.Status : details?.match_details?.status_str 
              : time?.hour >= 0
              ? time?.time
              : ''}
          </AppText>
        </>
      ) : (
        <>
          {time?.hour >= 0 && (
            <AppText
              weight={POPPINS_SEMI_BOLD}
              type={type ? type : null}
              color={
                details?.Status === 'Live' ||
                details?.match_details?.status_str === 'Live'
                  ? GREEN
                  : color
                  ? color
                  : GREEN
              }
              style={[
                {
                  marginTop: top ? 0 : 10,
                },
                styletext,
              ]}>
              {/* 3h 29m */}
              {details?.Status === 'Live' ||
              details?.match_details?.status_str === 'Live'
                ? 'Live'
                : time?.hour >= 0
                ? time?.time
                : ''}
            </AppText>
          )}
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({});
export {LiveTime};
