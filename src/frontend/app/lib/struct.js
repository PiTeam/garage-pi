import { Seq as makeSeq } from 'immutable';

export default (JSdata) => {
  const fromJSets = (js) => {
    if (typeof js !== 'object' || js === null) {
      return js;
    }
    return Array.isArray(js) ?
      makeSeq(js).map(fromJSets).toSet() :
      makeSeq(js).map(fromJSets).toMap();
  };

  console.log(fromJSets(JSdata));
  return fromJSets(JSdata);
};
