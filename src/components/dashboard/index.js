import {createElement} from 'react';
const {div, p, button} = require('hyperscript-helpers')(createElement);
import classNames from 'classnames';

import cls from './style.css';
import {countUnits, countLooseEnds} from '../../utilities/splyt';

function Summary(tree) {
  return (
    div({}, [
      p({}, `Units: ${countUnits(tree)}`),
      p({}, `Bulbs: ${countLooseEnds(tree)}`)
    ])
  );
}

export default ({isDashboardExpanded, tree}, {setState}) => (
  div({
    className: classNames(cls.root, {
      [cls.expanded]: isDashboardExpanded
    })
  }, [
    isDashboardExpanded
      ?
      Summary(tree)
      :
      (
        button({
          onClick: () => {
            setState({
              isDashboardExpanded: true
            });
          }
        }, '+')
      )
  ])
);
