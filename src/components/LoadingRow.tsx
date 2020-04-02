import React from 'react';
import { BaseComponent } from './BaseComponent';

import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

export class LoadingRow extends BaseComponent {
  render() {
    return (
      <Placeholder Animation={Fade} Left={PlaceholderMedia}>
        <PlaceholderLine width={80} />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
    );
  }
}
