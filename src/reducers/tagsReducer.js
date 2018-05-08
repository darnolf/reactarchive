import {FETCH_TAGS, FETCH_BYTAG, fetchByTag} from '../actions/tagsActions'

export default function (state = {tags: {}}, action) {
    switch (action.type) {
        case 'FETCH_TAGS':
            return action.payload;
        case 'FETCH_BYTAG':
            return state
            action.payload
        default:
            return state
    }
}