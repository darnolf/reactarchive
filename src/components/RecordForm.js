import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Tags from 'react-tag-autocomplete';
import * as firebase from 'firebase';
//import { getTags, startGetTags } from '../actions/filtersActions';
import * as tagActions from '../actions/tagsActions'


class RecordForm extends React.Component {
  constructor(props) {
    super(props);

    //console.log('props: ', props.record.unixTime);

    const dateformatted = () => { // <<< only called on EDIT RECORD
      let newDate = '';
      let dateTemp = props.record.DDMMYY || '';
      if (dateTemp.toString().length == 6) {
       return moment(dateTemp, 'DD-MM-YY', false).format('DDMMYY') // 150218
      } else if (dateTemp === '') {
          return 'No Date';
      }  else {
        return moment(dateTemp).format('DDMMYY'); // 1518688800000(unix timestamp) or 02-15-2018/2018-02-15
      }
    }

    this.state = {
      STN: props.record ? props.record.STN : 'BBC',
      //DDMMYY: props.record ? moment(props.record.DDMMYY) : moment(), // If in Databse, print formatted, else Unix Timestamp: 1518116858350
      DDMMYY: props.record ? dateformatted() : moment().format('DDMMYY'), // For new record print [150218]
      FROM_T: props.record ? props.record.FROM_T : '',
      TO_T: props.record ? props.record.TO_T : '',
      TTL: props.record ? props.record.TTL : '',
      CHP: props.record ? props.record.CHP : '',
      TIME_LC: props.record ? props.record.TIME_LC : '',
      DIG: props.record ? props.record.DIG : '',
      TEXT: props.record ? props.record.TEXT : '',
      tags: props.record ? props.record.tags : '',
      unixTime: props.record ? props.record.unixTime :  '',
      rowID: props.record ? props.record.rowID :  '',
    };

    console.log('state: ', this.state.rowID)
  }

  componentDidMount() {
    console.log('Mount: ', this.state.rowID)
    this.setUnixTime();
    this.setRowId();
  }

  onSTNchange = (e) => {const STN = e.target.value;this.setState(() => ({ STN }));};
  onDDMMYYchange = (e) => {const DDMMYY = e.target.value;this.setState(() => ({ DDMMYY })); this.onMaxLength(e); };
  onFROM_Tchange = (e) => {const FROM_T = e.target.value;this.setState(() => ({ FROM_T })); this.onMaxLength(e)};
  onTO_Tchange = (e) => {const TO_T = e.target.value;this.setState(() => ({ TO_T })); this.onMaxLength(e)};
  onTTLchange = (e) => {const TTL = e.target.value;this.setState(() => ({ TTL })); this.onMaxLength(e)};
  onCHPchange = (e) => {const CHP = e.target.value;this.setState(() => ({ CHP })); this.onMaxLength(e)};
  onTIME_LCchange = (e) => {const TIME_LC = e.target.value;this.setState(() => ({ TIME_LC })); this.onMaxLength(e)};
  onDIGchange = (e) => {const DIG = e.target.value;this.setState(() => ({ DIG }));};
  onTEXTtchange = (e) => {const TEXT = e.target.value;this.setState(() => ({ TEXT })); this.onMaxLength(e)};

  // returns the values of date and time to unix ephoc
  // has to standarize DDMMYY HHmm to MM-DD-YYYY HH:mm to comply unix format requirement


  setUnixTime = () => {
    let dateTempData = this.state.DDMMYY;
    const dateUnixPartial = () => moment(dateTempData, 'DDMMYY', false).format('MM-DD-YYYY')
    let timeTempData = this.state.FROM_T || '0000' ;
    const timeUnixPartial = () => moment(timeTempData, 'HHmm', false).format('HH:mm')
    const unixTime = moment(`${dateUnixPartial()} ${timeUnixPartial()}`).valueOf() / 1000;
    this.setState(() => ({ unixTime }))
  };

  setRowId = () => {
    const rowID = `${this.state.STN}${this.state.DDMMYY}${this.state.FROM_T}`
    this.setState(() => ({ rowID }))
  };

  findNextTabStop = (el) => {
    const inputs = document.querySelectorAll('input');
    const list = Array.prototype.filter.call(inputs, function(item) {return item.tabIndex >= "0"});
    const index = list.indexOf(el);
    return list[index + 1] || list[0];
  }

  onMaxLength = (e) => {
   if (e.target.value.length == e.target.maxLength) {
    const nextEl = this.findNextTabStop(e.target);
    nextEl.focus();
    this.setUnixTime();
    this.setRowId();
   }
  }

  handleAddition = (tag) => {
    if(this.state.tags) {
      // if tags object defined, merge new to current
      _.merge(this.state.tags, {[tag.name]: true})
      this.setState({ ...this.state })
    } else {
      // if no tag object, create state.tags and include added tag
      this.setState({
        ...this.state,
        tags: {[tag.name]: true} })
    }
  }

  handleDelete =  (i) => {
    const tags = this.tagsObjToArr(this.state.tags).slice(0);
    tags.splice(i, 1)
    let tagsObj = this.tagsArrToObj(tags)
    this.setState({ tags: tagsObj })
  }

