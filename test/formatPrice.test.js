import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice } from '../src/utils/formatPrice.js';

test('formats storefront prices as whole US dollars', () => {
  assert.equal(formatPrice(420), '$420');
});
