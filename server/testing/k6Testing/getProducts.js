import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 100 }, // below normal load
    { duration: '30s', target: 100 },
    { duration: '1m', target: 200 }, // normal load
    { duration: '15s', target: 200 },
    { duration: '30s', target: 300 }, // around the breaking point
    { duration: '1m', target: 300 },
    { duration: '15s', target: 500 }, // beyond the breaking point
    { duration: '30s', target: 1000 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3001/pickleRick'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/products?count=5&page=1`, null, { tags: { name: 'Products' } }],
    ['GET', `${BASE_URL}/products?count=5&page=1`, null, { tags: { name: 'Products' } }],
    ['GET', `${BASE_URL}/products?count=5&page=1`, null, { tags: { name: 'Products' } }],
    ['GET', `${BASE_URL}/products?count=5&page=1`, null, { tags: { name: 'Products' } }],
  ]);

  sleep(1);
};

// export default function () {
//   http.get('http://localhost:3001/pickleRick/products/900000');
//   sleep(1);
// };

// export default function () {
//   http.get('http://localhost:3001/pickleRick/products/90000/styles');
//   sleep(1);
// };

// export default function () {
//   http.get('http://localhost:3001/pickleRick/products/40344/related');
//   sleep(1);
// };
