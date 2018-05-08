import moment from 'moment';

// Get visible records, pass arguments RECORDS list of records, and FILTERS criterias.
export default (records, { TEXT, sortBy, startDate, endDate, STN, DIG, pageSize, selectedTag, unixTime, rowID}) => {
  //if(Object.keys(records).length !== 0) {
    return records.filter((record) => {
      const createdAtMoment = moment(record.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
      const searchTerms = TEXT.toLowerCase().split(" ")
      const textMatch0 = record.TEXT.toLowerCase().includes(searchTerms[0] || '');
      const textMatch1 = record.TEXT.toLowerCase().includes(searchTerms[1] || '');
      const textMatch2 = record.TEXT.toLowerCase().includes(searchTerms[2] || '');
      const textMatch3 = record.TEXT.toLowerCase().includes(searchTerms[3] || '');
      const rowIDMatch = record.rowID.toLowerCase().includes(searchTerms[0] || '');
      const textMatch =  textMatch0 && textMatch1 && textMatch2 && textMatch3;
      const stationMatch = record.STN.toLowerCase().includes(STN.toLowerCase());
      const digMatch = record.DIG.toLowerCase().includes(DIG.toLowerCase());
      const tagMatch = selectedTag !== 'all' ?  _.keys(record.tags).includes(selectedTag) : true;
      return startDateMatch && endDateMatch && stationMatch && digMatch && tagMatch && (rowIDMatch || textMatch) ;
    }).sort((a, b) => {
      if (sortBy == 'dateAsc') {
        return a.unixTime > b.unixTime ? -1 : 1;
      } else if (sortBy == 'dateDesc') {
        return a.unixTime > b.unixTime ? 1 : -1;
      }
    })
  //}
};




