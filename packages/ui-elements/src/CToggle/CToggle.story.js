import React from 'react';
import {storiesOf} from "@storybook/react";

import CToggle from './CToggle';

storiesOf('CToggle', module)
    .add('default', () => <CToggle onLabel="On" offLabel="Off"/>);