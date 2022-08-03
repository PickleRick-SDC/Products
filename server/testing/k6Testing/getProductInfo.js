import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 100 }, // below normal load
    { duration: '30s', target: 100 },
    { duration: '1m', target: 250 }, // normal load
    { duration: '15s', target: 250 },
    { duration: '30s', target: 500 }, // around the breaking point
    { duration: '1m', target: 500 },
    { duration: '15s', target: 800 }, // beyond the breaking point
    { duration: '30s', target: 1000 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3001/pickleRick'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/products/900000`, null, { tags: { name: 'ProductInfo' } }],
    ['GET', `${BASE_URL}/products/900001`, null, { tags: { name: 'ProductInfo' } }],
    ['GET', `${BASE_URL}/products/900002`, null, { tags: { name: 'ProductInfo' } }],
    ['GET', `${BASE_URL}/products/900003`, null, { tags: { name: 'ProductInfo' } }],
  ]);

  sleep(1);
};