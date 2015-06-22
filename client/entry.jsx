'use strict';

import 'styles/main.scss';

import React from 'react/addons';
import DayAndDetailComponent from 'components/DayAndDetailLayout/DayAndDetailComponent.jsx';
import testEntries from 'testData.js';


React.render(<DayAndDetailComponent entries={testEntries} />, document.body);
