import React from 'react';
import {FlatList, View} from 'react-native';
import {AppText, POPPINS_BOLD, SIXTEEN} from '../../../common/AppText';
import NavigationService from '../../../navigation/NavigationService';
import {ALL_CONTEST_LIST, PRACTISE_SCREEN} from '../../../navigation/routes';
import ContestCard from '../contestCard/ContestCard';
import ViewAll from '../viewAll/ViewAll';

const Contest = ({details, totalTeamCount, matchId}) => {
  const renderContest = ({item}) => {
    return (
     <ContestCard details={item} totalTeamCount={totalTeamCount} />
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <AppText
          type={SIXTEEN}
          style={{marginTop: 5, marginBottom: 10}}
          weight={POPPINS_BOLD}>
          {details?.name}
        </AppText>
        {details?.more && (
          <ViewAll
            onPress={() =>
              NavigationService.navigate(ALL_CONTEST_LIST, {
                contestId: details?.data[0]?.contest_category_id,
                contestName: details?.name,
                matchId: matchId,
                totalTeamCount: totalTeamCount,
              })
            }
          />
        )}
      </View>
      <FlatList 
      
      data={details?.data} renderItem={renderContest} />
    </>
  );
};

export default Contest;
