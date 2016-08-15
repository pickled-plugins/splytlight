import h from 'virtual-dom/h';

import UnitsContainer from './units-container';

export default function App({state, x, y}, {setState}) {
  return (
    h('div', {className: 'app'}, [
      h('div', {className: 'app__main'}, [
        h('div', {className: 'app__viz'}, [
          UnitsContainer({state: state.tree, x, y}, {
            setState: (treeStateChange) => {
              return setState({
                tree: Object.assign({}, state.tree, treeStateChange)
              });
            }
          })
        ]),
        h('div', {className: 'app__viz'}, [])
      ]),
      h('div', {className: 'app__nav'}, [
        h('h1', {}, 'Splyt Light Interactive')
      ])
    ])
  );
}
