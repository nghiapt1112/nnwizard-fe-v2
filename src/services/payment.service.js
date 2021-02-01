import api from './api';

export const paymentService = {
  review,
  authorize,
  execute,
};

function review(params) {
  return api(`/pay/review?${new URLSearchParams(params)}`);
}

function authorize(payload) {
  return api.post(`/api/authorize`, payload);
}
function execute(payload) {
  return api.post(`/api/authorize`, payload);
}
