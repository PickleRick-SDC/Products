import http from 'k6/http';
import { sleep, check } from 'k6';

// export default function () {
//   http.get('http://localhost:3001/pickleRick/products?count=5&page=1');
//   sleep(1);
// };

// export default function () {
//   http.get('http://localhost:3001/pickleRick/products/40345');
//   sleep(1);
// };

// export default function () {
//   http.get('http://localhost:3001/pickleRick/products/90000/styles');
//   sleep(1);
// };

export default function () {
  http.get('http://localhost:3001/pickleRick/products/40344/related');
  sleep(1);
};
