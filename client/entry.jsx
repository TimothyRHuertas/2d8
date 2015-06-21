'use strict';

import 'styles/main.scss';

import React from 'react/addons';
import DayComponent from 'components/calendar/DayComponent.jsx';
import testEntries from 'testData.js';


React.render(<DayComponent entries={testEntries} />, document.body);