  // for tag-autocomplete I need an array: [{name: tag1},{name: tag2}...]
  tagsObjToArr = (obj) => {
    const tagsArr = [];
    _.mapValues(obj, (tag, key) => {
      tagsArr.push({name: key})
    })
    return tagsArr;
  }

  // the state.tags is an object to avoid firebase creating keys for search
  // Format should be: {tags: {tag1: true},{tag2: true},{tag3: true}}
  tagsArrToObj = (arr) => {
    let tagsObj = {};
    _.map(arr, (tag) => {
      tagsObj[tag.name] =  true;
    })
    return tagsObj
  }

  suggestionsArr = (obj) => {
    const tagsArr = [];
    _.mapValues(obj, (tag, key) => {
      tagsArr.push(tag)
    })
    return tagsArr;
  }

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onValiate = () => {
    if (!this.state.TEXT) {
      this.setState(() => ({ error: 'Please provide main body content.' }));
      return false;
    } else {
      this.setUnixTime();
      this.forceUpdate();
      return true;
    }
  };

  onSubmit = (e) => {
      this.setUnixTime();
      this.setRowId();
    e.preventDefault();
    if (this.onValiate()) {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        ...this.state,
        STN: this.state.STN,
        //DDMMYY: this.state.DDMMYY.valueOf(),
        DDMMYY: this.state.DDMMYY,
        FROM_T: this.state.FROM_T,
        TO_T: this.state.TO_T,
        TTL: this.state.TTL,
        CHP: this.state.CHP,
        TIME_LC: this.state.TIME_LC,
        DIG: this.state.DIG,
        TEXT: this.state.TEXT,
        tags: this.state.tags,
        unixTime: this.state.unixTime,
        rowID: this.state.rowID,
      });
    }
  };

  render() {
    return (
      <form className="form" >
        {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}

        <div className="form-row">
          <div className="col">
            <label>Station</label>
            <select
              id="STN"
              className="form-control"
              value={this.state.STN}
              onChange={this.onSTNchange}
            >
              <option value="CNN">CNN</option>
              <option value="BBC">BBC</option>
            </select>
          </div>

          <div className="col">
            <label>Date:</label>
            <input type="text"
              className="form-control" id="DDMMYY" placeholder=""
              maxLength="6"

              value={this.state.DDMMYY}
              onFocus={this.onDDMMYYfocus}
              onChange={this.onDDMMYYchange}/>
          </div>

          {/* <div className="col-lg-2 col-sm-6">
            <label>Date</label>
            <SingleDatePicker
            date={this.state.DDMMYY}
            onDateChange={this.onDDMMYYchange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}

            id="DDMMYY"

          />
          </div>  */}

          <div className="col">
            <label>From Time</label>
            <input type="text" className="form-control" id="FROM_T" placeholder="" value={this.state.FROM_T} onChange={this.onFROM_Tchange} maxLength="4" />
          </div>

          <div className="col">
            <label>To Time</label>
            <input type="text" className="form-control" id="TO_T" placeholder="" value={this.state.TO_T} onChange={this.onTO_Tchange} maxLength="4"/>
          </div>

          <div className="col">
            <label>Title</label>
            <input type="text" className="form-control" id="TTL" placeholder="" value={this.state.TTL} onChange={this.onTTLchange} maxLength="2"/>
          </div>

          <div className="col">
            <label>Chapter</label>
            <input type="text" className="form-control" id="CHP" placeholder="" value={this.state.CHP} onChange={this.onCHPchange} maxLength="3"/>
          </div>

          <div className="col">
            <label>Timeline</label>
            <input type="text" className="form-control" id="TIME_LC" placeholder="" value={this.state.TIME_LC} onChange={this.onTIME_LCchange} maxLength="6"/>
          </div>

          <div className="col">
            <label>Digitalized</label>
            <select
              id="DIG"
              className="form-control"
              value={this.state.DIG}
              onChange={this.onDIGchange}
            >
              <option value="DIG">DIG</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

        </div>

        <div className="form-row mt-2">
          <div className="col">
            <label>Main Body</label>
            <textarea className="form-control" id="TEXT" rows="10" value={this.state.TEXT} onChange={this.onTEXTtchange}></textarea>
          </div>
        </div>

        <div className="form-row mt-2">
        <div className="col-6">
            <label>Tags</label>

            <Tags
              allowNew={false}
              tags={this.tagsObjToArr(this.state.tags)}
              suggestions={this.suggestionsArr(this.props.suggestions)}
              handleDelete={(e) => this.handleDelete(e)}
              handleAddition={this.handleAddition}
            />

          </div>
        </div>
        <div className="form-row mt-4">
          <div className="col">
            <button type='button' id="BTN" className="btn btn-success btn-lg float-right" onClick={this.onSubmit}>Save Record</button>
            {this.props.record && <button type='button'  className="btn btn-primary btn-sm mt-2 mx-2 float-right" onClick={this.props.onCancel}>Cancel</button>}
            {this.props.record && <button type='button'  className="btn btn-danger btn-sm mt-2 float-right" onClick={this.props.onRemove}>Delete Record</button>}

          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state, props) => ({
  suggestions: state.tags,
});
export default connect(mapStateToProps)(RecordForm);
