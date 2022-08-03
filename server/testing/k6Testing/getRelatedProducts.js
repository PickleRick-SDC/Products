import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 100 }, // below normal load
    { duration: '30s', target: 100 },
    { duration: '1m', target: 2000 }, // normal load
    { duration: '15s', target: 200 },
    { duration: '30s', target: 500 }, // around the breaking point
    { duration: '1m', target: 500 },
    { duration: '15s', target: 1000 }, // beyond the breaking point
    { duration: '30s', target: 1000 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3001/pickleRick'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/products/900000/related`, null, { tags: { name: 'ProductInfo' } }],
    ['GET', `${BASE_URL}/products/900001/related`, null, { tags: { name: 'ProductInfo' } }],
    ['GET', `${BASE_URL}/products/900002/related`, null, { tags: { name: 'ProductInfo' } }],
    ['GET', `${BASE_URL}/products/900003/related`, null, { tags: { name: 'ProductInfo' } }],
  ]);

  sleep(1);
};