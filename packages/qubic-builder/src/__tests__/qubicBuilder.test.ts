import { Environment } from '@qubic/dev-utils';

import QubicBuilder from '../QubicBuilder';

describe('QubicBuilder', () => {
  it('Expects env option to be production by default', () => {
    const { options } = new QubicBuilder();

    expect(options.env).toBe('production');
  });
});
