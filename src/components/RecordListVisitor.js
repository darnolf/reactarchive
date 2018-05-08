import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from './Pagination';
import moment from 'moment';
import Highlight from 'react-highlighter';
import RecordListFilters from './RecordListFilters'
import * as FontAwesome from 'react-icons/lib/fa/'
import selectRecords from '../selectors/records';
import LoadingPage from './LoadingPage'


class RecordList extends Component {

  state = {
    allPanelsStatus: false,
    panelTouched: false,
    panelsOpen: [],
    records: [],
  }

  onChangePage = (records) => {
    this.setState({ records: records });
  };

  onAllToggle = () => {
    if(this.state.panelsOpen.length > 0){
      this.state.panelsOpen.forEach((panel) => {
        panel.classList.remove('open');
        this.state.panelsOpen = [];
        this.setState({allPanelsStatus: false});
      })
    } else {
    this.setState({allPanelsStatus: !this.state.allPanelsStatus});
    }
  }

  onToggle = (id) => {
    let elem = document.getElementById(id);
    let panels = this.state.panelsOpen;
    if(panels.includes(elem) )  {
      this.state.panelsOpen.splice(elem,1);
    } else {
      this.state.panelsOpen.push(elem);
    }
    elem.classList.toggle("open");
    this.setState({panelTouched: !this.state.panelTouched}) // This does nothing, its here to update
  }

  clearExpandButtons  = () => {
    let panels = document.getElementsByClassName('panel');
    setTimeout(() => {
      [].forEach.call(panels, (el) => {
        let btn = el.closest('td').nextSibling.getElementsByTagName('button')[0];
        if(el.offsetHeight > 64 && btn != undefined) {
          btn.style.opacity = "1";
        } else {
          btn.setAttribute('disabled','')
        }
       });
    }, 100);
  }

  componentDidUpdate  = () => {
    this.clearExpandButtons();
  }

render() {
return (
 <div>

{this.props.fetching && <LoadingPage />}

 <Pagination  items={this.props.records} onChangePage={this.onChangePage} />

 {!this.props.fetching && <table className="table table-striped table-bordered RecordList">
   <thead>
     <tr>
         <th>STN</th>
         <th>ID</th>
         <th>Date</th>
         <th>Time</th>
         <th>Text</th>
         {/* <th>Tags</th> */}
         <th className="px-1 text-center">
         <button
          className="btn btn-outline-primary btn-sm"
          onClick={
            this.onAllToggle}>{this.state.allPanelsStatus || this.state.panelsOpen.length > 0 ?
            <FontAwesome.FaClose className='text-danger' />:
            <FontAwesome.FaPlus />}</button>
         </th>
     </tr>
   </thead>
   <tbody>
     {
       this.state.records.length === 0 ? (
           <tr><td colSpan="10"><h4 className="alert alert-danger w100 text-center">No results found</h4></td></tr>
       ) : (
           this.state.records.map(({ id: ID, STN, DDMMYY, FROM_T, TO_T, TTL, CHP, TIME_LC, DIG, TEXT,tags,rowID, ...props}) => {
            //const tags = new Map(Object.entries(tags));
            //console.log(tags, ' ::: ' ,Object.entries(tags))

            const dateformatted = () => {
              let newDate = '';
              if (DDMMYY.toString().length == 6) {
               return moment(DDMMYY, 'DD-MM-YY', false).format('DD-MM-YYYY') // 150218
              } else {
                return moment(DDMMYY).format('DD-MM-YYYY'); // 1518688800000(unix timestamp) or 02-15-2018/2018-02-15
              }
            }

            const timelinecalc = () => {
              const startTime = moment(FROM_T, "hhmm").format("HH:mm:ss");
              const endTime = moment(startTime, 'HH:mm:ss').add({ hour:TIME_LC.substring(0, 2), minute:TIME_LC.substring(2, 4), second:0 }).format('HH:mm:ss');
              return endTime
            }

            const highlighter = () => {
              let termsArr = this.props.searchText.split(' ') // make array from search terms split at space
              let rowArr = TEXT.split(' '); // make array of all words in a record split with space
              let highlightedTEXT = []
              rowArr.map((word, index) => {
                switch (word) {
                  case termsArr[0]:
                    highlightedTEXT.push(`<strong class="highlight">${word}</strong> `)
                    break;
                  case termsArr[1]:
                    highlightedTEXT.push(`<strong class="highlight">${word}</strong> `)
                    break;
                  case termsArr[2]:
                    highlightedTEXT.push(`<strong class="highlight">${word}</strong> `)
                    break;
                  case termsArr[3]:
                    highlightedTEXT.push(`<strong class="highlight">${word}</strong> `)
                    break;
                  default:
                    highlightedTEXT.push(word, ' ')
                    break;
                }
              })
              return <span dangerouslySetInnerHTML={{ __html: highlightedTEXT.join(" ").toString() }} />

              //return newTEXT.join(" ").toString();
              //term.includes('Israel').map((term) => {return `<span class="highlight">${term}</span>`;});
              //return <div dangerouslySetInnerHTML={{ __html: newTEXT }} />
            }

            const tagsformatted  = () => {
              if ( tags !== undefined)  {
                return  _.map(tags, (tag, index) => <span key={index} className="btn btn-outline-dark btn-sm mx-1 p-1">{index}</span>)
              } else {
                return '--';
              }
            }
             return (
              <tr key={ID+'key'} data-index={ID}>
                 <td className="text-center py-0"><img src={`./images/logo_${STN}.png`} width="35px" /></td>
                 <td className="text-center">{rowID}</td>
                 <td className="nowrap text-center">{dateformatted()}</td>
                 <td className="text-center">{timelinecalc()}</td>
                 <td className="pt-1"><div id={ID} className={`panel ${this.state.allPanelsStatus ? 'open' : ''}`}><Highlight search={this.props.searchText}>{highlighter()}</Highlight></div></td>
                 {/* <td className="text-center"><div className="tags" style={{minWidth: "200px"}}>{tagsformatted()}</div></td>                  */}
                 <td className="text-center"><button style={{'opacity': 0}} className="btn btn-outline-primary btn-sm" onClick={(id) => {this.onToggle(ID)}}> <FontAwesome.FaAngleDoubleDown /></button></td>
              </tr>
             )
           })
         )
     }
     </tbody>
 </table>}

 </div>
        )
    }
};

const mapStateToProps = (state) => {
  return {
    records: selectRecords(state.records.recordslist, state.filters),
    fetching: state.records.fetching,
    searchText: state.filters.TEXT,
    selectedYear: state.selectedYear,
  };
};

export default connect(mapStateToProps)(RecordList);
