// import http from 'k6/http';

// export default function () {
//   http.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/styles');
// }
// export default function () {
//   http.get('http://localhost:3000/products/900000/styles');
// }

import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export default function () {
  const url = 'http://localhost:3000/products/900000/styles';

  check(http.get(url), {
    'status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);
}
